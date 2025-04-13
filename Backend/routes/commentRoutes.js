const express = require('express');
const router = express.Router();
const {addComment, updateComment, deleteComment,getCommentsByPost,getSingleComment,getCommentsByUser} = require('../controllers/commentController');

const auth = require('../middleware/auth');

// @route   POST /api/comment/add/:postId
router.post('/create-comment/:postId', auth, addComment);

// @route   PUT /api/comment/update/:commentId
router.put('/update-comment/:commentId',auth, updateComment);

// @route   DELETE /api/comment/delete/:commentId
router.delete('/delete-comment/:commentId', auth, deleteComment);

router.get('/post/:postId', auth,getCommentsByPost );  // All comments for a Post

router.get('/_id', auth,getCommentsByUser ); // All comments by logged-in user

router.get('/:commentId', auth,getSingleComment); //Single comment by ID


module.exports = router;



 
