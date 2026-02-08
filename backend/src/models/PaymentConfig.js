const mongoose = require('mongoose');

const PaymentConfigSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    unique: true,
    enum: ['paypal', 'pingpong']
  },
  apiKey: {
    type: String,
    required: true
  },
  apiSecret: {
    type: String,
    required: true
  },
  merchantId: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sandboxMode: {
    type: Boolean,
    default: true
  },
  callbackUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt field before saving
PaymentConfigSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('PaymentConfig', PaymentConfigSchema);
