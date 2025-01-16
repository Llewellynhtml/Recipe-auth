const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');
require('dotenv').config();

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', recipeRoutes);

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
