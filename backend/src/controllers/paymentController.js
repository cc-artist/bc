const mockDB = require('../config/mockData');
const paymentGateway = require('../services/paymentGateway');
const paymentConfig = require('../config/paymentConfig');

// 创建支付订单
const createPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    
    // 验证必填字段
    if (!paymentData.name || !paymentData.phone || !paymentData.templeId || !paymentData.amount) {
      return res.status(400).json({
        status: 'error',
        message: '请提供姓名、电话、寺庙ID和金额'
      });
    }
    
    // 验证电话号码格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(paymentData.phone)) {
      return res.status(400).json({
        status: 'error',
        message: '请提供有效的手机号码'
      });
    }
    
    // 验证金额
    if (typeof paymentData.amount !== 'number' || paymentData.amount <= 0) {
      return res.status(400).json({
        status: 'error',
        message: '请提供有效的支付金额'
      });
    }
    
    // 创建支付订单
    const payment = await mockDB.payments.create(paymentData);
    
    // 模拟支付处理
    setTimeout(async () => {
      await mockDB.payments.findByIdAndUpdate(payment._id, { status: 'completed' });
      console.log(`支付订单 ${payment._id} 已完成`);
    }, 3000);
    
    res.status(201).json({
      status: 'success',
      data: payment,
      message: '创建支付订单成功，正在处理支付'
    });
  } catch (error) {
    console.error('创建支付订单失败:', error);
    res.status(500).json({
      status: 'error',
      message: '创建支付订单失败',
      error: error.message
    });
  }
};

// 获取所有支付订单
const getAllPayments = async (req, res) => {
  try {
    const payments = await mockDB.payments.find();
    res.status(200).json({
      status: 'success',
      data: payments,
      message: '获取支付订单列表成功'
    });
  } catch (error) {
    console.error('获取支付订单列表失败:', error);
    res.status(500).json({
      status: 'error',
      message: '获取支付订单列表失败',
      error: error.message
    });
  }
};

// 根据ID获取支付订单
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await mockDB.payments.findById(id);
    
    if (!payment) {
      return res.status(404).json({
        status: 'error',
        message: '支付订单不存在'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: payment,
      message: '获取支付订单详情成功'
    });
  } catch (error) {
    console.error('获取支付订单详情失败:', error);
    res.status(500).json({
      status: 'error',
      message: '获取支付订单详情失败',
      error: error.message
    });
  }
};

// 更新支付订单状态
const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // 验证状态值
    const validStatuses = ['pending', 'processing', 'completed', 'failed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: '无效的状态值'
      });
    }
    
    const payment = await mockDB.payments.findByIdAndUpdate(id, { status });
    
    if (!payment) {
      return res.status(404).json({
        status: 'error',
        message: '支付订单不存在'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: payment,
      message: '更新支付订单状态成功'
    });
  } catch (error) {
    console.error('更新支付订单状态失败:', error);
    res.status(500).json({
      status: 'error',
      message: '更新支付订单状态失败',
      error: error.message
    });
  }
};

// 删除支付订单
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const payment = await mockDB.payments.findByIdAndDelete(id);
    
    if (!payment) {
      return res.status(404).json({
        status: 'error',
        message: '支付订单不存在'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: '删除支付订单成功'
    });
  } catch (error) {
    console.error('删除支付订单失败:', error);
    res.status(500).json({
      status: 'error',
      message: '删除支付订单失败',
      error: error.message
    });
  }
};

// 获取支付订单统计
const getPaymentStats = async (req, res) => {
  try {
    const stats = await mockDB.payments.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);
    
    // 计算总金额
    const totalStats = stats.reduce((acc, curr) => {
      acc.totalCount += curr.count;
      acc.totalAmount += curr.totalAmount;
      return acc;
    }, { totalCount: 0, totalAmount: 0 });
    
    res.status(200).json({
      status: 'success',
      data: {
        statusStats: stats,
        totalStats
      },
      message: '获取支付订单统计成功'
    });
  } catch (error) {
    console.error('获取支付订单统计失败:', error);
    res.status(500).json({
      status: 'error',
      message: '获取支付订单统计失败',
      error: error.message
    });
  }
};

