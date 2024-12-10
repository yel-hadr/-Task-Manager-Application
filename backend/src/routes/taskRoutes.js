const express = require('express');
const {
  getTasks,
  getTaskById, 
  createTask,
  deleteTask,
  updateTask }= require('../controllers/taskController');
const authenticate = require('../middlewares/authMiddleware')
const cacheMiddleware = require('../middlewares/cashe')

const router = express.Router();

// Create a new task
router.post('/', authenticate, createTask);

// Get all tasks
router.get(
  '/',
  authenticate,
  cacheMiddleware((req) => `tasks:${req.user.id}`),
  getTasks
);

// Get a single task by ID
router.get('/:id', authenticate, 
  cacheMiddleware((req) => `tasks:${req.user.id}`),
  getTaskById);

// Update a task
router.put('/:id',
  authenticate,
  cacheMiddleware((req) => `tasks:${req.user.id}`),
  updateTask);

// Delete a task
router.delete('/:id',
  authenticate,
  cacheMiddleware((req) => `tasks:${req.user.id}`),
  deleteTask);


module.exports = router;
