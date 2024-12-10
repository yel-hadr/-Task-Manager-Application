const Task = require('../models/Task');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const createTask = async (req, res) => {
  try {
    console.log('Creating task...');
    const { title, description, status } = req.body;
    const task = new Task({
      title,
      description,
      status,
      user: req.user.id, // Associate with the logged-in user
    });
    await task.save();
    console.log('Task created:', task);
    res.status(201).json(task);
  } catch (err) {
    console.error('Failed to create task:', err);
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    console.log('Fetching tasks...');
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      console.log('Invalid task ID:', id);
      return res.status(400).send({ error: 'Invalid task ID' });
    }
    const task = await Task.findById(id);
    if (!task) {
      console.log('Task not found:', id);
      return res.status(404).send({ error: 'Task not found' });
    }
    console.log('Task fetched:', task);
    res.send(task);
  } catch (error) {
    console.error('Failed to fetch task:', error);
    res.status(500).send({ error: 'Failed to fetch task' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      console.log('Invalid task ID:', id);
      return res.status(400).send({ error: 'Invalid task ID' });
    }
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
      console.log('Task not found:', id);
      return res.status(404).send({ error: 'Task not found' });
    }
    console.log('Task updated:', task);
    res.send(task);
  } catch (error) {
    console.error('Failed to update task:', error);
    res.status(500).send({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      console.log('Invalid task ID:', id);
      return res.status(400).send({ error: 'Invalid task ID' });
    }
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      console.log('Task not found:', id);
      return res.status(404).send({ error: 'Task not found' });
    }
    console.log('Task deleted:', task);
    res.send({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Failed to delete task:', error);
    res.status(500).send({ error: 'Failed to delete task' });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
