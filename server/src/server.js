const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const importRoutes = require('./routes/import.routes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
}));

// API routes
app.use('/api', importRoutes);

// 👇 START THE WORKER
require('./jobs/job.worker');

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');

  app.listen(5000, () => {
    console.log('Server running on 5000');
  });
});
