const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController');
const upload = require('../middleware/upload');

// @route   POST /api/auth/signup
//router.post('/signup', signup);
router.post("/signup", upload.single("profilePic"), signup);

// @route   POST /api/auth/login
router.post('/login', login);

// @route   POST /api/auth/logout
router.post('/logout', logout);

module.exports = router;
