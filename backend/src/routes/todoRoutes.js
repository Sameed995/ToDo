const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const protect = require('../middleware/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', protect, asyncHandler(getTodos));
router.post('/', protect, asyncHandler(createTodo));
router.put('/:id', protect, asyncHandler(updateTodo));
router.delete('/:id', protect, asyncHandler(deleteTodo));

module.exports = router;
