// 支付配置文件
const dotenv = require('dotenv');

dotenv.config();

const paymentConfig = {
  // 默认配置
  defaultCurrency: 'USD',
  defaultPlatform: 'paypel',
  
  // 回调URL配置
  returnUrl: process.env.PAYMENT_RETURN_URL || 'http://localhost:3000/payment/success',
  cancelUrl: process.env.PAYMENT_CANCEL_URL || 'http://localhost:3000/payment/cancel',
  webhookUrl: process.env.PAYMENT_WEBHOOK_URL || 'http://localhost:3001/api/v1/payments/webhook',
  
  // 支付平台配置
  platforms: {
    // PAYPEL平台配置
    paypel: {
      enabled: process.env.PAYPEL_ENABLED === 'true' || true,
      apiUrl: process.env.PAYPEL_API_URL || 'https://api.paypel.com/v1',
      apiKey: process.env.PAYPEL_API_KEY || 'test_paypel_api_key',
      apiSecret: process.env.PAYPEL_API_SECRET || 'test_paypel_api_secret',
      sandbox: process.env.PAYPEL_SANDBOX === 'true' || true,
      timeout: 30000, // 30秒超时
      retryCount: 3 // 重试次数
    },
    
    // PINGPONG平台配置
    pingpong: {
      enabled: process.env.PINGPONG_ENABLED === 'true' || true,
      apiUrl: process.env.PINGPONG_API_URL || 'https://api.pingpong.com/v1',
      apiKey: process.env.PINGPONG_API_KEY || 'test_pingpong_api_key',
      apiSecret: process.env.PINGPONG_API_SECRET || 'test_pingpong_api_secret',
      sandbox: process.env.PINGPONG_SANDBOX === 'true' || true,
      timeout: 30000, // 30秒超时
      retryCount: 3 // 重试次数
    }
  },
  
  // 支付状态配置
  statusMap: {
    pending: '待处理',
    processing: '处理中',
    completed: '已完成',
    failed: '失败',
    cancelled: '已取消',
    refunded: '已退款'
  },
  
  // 支付方式配置
  paymentMethods: {
    online: '在线支付',
    offline: '离线支付',
    transfer: '银行转账',
    crypto: '加密货币'
  },
  
  // 货币配置
  currencies: {
    USD: { symbol: '$', name: '美元' },
    EUR: { symbol: '€', name: '欧元' },
    GBP: { symbol: '£', name: '英镑' },
    JPY: { symbol: '¥', name: '日元' },
    CNY: { symbol: '¥', name: '人民币' }
  },
  
  // 交易限额配置
  limits: {
    minAmount: 0.01, // 最小交易金额
    maxAmount: 100000, // 最大交易金额
    dailyLimit: 500000, // 每日交易限额
    monthlyLimit: 5000000 // 每月交易限额
  },
  
  // 安全配置
  security: {
    signatureExpiry: 3600, // 签名过期时间（秒）
    tokenExpiry: 7200, // 令牌过期时间（秒）
    ipWhitelist: process.env.IP_WHITELIST ? process.env.IP_WHITELIST.split(',') : [],
    rateLimit: {
      maxRequests: 100,
      windowMs: 60000 // 1分钟
    }
  },
  
  // 日志配置
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    logWebhooks: process.env.LOG_WEBHOOKS === 'true' || true,
    logApiCalls: process.env.LOG_API_CALLS === 'true' || false
  }
};

module.exports = paymentConfig;
