import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import { FaHeart, FaCommentDots, FaEye } from "react-icons/fa";

const PostCard = ({ post }) => {
  const { token } = useAuth();

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:4000/api/post/like-post/${post._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.location.reload();
    } catch (error) {
      console.error("Error liking post:", error.response?.data?.message);
    }
  };

  const cardStyle = {
    borderRadius: "16px",
    padding: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    color: "#333",
    overflow: "hidden",
  };

  const profileContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px"
  };

  const imageStyle = {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "10px",
    border: "1px solid #ccc"
  };

  const postImage = {
    width: "100%",
    aspectRatio: "1/1",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
    transition: "transform 0.3s ease",
  };

  const postTitle = {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "10px",
    padding: "0 4px"
  };

  const buttonRow = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 4px",
    gap: "8px"
  };

  const iconBtn = {
    flex: 1,
    padding: "6px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    fontSize: "14px",
    gap: "6px"
  };

  // Format createdAt
  const formattedDate = new Date(post.createdAt).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div style={cardStyle}>
      {/* Profile Info + Date */}
      <div style={profileContainer}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={`http://localhost:4000/uploads/${post.createdBy.profilePic}`}
            alt="profile"
            style={imageStyle}
          />
          <strong>{post.createdBy.name}</strong>
        </div>
        <span style={{ fontSize: "12px", color: "#777" }}>{formattedDate}</span>
      </div>

      {/* Post Title */}
      <div style={postTitle}>{post.title}</div>

      {/* Post Image */}
      {post.image && (
        <img
          src={`http://localhost:4000/uploads/${post.image}`}
          alt="post"
          style={postImage}
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
        />
      )}

      {/* Action Buttons */}
      <div style={buttonRow}>
        <Link to={`/post-detail/${post._id}`} style={{ flex: 1 }}>
          <button style={{ ...iconBtn, backgroundColor: "#f0f0f0" }}>
            <FaEye /> View
          </button>
        </Link>

        <button onClick={handleLike} style={{ ...iconBtn, backgroundColor: "#ffe4e4" }}>
          <FaHeart style={{ color: "red" }} />
          {post.likes.length}
        </button>

        <Link to={`/create-comment/${post._id}`} style={{ flex: 1 }}>
          <button style={{ ...iconBtn, backgroundColor: "#e0f7ff" }}>
            <FaCommentDots style={{ color: "#007BFF" }} />
            {post.comments.length}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
