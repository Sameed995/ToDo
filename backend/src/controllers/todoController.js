const Todo = require('../models/Todo');

// Get all todos for logged-in user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !status) {
      return res.status(400).json({ message: 'Title and status are required' });
    }

    const newTodo = await Todo.create({
      title,
      description: description || '',
      status,
      user: req.user._id
    });

    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update todo by ID for logged-in user
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Update fields
    if (req.body.title) todo.title = req.body.title;
    if (req.body.description) todo.description = req.body.description;
    if (req.body.status) todo.status = req.body.status; // Mark complete by sending status: 'done'

    const updated = await todo.save();
    res.json(updated);
  } catch (err) {
    console.error("Update Todo Error:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete todo by ID for logged-in user
exports.deleteTodo = async (req, res) => {
   console.log("DELETE REQ HIT:", req.params.id, "User:", req.user?._id);
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.deleteOne();
    console.log("Todo deleted successfully!");
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
