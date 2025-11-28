const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== Routes =====
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

// ===== Optional: simple root for health check =====
app.get('/', (req, res) => {
  res.send('Server is running');
});

// ===== MongoDB connection =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection failed:', err.message));

// ===== Start server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log('JWT_SECRET is:', process.env.JWT_SECRET);