// 模拟支付回调
const paymentWebhook = async (req, res) => {
  try {
    const webhookData = req.body;
    const { transactionId, status } = webhookData;
    
    // 查找支付订单
    const payment = await mockDB.payments.findOne({ transactionId });
    
    if (!payment) {
      return res.status(404).json({
        status: 'error',
        message: '支付订单不存在'
      });
    }
    
    // 更新支付状态
    await mockDB.payments.findByIdAndUpdate(payment._id, { status });
    
    res.status(200).json({
      status: 'success',
      message: '支付回调处理成功'
    });
  } catch (error) {
    console.error('支付回调处理失败:', error);
    res.status(500).json({
      status: 'error',
      message: '支付回调处理失败',
      error: error.message
    });
  }
};

// 初始化跨境支付
const initPayment = async (req, res) => {
  try {
    const { platform, amount, currency, paymentMethod, ...paymentData } = req.body;
    
    // 验证必填字段
    if (!platform || !amount || !paymentData.name || !paymentData.phone || !paymentData.templeId) {
      return res.status(400).json({
        status: 'error',
        message: '请提供支付平台、金额、姓名、电话和寺庙ID'
      });
    }
    
    // 验证支付金额
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({
        status: 'error',
        message: '请提供有效的支付金额'
      });
    }
    
    // 初始化支付
    const result = await paymentGateway.initPayment({
      ...paymentData,
      amount,
      currency: currency || paymentConfig.defaultCurrency,
      paymentMethod: paymentMethod || 'online'
    }, platform);
    
    res.status(201).json({
      status: 'success',
      data: result.data,
      message: '支付初始化成功'
    });
  } catch (error) {
    console.error('初始化支付失败:', error);
    res.status(500).json({
      status: 'error',
      message: '初始化支付失败',
      error: error.message
    });
  }
};

// 处理支付回调
const handleWebhook = async (req, res) => {
  try {
    const { platform } = req.params;
    const webhookData = req.body;
    
    // 验证平台参数
    if (!platform) {
      return res.status(400).json({
        status: 'error',
        message: '请提供支付平台参数'
      });
    }
    
    // 处理回调
    const result = await paymentGateway.handleWebhook(webhookData, platform);
    
    res.status(200).json({
      status: 'success',
      data: result.data,
      message: '支付回调处理成功'
    });
  } catch (error) {
    console.error('处理支付回调失败:', error);
    res.status(500).json({
      status: 'error',
      message: '处理支付回调失败',
      error: error.message
    });
  }
};

// 捕获支付
const capturePayment = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 捕获支付
    const result = await paymentGateway.capturePayment(id);
    
    res.status(200).json({
      status: 'success',
      data: result,
      message: '支付捕获成功'
    });
  } catch (error) {
    console.error('捕获支付失败:', error);
    res.status(500).json({
      status: 'error',
      message: '捕获支付失败',
      error: error.message
    });
  }
};

// 退款
const refundPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    
    // 退款
    const result = await paymentGateway.refundPayment(id, amount);
    
    res.status(200).json({
      status: 'success',
      data: result,
      message: '退款成功'
    });
  } catch (error) {
    console.error('退款失败:', error);
    res.status(500).json({
      status: 'error',
      message: '退款失败',
      error: error.message
    });
  }
};

// 获取支付平台列表
const getPaymentPlatforms = async (req, res) => {
  try {
    const platforms = paymentGateway.getSupportedPlatforms();
    
    res.status(200).json({
      status: 'success',
      data: platforms,
      message: '获取支付平台列表成功'
    });
  } catch (error) {
    console.error('获取支付平台列表失败:', error);
    res.status(500).json({
      status: 'error',
      message: '获取支付平台列表失败',
      error: error.message
    });
  }
};

// 获取支付状态
const getPaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 获取支付状态
    const result = await paymentGateway.getPaymentStatus(id);
    
    res.status(200).json({
      status: 'success',
      data: result.data,
      message: '获取支付状态成功'
    });
  } catch (error) {
    console.error('获取支付状态失败:', error);
    res.status(500).json({
      status: 'error',
      message: '获取支付状态失败',
      error: error.message
    });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
  deletePayment,
  getPaymentStats,
  paymentWebhook,
  initPayment,
  handleWebhook,
  capturePayment,
  refundPayment,
  getPaymentPlatforms,
  getPaymentStatus
};