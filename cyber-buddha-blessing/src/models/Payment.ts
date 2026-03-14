import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed', 'cancelled', 'refunded'],
    required: true,
    default: 'pending'
  },
  paymentPlatform: {
    type: String,
    enum: ['paypal', 'pingpong', 'unknown'],
    default: 'unknown'
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

// 确保模型不会被重复定义
let Payment;

if (mongoose.models.Payment) {
  Payment = mongoose.models.Payment;
} else {
  Payment = mongoose.model('Payment', PaymentSchema);
}

export default Payment;