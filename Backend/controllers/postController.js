const Post = require('../models/Post');
const User = require('../models/User');
const Comment =require('../models/Comment');

const createPost = async (req, res,next) => {
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
    await User.findByIdAndUpdate(req.userId, { $push: { posts: post._id } });

    res.status(201).json({ message: 'Post created!',createdpostdetail: post});

  } catch (error) {
    next(error);
    //res.status(500).json({ message: 'Error creating post', error });
  }
};

const getAllPosts = async (req, res,next) => {
  console.log("controller called")
  try {
    const posts = await Post.find()
      .populate('createdBy', 'name profilePic')
      .sort({ createdAt: -1 });
 //console.log(posts);
    res.status(200).json({posts:posts});
  } catch (error) {
    console.log(error);
    next(error);
   // res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// Get Single Post Detail
const getPostById = async (req, res,next) => {
  console.log("controller is called")
  try {
    const post = await Post.findById(req.params.postId)
      .populate('createdBy', 'name profilePic')
      .populate({
        path: 'comments',
        populate: { path: 'createdBy', select: 'name profilePic' }
      })
      .populate('likes', 'name profilePic');

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json({post:post});
  } catch (error) {
    next(error);
   // res.status(500).json({ message: 'Error fetching post', error });
  }
};
//edit post
const updatePost = async (req, res,next) => {
  try {
    //post id req.params.id
    const post = await Post.findById(req.params.postId);

    console.log(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.createdBy.toString() !== req.userId)
      return res.status(403).json({ message: 'Unauthorized, Only creator can edit this post' });
    const { title, desc } = req.body;
   // console.log(req.body)
    const image = req.file ? req.file.filename : post.image;
    post.title = title || post.title;
    post.desc = desc || post.desc;
    post.image = image;


    await post.save();
  
    res.status(200).json({ message: 'Post updated!', post });
  } catch (error) {
   
    next(error) 
   // res.status(500).json({ message: 'Error updating post', error });
  }
};

const deletePost = async (req, res,next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.createdBy.toString() !== req.userId)
      return res.status(403).json({ message: 'Only creator can delete this post'});

    await post.deleteOne();
    await User.findByIdAndUpdate(req.userId, { $pull: { posts: post._id } });
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  //  res.status(500).json({ message: 'Error deleting post', error });
  }
};

const likePost = async (req, res,next) => {
  console.log("controller called")
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.createdBy.toString() === req.userId)
      return res.status(403).json({ message: 'You cannot like your own post' });

    const alreadyLiked = post.likes.includes(req.userId);

    if (alreadyLiked) {
      post.likes.pull(req.userId);
      await post.save();
      return res.status(200).json({ message: 'Post Unliked' });
    } else {
      post.likes.push(req.userId);
      await post.save();
      return res.status(200).json({ message: 'Post Liked' });
    }
  } catch (error) {
    next(error);
   // res.status(500).json({ message: 'Error liking post', error });
  }
};
// search
const searchPosts = async (req, res, next) => { 
  console.log("Search controller called");
  try {
      const { keyword = '' } = req.query;

      const posts = await Post.find({
          title: { $regex: keyword, $options: 'i' }  // 'i' for case insensitive
      })
      .populate('createdBy', 'name profilePic')
      .sort({ createdAt: -1 });

      if (posts.length === 0) {
          return res.status(404).json({ message: "Bhai post nhi mila!" });
      }

      res.status(200).json({ count: posts.length, posts });
  } catch (err) {
      console.log("Error during search:", err);
      next(err);
  }
};


  

