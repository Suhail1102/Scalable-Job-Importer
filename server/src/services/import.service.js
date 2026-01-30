const jobQueue = require('../jobs/job.queue');
const ImportLog = require('../models/ImportLog.model');
const { fetchFeed } = require('./feed.service');

exports.startImport = async (feedUrl) => {
  const jobs = await fetchFeed(feedUrl);

  const importLog = await ImportLog.create({
    fileName: feedUrl,
    timestamp: new Date(),
    totalFetched: jobs.length,
    totalImported: 0,
    newJobs: 0,
    updatedJobs: 0,
    failedJobs: []
  });

  for (const job of jobs) {
    await jobQueue.add('import-job', {
      job,
      feedUrl,
      importLogId: importLog._id
    });
  }
};
