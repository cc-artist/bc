const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  templeId: {
    type: Number,
    required: true
  },
  templeName: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  date: {
    type: String,
    trim: true
  },
  people: {
    type: Number
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
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

// 更新updatedAt字段
ConsultationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Consultation = mongoose.model('Consultation', ConsultationSchema);

module.exports = Consultation;