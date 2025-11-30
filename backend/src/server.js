// Load env
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
console.log("Loaded MONGO_URI =", process.env.MONGO_URI);

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middlewares (must be before routes)
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // auth routes
app.use('/api/todos', require('./routes/todoRoutes')); // todo routes

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: err.message });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
