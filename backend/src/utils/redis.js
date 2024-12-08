const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URI // Use the service name 'redis' defined in docker-compose.yml
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});
  
  



module.exports = redisClient;