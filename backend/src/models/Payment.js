const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  serviceType: {
    type: String,
    enum: ['itemBlessing', 'personalBlessing', 'familyBlessing'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  // Payment platform related fields
  paymentPlatform: {
    type: String,
    enum: ['paypal', 'pingpong', 'unknown'],
    default: 'unknown'
  },
  platformTransactionId: {
    type: String
  },
  currency: {
    type: String,
    default: 'CNY'
  },
  paymentMethod: {
    type: String
  },
  platformStatus: {
    type: String
  },
  callbackData: {
    type: mongoose.Schema.Types.Mixed
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
PaymentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Payment', PaymentSchema);
