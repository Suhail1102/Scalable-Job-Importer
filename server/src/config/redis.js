require('dotenv').config();

const Redis = require('ioredis');

if (!process.env.REDIS_URL) {
  throw new Error('❌ REDIS_URL is missing in .env');
}

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redis.on('connect', () => {
  console.log(' Redis connected (cloud)');
});

redis.on('error', (err) => {
  console.error('Redis error:', err.message);
});

module.exports = redis;
