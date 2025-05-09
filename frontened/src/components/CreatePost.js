import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", desc: "", image: null });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setPost({ ...post, image: e.target.files[0] });
    } else {
      setPost({ ...post, [e.target.name]: e.target.value });
    }
  };

  const handleback = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("desc", post.desc);
    formData.append("image", post.image);

    try {
      const res = await axios.post("http://localhost:4000/api/post/create-post", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message);
      setTimeout(() => navigate("/post"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create post.");
    }
  };

  return (
    <div style={container}>
      <h2 style={heading}>Create New Post</h2>
      {message && <p style={messageStyle}>{message}</p>}
      <form onSubmit={handleSubmit} style={form}>
        <div style={formGroup}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>

        <div style={formGroup}>
          <label>Description:</label>
          <textarea
            name="desc"
            value={post.desc}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>

        <div style={formGroup}>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <div style={buttonGroup}>
          <button type="submit" style={submitBtn}>Create Post</button>
          <button type="button" onClick={handleback} style={backBtn}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

// 🔧 Styles
const container = {
  maxWidth: "550px",
  margin: "40px auto",
  padding: "25px",
  backgroundColor: "#f4f4f4",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  fontFamily: "'Segoe UI', sans-serif"
};

const heading = {
  textAlign: "center",
  marginBottom: "25px",
  color: "#333",
  fontSize: "24px"
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const buttonGroup = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px"
};

const submitBtn = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const backBtn = {
  padding: "10px 20px",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const messageStyle = {
  color: "green",
  textAlign: "center",
  fontWeight: "500",
  marginBottom: "15px"
};
