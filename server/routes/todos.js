const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

// ✅ Get all todos (only for logged-in users)
// 🧠 Get todos: If logged in, return user's todos. If not, return the most recent one created.
router.get('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const todos = await Todo.find({ user: decoded.id }).sort({ createdAt: -1 });
      return res.json(todos);
    } else {
      const guestTodos = await Todo.find({ user: { $exists: false } }).sort({ createdAt: -1 }).limit(1);
      return res.json(guestTodos);
    }
  } catch (err) {
    console.error('Error in GET /todos:', err);
    return res.status(500).json({ error: 'Failed to fetch todos' });
  }
});


// ✅ Allow both guest and logged-in users to create todos
router.post('/', async (req, res) => {
  const { text, status } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    let userId = null;

    if (token) {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    }

    const newTodo = new Todo({
      text,
      status: status || 'To Do',
      user: userId || undefined // ✅ use undefined explicitly
    });

    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// ✅ Update todo (auth only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Todo not found or not authorized' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// ✅ Delete todo (auth only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!deleted) return res.status(404).json({ error: 'Todo not found or not authorized' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