// GET all posts by logged-in user
const getMyPosts = async (req, res) => {
  console.log("controller called-->getmypost")
  try {
    const userId = req.userId;
    console.log(userId)

    const posts = await Post.find({ createdBy: req.userId })
            .populate('createdBy', 'name profilePic email')
            .populate({
                path: 'comments',
                populate: { path: 'createdBy', select: 'name profilePic' }
            })
            .sort({ createdAt: -1 });

    if(!posts) console.log("Bhai tere post hi nhi hai");
  // console.log("post:",posts)
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




// ### 1. **Create Post (`createPost`)**

// - **Purpose**: Allows a user to create a post with a title, description, and an optional image.
  
// - **Flow**:
//   - Checks if the required fields (`title`, `desc`, and `image`) are provided. If any of these are missing, it returns a `400` error with a message.
//   - Creates a new `Post` object with the data provided.
//   - Updates the `User` document by adding the newly created post ID to the `posts` array.
//   - Saves the new post to the database.
  
// - **Response**:
//   - If successful: `status 201` with the created post details.
//   - If any field is missing: `status 400` with an error message.

// ---

// ### 2. **Get All Posts (`getAllPosts`)**

// - **Purpose**: Fetches all posts from the database, populated with the user details of the creator (like name and profile picture).
  
// - **Flow**:
//   - Fetches all posts, populates the `createdBy` field (user details) and sorts them by creation date (`createdAt`).
  
// - **Response**:
//   - If successful: `status 200` with all posts data.

// ---

// ### 3. **Get Single Post Detail (`getPostById`)**

// - **Purpose**: Fetches detailed information for a single post, including comments and likes.

// - **Flow**:
//   - Finds the post by its `id` (from `req.params.id`).
//   - Populates the `createdBy` field (user details), comments (with their creator details), and likes (with user details).
//   - If the post is not found, it returns a `404` error.

// - **Response**:
//   - If successful: `status 200` with the post details.
//   - If the post is not found: `status 404` with an error message.

// ---

// ### 4. **Update Post (`updatePost`)**

// - **Purpose**: Allows the creator of the post to update the post’s title, description, and image.

// - **Flow**:
//   - Finds the post by its `id` (from `req.params.id`).
//   - Checks if the user trying to update the post is the creator (checks `post.createdBy`).
//   - If the user is authorized, it updates the post with the provided fields.
//   - If the image is not provided, it keeps the existing image.

// - **Response**:
//   - If successful: `status 200` with the updated post details.
//   - If unauthorized: `status 403` with an error message.

// ---

// ### 5. **Delete Post (`deletePost`)**

// - **Purpose**: Allows the post creator to delete their post.

// - **Flow**:
//   - Finds the post by its `id` (from `req.params.id`).
//   - Checks if the user is the creator of the post (`post.createdBy`).
//   - If authorized, it deletes the post and removes it from the `posts` array in the user's document.

// - **Response**:
//   - If successful: `status 200` with a success message.
//   - If unauthorized: `status 403` with an error message.

// ---

// ### 6. **Like/Unlike Post (`likePost`)**

// - **Purpose**: Allows users to like or unlike a post.

// - **Flow**:
//   - Finds the post by its `id` (from `req.params.id`).
//   - Checks if the user is the creator of the post, as they cannot like their own post.
//   - Checks if the user has already liked the post. If yes, it removes the like; if not, it adds the like.

// - **Response**:
//   - If successful: `status 200` with a message ("Post Liked" or "Post Unliked").
//   - If the user tries to like their own post: `status 403` with an error message.

// ---

// ### 7. **Search, Sort, and Filter Posts (`searchPosts`)**

// - **Purpose**: Allows searching and filtering of posts by keywords, sorting, and filtering by the creator’s city.

// - **Flow**:
//   - It extracts the query parameters: `keyword`, `sortBy`, `order`, and `city`.
//   - Builds a `filter` object based on the query parameters:
//     - If a `keyword` is provided, it searches for posts matching the keyword using `$text` search.
//     - If a `city` is provided, it filters posts based on the city of the user who created them.
//   - Retrieves the posts that match the filter and sorts them accordingly.
  
// - **Response**:
//   - If successful: `status 200` with the filtered, sorted posts.
//   - If there’s an error, it forwards it to the error-handling middleware.

// ---

// ### 8. **Get All Posts by Logged-in User (`getMyPosts`)**

// - **Purpose**: Fetches all posts created by the logged-in user.

// - **Flow**:
//   - Finds posts where `createdBy` matches the logged-in user's `req.userId`.
//   - Populates the `createdBy` and `comments` fields (including their creator details).
//   - Sorts the posts by `createdAt` in descending order.

// - **Response**:
//   - If successful: `status 200` with the posts created by the logged-in user.
//   - If the user has no posts: It logs a message and returns an empty list.

// ---

// ### **Error Handling**:
// - Each function uses `next(error)` to forward errors to a central error-handling middleware, where appropriate error messages are returned.

// ---

// ### **Code Summary for Better Understanding**:

// - **createPost**: Creates a post with a title, description, and image, and associates it with the user.
// - **getAllPosts**: Fetches all posts, sorted by creation date.
// - **getPostById**: Fetches details of a specific post, including comments and likes.
// - **updatePost**: Allows the creator of the post to update its details (title, description, image).
// - **deletePost**: Deletes the creator’s post.
// - **likePost**: Allows a user to like or unlike a post.
// - **searchPosts**: Filters and sorts posts based on search criteria (keyword, city, etc.).
// - **getMyPosts**: Fetches all posts created by the logged-in user.

