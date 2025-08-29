// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected'); // <-- IMPORT THE NEW ROUTE
const snippetRoutes = require('./routes/snippets');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use('/api/snippets', snippetRoutes);
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes); // <-- USE THE NEW ROUTE

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));