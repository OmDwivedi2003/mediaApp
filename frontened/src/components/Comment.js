import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

const Comment = () => {
  const { postId } = useParams(); // URL se postId le raha
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
console.log(postId);
  // 🟢 Fetch Comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/comment/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(res.data.comments);
    //  console.log(res.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // 🟢 Create Comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return alert("Comment cannot be empty!");
    try {
      await axios.post(`http://localhost:4000/api/comment/create-comment/${postId}`, 
        { text: newComment, postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchComments();  // Refresh list
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // 🟢 Start Edit
  const handleEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.text);
  };

  // 🟢 Submit Edit
  const handleUpdateComment = async () => {
    if (!editingText.trim()) return alert("Comment cannot be empty!");
    try {
      await axios.put(`http://localhost:4000/api/comment/update-comment/${editingCommentId}`, 
        { text: editingText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingCommentId(null);
      setEditingText("");
      fetchComments();
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // 🟢 Delete Comment
  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/comment/delete-comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <h2>Comments for Post</h2>

      <div> <input  type="text" value={newComment}  placeholder="Write a comment"  onChange={(e) => setNewComment(e.target.value)} />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>

      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            {editingCommentId === comment._id ? (
              <>
                <input 
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={handleUpdateComment}>Save</button>
                <button onClick={() => setEditingCommentId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{comment.createdBy.name}: {comment.text}</span>
                <button onClick={() => handleEdit(comment)}>Edit</button>
                <button onClick={() => handleDelete(comment._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>
         Go Back
      </button>
    </div>
  );
};

export default Comment;


