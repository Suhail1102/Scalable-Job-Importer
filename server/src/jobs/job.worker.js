const { Worker } = require('bullmq');
const redis = require('../config/redis');
const Job = require('../models/job.model');
const ImportLog = require('../models/ImportLog.model');

new Worker(
  'job-import',
  async job => {
    const { job: data, feedUrl, importLogId } = job.data;

    const externalId = data.guid?._;

    try {
      const result = await Job.updateOne(
        { externalId, source: feedUrl },
        {
          $set: {
            externalId,
            source: feedUrl,
            title: data.title,
            company: data['job:company'],
            location: data['job:location'],
            url: data.link,
            publishedAt: new Date(data.pubDate),
            raw: data,
          },
        },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        await ImportLog.findByIdAndUpdate(importLogId, {
          $inc: { newJobs: 1, totalImported: 1 },
        });
      } else {
        await ImportLog.findByIdAndUpdate(importLogId, {
          $inc: { updatedJobs: 1, totalImported: 1 },
        });
      }
    } catch (err) {
      console.error('Job insert failed:', err.message);

      await ImportLog.findByIdAndUpdate(importLogId, {
        $push: {
          failedJobs: {
            externalId,
            reason: err.message,
          },
        },
      });
    }
  },
  {
    connection: redis,
    concurrency: 5,
  }
);
