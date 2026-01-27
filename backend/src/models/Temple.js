const mongoose = require('mongoose');

const TempleSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  features: {
    type: [String],
    default: []
  },
  route: {
    transport: {
      type: String,
      required: true,
      trim: true
    },
    itinerary: {
      type: String,
      required: true,
      trim: true
    },
    combination: {
      type: String,
      trim: true
    }
  },
  culture: {
    type: [String],
    default: []
  },
  highlights: {
    type: [String],
    default: []
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
TempleSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Temple = mongoose.model('Temple', TempleSchema);

module.exports = Temple;