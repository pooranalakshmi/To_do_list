const express = require('express');
const Task = require('../models/models'); // Adjust the path as needed
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new task
router.post('/add', async (req, res) => {
    const { todo } = req.body;
    const task = new Task({ todo });

    try {
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update task completion status
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { isCompleted } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { isCompleted }, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
