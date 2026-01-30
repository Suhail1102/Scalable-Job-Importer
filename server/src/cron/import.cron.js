const cron = require('node-cron');
const { startImport } = require('../services/import.service');

const FEEDS = [
  'https://jobicy.com/?feed=job_feed',
  'https://www.higheredjobs.com/rss/articleFeed.cfm'
];

cron.schedule('0 * * * *', async () => {
  for (const feed of FEEDS) {
    await startImport(feed);
  }
});
