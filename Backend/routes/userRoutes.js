const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {getuser,updateuser,deleteuser} =require('../controllers/userController')
const upload  = require('../middleware/upload')

// @route   GET /api/user/profile
router.get('/profile',auth, getuser);

// @route   PUT /api/user/update
router.put('/update-profile', auth,upload.single("profilePic"), updateuser);

// @route   DELETE /api/user/delete
router.delete('/delete-profile',auth, deleteuser);

module.exports = router;
