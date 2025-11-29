const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

// ===== GET all todos =====
router.get('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (token) {
      // Verify token for logged-in user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const todos = await Todo.find({ user: decoded.id }).sort({ createdAt: -1 });
      return res.json(todos);
    } else {
      // Guest: return the latest guest todo
      const guestTodos = await Todo.find({ user: { $exists: false } })
        .sort({ createdAt: -1 })
        .limit(1);
      return res.json(guestTodos);
    }
  } catch (err) {
    console.error('GET /todos error:', err);
    return res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// ===== CREATE todo =====
router.post('/', async (req, res) => {
  const { text, status } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!text) return res.status(400).json({ error: 'Text is required' });

  let userId;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (err) {
      console.error('Invalid token:', err);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }

  try {
    const allowedStatus = ['To Do', 'In Progress', 'Done'];
    const safeStatus = allowedStatus.includes(status) ? status : 'To Do';

    const newTodo = new Todo({
      text,
      status: safeStatus,
      user: userId
    });

    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('POST /todos error:', err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// ===== UPDATE todo (auth only) =====
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const allowedStatus = ['To Do', 'In Progress', 'Done'];
    const updatedData = { ...req.body };

    // Validate status if provided
    if (updatedData.status && !allowedStatus.includes(updatedData.status)) {
      updatedData.status = 'To Do';
    }

    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updatedData,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Todo not found or not authorized' });
    res.json(updated);
  } catch (err) {
    console.error('PUT /todos error:', err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// ===== DELETE todo (auth only) =====
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!deleted) return res.status(404).json({ error: 'Todo not found or not authorized' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error('DELETE /todos error:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
