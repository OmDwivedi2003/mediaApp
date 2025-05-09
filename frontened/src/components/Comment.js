import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Comment = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/comment/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return alert("Comment cannot be empty!");
    try {
      await axios.post(
        `http://localhost:4000/api/comment/create-comment/${postId}`,
        { text: newComment, postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.text);
  };

  const handleUpdateComment = async () => {
    if (!editingText.trim()) return alert("Comment cannot be empty!");
    try {
      await axios.put(
        `http://localhost:4000/api/comment/update-comment/${editingCommentId}`,
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

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/comment/delete-comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div style={container}>
      <h2 style={heading}>Comments</h2>

      <div style={inputSection}>
        <input
          type="text"
          value={newComment}
          placeholder="Write a comment"
          onChange={(e) => setNewComment(e.target.value)}
          style={inputField}
        />
        <button onClick={handleAddComment} style={addBtn}>
          Add Comment
        </button>
      </div>

      <ul style={commentList}>
        {comments.map((comment) => (
          <li key={comment._id} style={commentItem}>
            {editingCommentId === comment._id ? (
              <div style={editSection}>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={inputField}
                />
                <div style={buttonGroup}>
                  <button onClick={handleUpdateComment} style={saveBtn}>
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    style={cancelBtn}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={commentTextSection}>
                <span style={commentText}>
                  <strong>{comment.createdBy.name}</strong>: {comment.text}
                </span>
                <div style={buttonGroup}>
                  <button onClick={() => handleEdit(comment)} style={editBtn}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate(-1)} style={backBtn}>
        ⬅ Go Back
      </button>
    </div>
  );
};

export default Comment;

// 🎨 Styles
const container = {
  maxWidth: "600px",
  margin: "30px auto",
  padding: "20px",
  borderRadius: "12px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  fontFamily: "Segoe UI, sans-serif",
};

const heading = {
  textAlign: "center",
  color: "#333",
  fontSize: "24px",
  marginBottom: "20px",
};

const inputSection = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const inputField = {
  flex: 1,
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const addBtn = {
  padding: "10px 14px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const commentList = {
  listStyle: "none",
  padding: 0,
};

const commentItem = {
  padding: "12px",
  marginBottom: "12px",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "8px",
};

const commentTextSection = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
};

const commentText = {
  color: "#333",
  fontSize: "15px",
};

const buttonGroup = {
  display: "flex",
  gap: "6px",
};

const editBtn = {
  backgroundColor: "#ffc107",
  border: "none",
  padding: "6px 10px",
  color: "#fff",
  borderRadius: "4px",
  cursor: "pointer",
};

const deleteBtn = {
  backgroundColor: "#dc3545",
  border: "none",
  padding: "6px 10px",
  color: "#fff",
  borderRadius: "4px",
  cursor: "pointer",
};

const saveBtn = {
  backgroundColor: "#007bff",
  border: "none",
  padding: "6px 10px",
  color: "#fff",
  borderRadius: "4px",
  cursor: "pointer",
};

const cancelBtn = {
  backgroundColor: "#6c757d",
  border: "none",
  padding: "6px 10px",
  color: "#fff",
  borderRadius: "4px",
  cursor: "pointer",
};

const editSection = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const backBtn = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#555",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
