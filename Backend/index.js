// index.js — Main entry point of backend

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');

// Load env vars
dotenv.config();

// App init
const app = express();
const PORT = process.env.PORT || 4000;

// DB Connect
const db_connent = db();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/post', require('./routes/postRoutes'));
// app.use('/api/comment', require('./routes/commentRoutes'));

// Error middleware
app.use((err, req, res, next) => {
    console.log("bhai error agya !");
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Default Route
app.get('/', (req, res) => {
    res.send('Media App API Working ✅');
  });
  
// Start server
app.listen(PORT, () => {
  console.log(`OM Bhai Server jo hai first class chal rha hai on --> http://localhost:${PORT}`);
});


// 1. dotenv — for loading sensitive credentials like Mongo URI, JWT_SECRET
// 2. cookieParser — to read JWT from cookies
// 3. cors — allow frontend (http://localhost:3000) to access API
// 4. express.static — to serve uploaded images
// 5. Modular Routing — keep routes clean and separated
// 6. Global Error Handling Middleware
