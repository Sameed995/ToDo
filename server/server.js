const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection failed:', err.message);
});

// ✅ Mount route
app.use('/api/todos', require('./routes/todos'));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

console.log('JWT_SECRET is:', process.env.JWT_SECRET);
