const mongoose = require('mongoose');

const BlessingSchema = new mongoose.Schema({
  totalCount: {
    type: Number,
    default: 1234
  },
  todayCount: {
    type: Number,
    default: 45
  },
  thisWeekCount: {
    type: Number,
    default: 234
  },
  thisMonthCount: {
    type: Number,
    default: 892
  },
  distribution: {
    itemBlessing: {
      type: Number,
      default: 65
    },
    personalBlessing: {
      type: Number,
      default: 25
    },
    familyBlessing: {
      type: Number,
      default: 10
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blessing', BlessingSchema);
