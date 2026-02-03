const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const importRoutes = require('./routes/import.routes');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));


// API routes
app.use('/api', importRoutes);

// START THE WORKER
require('./jobs/job.worker');

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
