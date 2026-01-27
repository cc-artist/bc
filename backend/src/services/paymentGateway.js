// 支付网关核心服务
const paypelService = require('./paypel');
const pingpongService = require('./pingpong');
const paymentConfig = require('../config/paymentConfig');
const mockDB = require('../config/mockData');

class PaymentGateway {
  constructor() {
    this.platforms = {
      paypel: paypelService,
      pingpong: pingpongService
    };
  }

  /**
   * 初始化支付
   * @param {Object} paymentData 支付数据
   * @param {string} platform 支付平台
   * @returns {Promise<Object>} 支付初始化结果
   */
  async initPayment(paymentData, platform) {
    try {
      // 验证支付平台
      if (!this.platforms[platform]) {
        throw new Error('不支持的支付平台');
      }

      // 创建支付订单
      const payment = await mockDB.payments.create({
        ...paymentData,
        platform,
        status: 'pending',
        currency: paymentData.currency || paymentConfig.defaultCurrency,
        paymentMethod: paymentData.paymentMethod || 'online'
      });

      // 调用对应平台的支付初始化
      const platformResult = await this.platforms[platform].initPayment({
        ...paymentData,
        orderId: payment._id,
        returnUrl: paymentConfig.returnUrl,
        cancelUrl: paymentConfig.cancelUrl
      });

      // 更新支付订单
      await mockDB.payments.findByIdAndUpdate(payment._id, {
        paymentUrl: platformResult.paymentUrl,
        platformTransactionId: platformResult.transactionId,
        status: 'processing'
      });

      return {
        success: true,
        data: {
          orderId: payment._id,
          paymentUrl: platformResult.paymentUrl,
          platform,
          amount: payment.amount,
          currency: payment.currency,
          status: 'processing'
        }
      };
    } catch (error) {
      console.error('初始化支付失败:', error);
      throw error;
    }
  }

  /**
   * 处理支付回调
   * @param {Object} webhookData 回调数据
   * @param {string} platform 支付平台
   * @returns {Promise<Object>} 回调处理结果
   */
  async handleWebhook(webhookData, platform) {
    try {
      // 验证支付平台
      if (!this.platforms[platform]) {
        throw new Error('不支持的支付平台');
      }

      // 验证回调数据
      const validationResult = await this.platforms[platform].validateWebhook(webhookData);
      if (!validationResult.valid) {
        throw new Error('回调数据验证失败');
      }

      // 查找支付订单
      const payment = await mockDB.payments.findOne({ platformTransactionId: validationResult.transactionId });
      if (!payment) {
        throw new Error('支付订单不存在');
      }

      // 更新支付状态
      const statusMap = {
        success: 'completed',
        failed: 'failed',
        cancelled: 'cancelled'
      };

      const newStatus = statusMap[validationResult.status] || 'pending';
      await mockDB.payments.findByIdAndUpdate(payment._id, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });

      return {
        success: true,
        data: {
          orderId: payment._id,
          status: newStatus,
          platform,
          transactionId: validationResult.transactionId
        }
      };
    } catch (error) {
      console.error('处理支付回调失败:', error);
      throw error;
    }
  }

  /**
   * 捕获支付
   * @param {string} orderId 订单ID
   * @returns {Promise<Object>} 捕获结果
   */
  async capturePayment(orderId) {
    try {
      // 查找支付订单
      const payment = await mockDB.payments.findById(orderId);
      if (!payment) {
        throw new Error('支付订单不存在');
      }

      // 调用对应平台的捕获支付
      const captureResult = await this.platforms[payment.platform].capturePayment({
        orderId: payment._id,
        transactionId: payment.platformTransactionId,
        amount: payment.amount,
        currency: payment.currency
      });

      // 更新支付状态
      if (captureResult.success) {
        await mockDB.payments.findByIdAndUpdate(orderId, {
          status: 'completed',
          updatedAt: new Date().toISOString()
        });
      }

      return captureResult;
    } catch (error) {
      console.error('捕获支付失败:', error);
      throw error;
    }
  }

  /**
   * 退款
   * @param {string} orderId 订单ID
   * @param {number} amount 退款金额
   * @returns {Promise<Object>} 退款结果
   */
  async refundPayment(orderId, amount) {
    try {
      // 查找支付订单
      const payment = await mockDB.payments.findById(orderId);
      if (!payment) {
        throw new Error('支付订单不存在');
      }

      // 验证退款金额
      if (amount > payment.amount) {
        throw new Error('退款金额不能超过支付金额');
      }

      // 调用对应平台的退款
      const refundResult = await this.platforms[payment.platform].refundPayment({
        orderId: payment._id,
        transactionId: payment.platformTransactionId,
        amount: amount || payment.amount,
        currency: payment.currency
      });

      // 更新支付状态
      if (refundResult.success) {
        await mockDB.payments.findByIdAndUpdate(orderId, {
          status: 'refunded',
          refundAmount: amount || payment.amount,
          updatedAt: new Date().toISOString()
        });
      }

      return refundResult;
    } catch (error) {
      console.error('退款失败:', error);
      throw error;
    }
  }

  /**
   * 获取支付状态
   * @param {string} orderId 订单ID
   * @returns {Promise<Object>} 支付状态
   */
  async getPaymentStatus(orderId) {
    try {
      // 查找支付订单
      const payment = await mockDB.payments.findById(orderId);
      if (!payment) {
        throw new Error('支付订单不存在');
      }

      // 调用对应平台的状态查询
      const statusResult = await this.platforms[payment.platform].getPaymentStatus({
        transactionId: payment.platformTransactionId
      });

      // 更新支付状态
      if (statusResult.status !== payment.status) {
        await mockDB.payments.findByIdAndUpdate(orderId, {
          status: statusResult.status,
          updatedAt: new Date().toISOString()
        });
      }

      return {
        success: true,
        data: {
          orderId: payment._id,
          status: statusResult.status,
          platform: payment.platform,
          amount: payment.amount,
          currency: payment.currency
        }
      };
    } catch (error) {
      console.error('获取支付状态失败:', error);
      throw error;
    }
  }

  /**
   * 获取支持的支付平台
   * @returns {Array} 支持的支付平台
   */
  getSupportedPlatforms() {
    return Object.keys(this.platforms).map(platform => ({
      code: platform,
      name: platform === 'paypel' ? 'PAYPEL' : 'PINGPONG',
      enabled: paymentConfig.platforms[platform].enabled
    }));
  }

  /**
   * 验证平台配置
   * @param {string} platform 支付平台
   * @returns {boolean} 配置是否有效
   */
  validatePlatformConfig(platform) {
    return this.platforms[platform] && paymentConfig.platforms[platform].enabled;
  }
}

module.exports = new PaymentGateway();
