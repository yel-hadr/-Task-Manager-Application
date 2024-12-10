const redisClient = require('../utils/redis'); // Ensure Redis client is set up

const cacheMiddleware = (keyGenerator) => async (req, res, next) => {
  const key = keyGenerator(req);
  const cachedData = await redisClient.get(key);

  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  res.sendResponse = res.send; // Preserve the original `res.send` method
  res.send = (body) => {
    redisClient.set(key, JSON.stringify(body), 'EX', 3600); // Cache for 1 hour
    res.sendResponse(body); // Call the original `res.send` method
  };

  next();
};

module.exports = cacheMiddleware;