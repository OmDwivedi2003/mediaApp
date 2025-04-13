const express = require('express');
const router = express.Router();

const upload = require("../middleware/upload");
const auth  = require('../middleware/auth');
const {createPost,getAllPosts,getPostById,updatePost,deletePost,likePost,searchPosts,getMyPosts} = require('../controllers/postController')

// @route   POST /api/post/create
// router.post('/create', isAuthenticated, createPost);
// 👇 This applies multer to extract 'image' field from form-data
router.post("/create-post",auth, upload.single("image"), createPost);


// @route   PUT /api/post/update/:id
router.put('/update-post/:postId', auth, upload.single("image"), updatePost);

// @route   DELETE /api/post/delete/:id
router.delete('/delete-post/:postId',auth, deletePost);

// @route   GET /api/post/
router.get('/All-post', auth, getAllPosts);

// @route   GET /api/post/:id
router.get('/single-post/:postId',auth, getPostById);

// @route my post 
// router.get('/my-post/:userId',auth, getMyPosts);
router.get('/my-post',auth, getMyPosts);


// @route   POST /api/post/like/:id
router.post('/like-post/:postId',auth, likePost);


// search route
router.get('/search', auth, searchPosts);


module.exports = router;
