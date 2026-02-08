const mongoose = require('mongoose');

const ServiceStatusSchema = new mongoose.Schema({
  backendService: {
    type: String,
    enum: ['running', 'stopped', 'error'],
    default: 'running'
  },
  frontendService: {
    type: String,
    enum: ['running', 'stopped', 'error'],
    default: 'running'
  },
  databaseConnection: {
    type: String,
    enum: ['connected', 'disconnected', 'error'],
    default: 'connected'
  },
  apiResponseTime: {
    type: Number,
    default: 23
  },
  cpuUsage: {
    type: Number,
    default: 32
  },
  memoryUsage: {
    type: Number,
    default: 45
  },
  diskSpace: {
    type: Number,
    default: 68
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ServiceStatus', ServiceStatusSchema);
