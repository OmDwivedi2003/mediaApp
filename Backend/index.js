// index.js — Main entry point of backend

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler') // Import custom error handler middleware
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes= require('./routes/commentRoutes');

// Load env vars
dotenv.config();

// App init
const app = express();
const PORT = process.env.PORT || 4000;

// DB Connect
const db = connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // static folder for uploads

// //APi Routes

 app.use('/api/auth', authRoutes);
 app.use('/api/user', userRoutes);
 app.use('/api/post', postRoutes);
 app.use('/api/comment',commentRoutes);

// Global error handler (should be after all routes)
app.use(errorHandler);

// Default Route
app.get('/', (req, res) => {
  console.log("om Bhai ye home route  hai")
    res.send('Media App Backend Running  🚀');
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
