const express = require('express');
const router = express.Router();
// const {
//   createPost,
//   updatePost,
//   deletePost,
//   likePost,
//   getAllPosts,
//   getPostById
// } = require('../controllers/postController');
const upload = require("../middleware/upload");
const auth  = require('../middleware/auth');
const {createPost,getAllPosts,getPostById,updatePost,deletePost,likePost,searchPosts,getMyPosts} = require('../controllers/postController')

// @route   POST /api/post/create
// router.post('/create', isAuthenticated, createPost);
// 👇 This applies multer to extract 'image' field from form-data
router.post("/create-post",auth, upload.single("image"), createPost);


// @route   PUT /api/post/update/:id
router.put('/update-post/:id', auth, updatePost);

// @route   DELETE /api/post/delete/:id
router.delete('/delete-post/:id',auth, deletePost);

// @route   POST /api/post/like/:id
router.post('/like-post/:id',auth, likePost);

// @route   GET /api/post/
router.get('/All-post', auth, getAllPosts);

// @route   GET /api/post/:id
router.get('/single-post/:id',auth, getPostById);

// search route
router.get('/search-post', auth, searchPosts);
//my post
router.get("/my-posts", auth, getMyPosts);

module.exports = router;
