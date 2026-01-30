const mongoose = require('mongoose');

const ImportLogSchema = new mongoose.Schema({
  fileName: String,
  timestamp: Date,
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: [
    {
      externalId: String,
      reason: String
    }
  ]
});

module.exports = mongoose.model('ImportLog', ImportLogSchema);
