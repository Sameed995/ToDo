
console.log(">>> LOADED TODO MODEL", __filename);
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    description: { type: String, default: "" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);
