import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const imageStyle = {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #fff",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    marginRight: "12px",
  
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px 10px 0 0",
    border: "none",
    borderRadius: "30px",
    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  };

  const handleBack = () => navigate(-1);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:4000/api/post/single-post/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPost(res.data.post);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching single post:", error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:4000/api/post/delete-post/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
      navigate('/');
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete the post.");
      console.error("Delete error:", error);
    }
  };

  if (loading) return <p style={{ padding: "30px", fontSize: "20px" }}>Loading post...</p>;
  if (!post) return <p style={{ padding: "30px", fontSize: "20px" }}>Post not found.</p>;

  return (
    <div style={{
      maxWidth: "80%",
      margin: "50px auto",
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      padding: "24px",
      color: "#333",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "rgb(268,156,150)"
    }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
        
        {/* Left Side: Info */}
        <div style={{ flex: "1 1 400px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <img src={`http://localhost:4000/uploads/${post.createdBy.profilePic}`} alt="profile" style={imageStyle} />
            <div>
              <strong style={{ fontSize: "18px" }}>{post.createdBy.name}</strong><br />
              <small style={{ color: "#777" }}>{new Date(post.createdAt).toLocaleString()}</small>
            </div>
          </div>

          <h2 style={{ marginBottom: "10px" }}>{post.title}</h2>
          <p style={{ fontSize: "15px", color: "#555" }}>{post.desc}</p>
          <p style={{ fontSize: "13px", color: "#999" }}><strong>Post ID:</strong> {post._id}</p>
          <p style={{ fontSize: "13px", color: "#999" }}><strong>Updated:</strong> {new Date(post.updatedAt).toLocaleString()}</p>

          <h4 style={{ marginTop: "24px", color: "#ff416c" }}>❤️ {post.likes?.length || 0} Likes</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {post.likes?.map(user => (
              <div key={user._id} style={{ display: "flex", alignItems: "center" }}>
                <img src={`http://localhost:4000/uploads/${user.profilePic}`} alt="like" style={imageStyle} />
                <span>{user.name}</span>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: "30px", color: "#ff4b2b" }}>💬 {post.comments?.length || 0} Comments</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {post.comments?.map(comment => (
              <li key={comment._id} style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "12px",
                margin: "12px 0",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                  <img src={`http://localhost:4000/uploads/${comment.createdBy.profilePic}`} alt="commenter" style={imageStyle} />
                  <strong>{comment.createdBy.name}</strong>
                </div>
                <p style={{ margin: "6px 0" }}>{comment.text}</p>
                <small style={{ color: "#999" }}>{new Date(comment.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div style={{ marginTop: "24px" }}>
            <Link to={`/edit-post/${post._id}`}>
              <button style={{ ...buttonStyle, background: "linear-gradient(to right, #00b09b, #96c93d)" }}>Edit</button>
            </Link>
            <button onClick={handleDelete} style={{ ...buttonStyle, background: "linear-gradient(to right, #e52d27, #b31217)" }}>Delete</button>
            <button onClick={handleBack} style={{ ...buttonStyle }}>Back</button>
            {message && <p style={{ color: "green", marginTop: "10px", fontWeight: "bold" }}>{message}</p>}
          </div>
        </div>

        {/* Right Side: Post Image */}
        <div style={{ flex: "1 1 400px" }}>
          <img
            src={`http://localhost:4000/uploads/${post.image}`}
            alt="Post"
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "cover",
              borderRadius: "16px",
              border: "1px solid #eee",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
            }}
          />
        </div>

      </div>
    </div>
  );
};
export default SinglePost;
