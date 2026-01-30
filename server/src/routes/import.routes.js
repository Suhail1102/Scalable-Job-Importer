const router = require('express').Router();
const ImportLog = require('../models/ImportLog.model');
const { startImport } = require('../services/import.service');

router.get('/import-logs', async (req, res) => {
  const logs = await ImportLog.find().sort({ createdAt: -1 });
  res.json(logs);
});

router.post('/run-import', async (req, res) => {
  const { feedUrl } = req.body;

  if (!feedUrl) {
    return res.status(400).json({ message: 'feedUrl is required' });
  }

  await startImport(feedUrl);
  res.json({ message: 'Import started successfully' });
});

module.exports = router;
