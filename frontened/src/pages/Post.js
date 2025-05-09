import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:4000/api/post/my-post", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data.posts);
        console.log("post Detail:", res.data);
      } catch (error) {
        setMessage("Failed to fetch your posts.");
      }
    };
    fetchMyPosts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(`http://localhost:4000/api/post/delete-post/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.filter(post => post._id !== id));
      setMessage(res.data.message || "Post deleted successfully!");
    } catch (error) {
      setMessage("Error deleting post.");
    }
  };

  const buttonStyle = {
    padding: "10px 18px",
    margin: "6px 8px 0 0",
    borderRadius: "999px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    transition: "all 0.2s ease-in-out",
  };

  const containerStyle = {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "'Poppins', sans-serif",
    color: "#222",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    marginTop: "30px",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    color: "#111",
    position: "relative",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        📸 Welcome to <span style={{ color: "#ff4b2b" }}>mediaAPP</span>
      </h2>
      <p style={{ marginBottom: "15px", color: "#555" }}>
        Create, read, edit, and delete your posts with style.
      </p>

      <Link to="/create-post">
        <button style={{ ...buttonStyle, background: "linear-gradient(to right, #00b09b, #96c93d)" }}>
          ➕ Create New Post
        </button>
      </Link>

      <hr style={{ margin: "30px 0" }} />
      <h2 style={{ fontSize: "24px", color: "#444" }}>📝 My Posts</h2>

      {posts.length === 0 ? (
        <p style={{ marginTop: "20px", fontSize: "18px" }}>No posts found.</p>
      ) : (
        <div style={gridStyle}>
          {posts.map(post => (
            <div key={post._id} style={cardStyle}>
              <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#ff416c" }}>
                {post.title}
              </h3>
              <p style={{ color: "#555", fontSize: "14px", margin: "10px 0" }}>
                {post.desc}
              </p>
              <p style={{ fontSize: "12px", color: "#aaa" }}>
                Created: {new Date(post.createdAt).toLocaleString()}
              </p>
              <div style={{ marginTop: "16px" }}>
                <Link to={`/post-detail/${post._id}`}>
                  <button style={buttonStyle}>👁️ View</button>
                </Link>
                <Link to={`/edit-post/${post._id}`}>
                  <button style={{ ...buttonStyle, background: "linear-gradient(to right, #2193b0, #6dd5ed)" }}>
                    ✏️ Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  style={{ ...buttonStyle, background: "linear-gradient(to right, #e52d27, #b31217)" }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {message && (
        <p style={{ marginTop: "25px", color: "green", fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
};

export default Post;
