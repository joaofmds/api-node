const redis = require('redis');
const config = require('../config/config');

const redisClient = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

module.exports = redisClient;
