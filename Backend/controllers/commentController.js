const Comment = require('../models/Comment');
const Post = require('../models/Post');

const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.createdBy.toString() === req.userId)
      return res.status(403).json({ message: 'Cannot comment on your own post' });

    const comment = new Comment({
      text,
      createdBy: req.userId,
      post: postId,
    });
console.log(comment);
    await comment.save();
    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({commentpostdetail:comment});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

const updateComment = async (req, res) => {
  try {
    console.log(req.params)
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.createdBy.toString() !== req.userId)
      return res.status(403).json({ message: 'Unauthorized' });

    comment.text = req.body.text;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.createdBy.toString() !== req.userId)
      return res.status(403).json({ message: 'Unauthorized' });

    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id },
    });

    await comment.deleteOne();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};

module.exports ={deleteComment,updateComment,addComment};