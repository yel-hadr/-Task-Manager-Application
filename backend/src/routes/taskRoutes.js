const express = require('express');
const { getTasks } = require('../controllers/taskController');
const cacheMiddleware = require('../middlewares/cache');

const router = express.Router();

router.get(
  '/',
  cacheMiddleware((req) => `tasks:${req.user.id}`), // Generate cache key dynamically
  getTasks
);
router.get(
    '/status/:status',
    cacheMiddleware((req) => `tasks:status:${req.params.status}`),
    getTasksByStatus
  );

module.exports = router;
