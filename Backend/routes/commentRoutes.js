const express = require('express');
const router = express.Router();
const {addComment, updateComment, deleteComment} = require('../controllers/commentController');

const auth = require('../middleware/auth');

// @route   POST /api/comment/add/:postId
router.post('/create-comment/:postId', auth, addComment);

// @route   PUT /api/comment/update/:commentId
router.put('/update-comment/:commentId',auth, updateComment);

// @route   DELETE /api/comment/delete/:commentId
router.delete('/delete-comment/:commentId', auth, deleteComment);

module.exports = router;
