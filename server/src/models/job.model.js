const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  externalId: String,
  source: String,
  title: String,
  company: String,
  location: String,
  url: String,
  publishedAt: Date,
  raw: Object
}, { timestamps: true });

JobSchema.index({ externalId: 1, source: 1 }, { unique: true });

module.exports = mongoose.model('Job', JobSchema);
