const Post = require('../models/Post');
const User = require('../models/User');
const { post } = require('../routes/authRoutes');

const createPost = async (req, res) => {
  try {
    const { title, desc } = req.body;
    // const image = req.file?.path||req.file?.filename;
    const image = req.file ? req.file.filename : null;


    if (!title || !desc || !image) {
      return res.status(400).json({ message: "All fields including image are required" });
    }
    const post = new Post({
      title,
      desc,
      image,
      createdBy: req.userId,
    });

    await post.save();
    res.status(201).json({createdpostdetail: post});

  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

const getAllPosts = async (req, res) => {
  console.log("controller called")
  try {
    const posts = await Post.find()
      .populate('createdBy', 'name profilePic')
      .sort({ createdAt: -1 });
 console.log(posts);
    res.status(200).json({posts:posts});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

const getPostById = async (req, res) => {
  console.log("controller is called")
  try {
    const post = await Post.findById(req.params.id)
      .populate('createdBy', 'name profilePic')
      .populate({
        path: 'comments',
        populate: { path: 'createdBy', select: 'name profilePic' }
      })
      .populate('likes', 'name profilePic');

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json({post:post});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const post = await Post.findById(req.params.id);
    console.log(req.params)
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.createdBy.toString() !== req.userId)
      return res.status(403).json({ message: 'Unauthorized' });

    post.title = title || post.title;
    post.desc = desc || post.desc;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.createdBy.toString() !== req.userId)
      return res.status(403).json({ message: 'Unauthorized' });

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.createdBy.toString() === req.userId)
      return res.status(403).json({ message: 'You cannot like your own post' });

    const alreadyLiked = post.likes.includes(req.userId);

    if (alreadyLiked) {
      post.likes.pull(req.userId);
      await post.save();
      return res.status(200).json({ message: 'Unliked' });
    } else {
      post.likes.push(req.userId);
      await post.save();
      return res.status(200).json({ message: 'Liked' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error });
  }
};
// search

const searchPosts = async (req, res) => {
  console.log("search post controller called")
  try {
    const { keyword } = req.query;
     console.log(req.query)
    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({ message: "Search keyword is required" });
    }

    const posts = await Post.find({ $text: { $search: keyword } })
      .populate('createdBy', 'name profilePic')
      .populate({
        path: 'comments',
        populate: { path: 'createdBy', select: 'name profilePic' }
      });
     console.log(posts)
    res.status(200).json({ resultCount: posts.length, results: posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error searching posts', error });
  }
};


// GET all posts by logged-in user
const getMyPosts = async (req, res) => {
  console.log("controller called-->getmypost")
  try {
    const userId = req.userId;
    console.log(userId)

    const posts = await Post.find({ createdBy: userId }).populate("createdBy", "name email");
    if(!posts) console.log("Bhai tere post hi nhi hai");
   console.log("post:",posts)
    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch your posts", error: error.message });
  }
};

module.exports ={likePost, createPost,updatePost,deletePost,getAllPosts,getPostById, searchPosts, getMyPosts};
