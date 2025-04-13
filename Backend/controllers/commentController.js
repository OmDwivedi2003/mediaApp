const Comment = require('../models/Comment');
const Post = require('../models/Post');

const addComment = async (req, res, next) => {
  try {
    const { text,parentComment } = req.body;
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.createdBy.toString() === req.userId)
      return res.status(403).json({ message: 'Cannot comment on your own post' });

    const newComment = new Comment({
      text,
      createdBy: req.userId,
      postId: postId,
    });
console.log(newComment);

await newComment.save();

post.comments.push(newComment._id);
await post.save();
res.status(201).json({ message: 'Comment added!', comment: newComment });
;
  } catch (error) {
    console.log(error)
    next(error);
    //res.status(500).json({ message: 'Error adding comment', error });
  }
};

const updateComment = async (req, res, next) => {
  try {
   // console.log(req.params)
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.createdBy.toString() !== req.userId)
      return res.status(403).json({ message: 'Unauthorized, Only the creator can edit this comment!' });
    const { text } = req.body;
    comment.text = text;
    await comment.save();
    res.status(200).json({ message: 'Comment updated!', comment });
  } catch (error) {
    next(error);
   // res.status(500).json({ message: 'Error updating comment', error });
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.createdBy.toString() !== req.userId)
      return res.status(403).json({ message: 'Unauthorized, only the creator can delete this comment!' });

    await Comment.deleteOne({ _id: req.params.commentId });

        await Post.findByIdAndUpdate(comment.postId, {
            $pull: { comments: req.params.commentId }
        });

    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    next(error);
   // res.status(500).json({ message: 'Error deleting comment', error });
  }
};

// 💡 1️⃣ Get all comments for a specific post
const getCommentsByPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    console.log("postid:",postId);
    const comments = await Comment.find({ postId })
      .populate('createdBy', 'name profilePic')
      .sort({ createdAt: -1 });
  console.log("all comment of post",comments);
    res.status(200).json({ count: comments.length, comments });
  } catch (error) {
    next(error);
  }
};

// 💡 2️⃣ Get all comments by a specific user
const getCommentsByUser = async (req, res, next) => {
  console.log("called");
  try {
    const userId = req.userId;  // from auth middleware
    const comments = await Comment.find({ createdBy: userId })
      .populate('postId', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({ count: comments.length, comments });
  } catch (error) {
    next(error);
  }
};

// 💡 3️⃣ Get single comment by ID
const getSingleComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId)
      .populate('createdBy', 'name profilePic')
      .populate('postId', 'title');

    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ comment });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addComment,
  updateComment,
  deleteComment,
  getCommentsByPost,
  getCommentsByUser,
  getSingleComment
};


// Here's a breakdown of how the **Comment Controller** methods work in your code:

// ---

// ### 1. **Add Comment (`addComment`)**

// - **Purpose**: Allows a user to add a comment to a post. Comments can be replies to other comments (nested comments).

// - **Flow**:
//   - First, it checks if the post exists by searching for the `postId` in the request parameters (`req.params.postId`).
//   - If the post is found, it checks if the current user is the creator of the post. If the user is the creator, they cannot comment on their own post.
//   - It creates a new `Comment` with the provided text and optional `parentComment` (for nested comments).
//   - The new comment is then saved, and its `_id` is pushed to the `comments` array of the associated post.
  
// - **Response**:
//   - If successful: `status 201` with the message "Comment added!" and the newly created comment.
//   - If the post is not found: `status 404` with an error message.
//   - If the user tries to comment on their own post: `status 403` with an error message.

// ---

// ### 2. **Update Comment (`updateComment`)**

// - **Purpose**: Allows a user to update their own comment.

// - **Flow**:
//   - Finds the comment by its `id` (from `req.params.commentId`).
//   - Checks if the comment exists; if not, it returns a `404` error.
//   - Verifies if the user requesting the update is the creator of the comment.
//   - If the user is authorized, it updates the comment's `text` field with the new data from `req.body`.
//   - Saves the updated comment.
  
// - **Response**:
//   - If successful: `status 200` with the message "Comment updated!" and the updated comment.
//   - If the comment is not found: `status 404` with an error message.
//   - If the user is not authorized to update the comment: `status 403` with an error message.

// ---

// ### 3. **Delete Comment (`deleteComment`)**

// - **Purpose**: Allows a user to delete their own comment.

// - **Flow**:
//   - Finds the comment by its `id` (from `req.params.commentId`).
//   - Checks if the comment exists; if not, it returns a `404` error.
//   - Verifies if the user requesting the deletion is the creator of the comment.
//   - If the user is authorized, it deletes the comment and removes its `_id` from the `comments` array of the associated post.
  
// - **Response**:
//   - If successful: `status 200` with the message "Comment deleted".
//   - If the comment is not found: `status 404` with an error message.
//   - If the user is not authorized to delete the comment: `status 403` with an error message.

// ---

// ### **Code Summary for Better Understanding**:

// - **addComment**: Adds a comment to a post and links it to the post's `comments` array. If it's a reply, it can be a nested comment (via `parentComment`).
// - **updateComment**: Allows users to edit their own comment. Only the creator of the comment can edit it.
// - **deleteComment**: Allows users to delete their own comment. Only the creator of the comment can delete it, and it will be removed from the associated post's `comments` array.

// ---

// ### **Error Handling**:
// - For each function, errors are forwarded to the `next(error)` middleware for centralized error handling.
// - If any comment or post is not found, appropriate error messages are returned with `404` status codes.
// - Unauthorized actions (e.g., commenting on one's own post or updating/deleting comments made by others) return `403` status codes.

// ---

// This should give you a clear understanding of how each comment-related controller works. Let me know if you need more clarification!