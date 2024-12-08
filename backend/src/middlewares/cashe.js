const redisClient = require('../utils/redis');

const cacheMiddleware = (keyGenerator) => async (req, res, next) => {
  try {
    const key = keyGenerator(req); // Use a function to dynamically generate keys
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      console.log('Cache hit for key:', key);
      return res.status(200).json(JSON.parse(cachedData));
    }

    res.sendResponse = res.json; // Save original `res.json` function
    res.json = async (data) => {
      await redisClient.set(key, JSON.stringify(data), {
        EX: 3600, // Cache for 1 hour
      });
      console.log('Cache set for key:', key);
      res.sendResponse(data);
    };

    next();
  } catch (err) {
    console.error('Cache middleware error:', err);
    next(); // Continue even if Redis fails
  }
};

module.exports = cacheMiddleware;