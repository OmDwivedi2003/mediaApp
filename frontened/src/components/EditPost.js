import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", desc: "", image: "" });
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // go back
  };

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:4000/api/post/single-post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(res.data.post);
      } catch (error) {
        setMessage("Failed to fetch post.");
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setNewImage(e.target.files[0]);
    } else {
      setPost({ ...post, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("desc", post.desc);
    if (newImage) formData.append("image", newImage);

    try {
      const res = await axios.put(`http://localhost:4000/api/post/update-post/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message);
      setTimeout(() => navigate(`/post-detail/${id}`), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update post.");
    }
  };

  return (
    <div style={container}>
      <h2 style={heading}>Edit Post</h2>
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
          <label>Current Image:</label>
          {post.image && (
            <img
              src={`http://localhost:4000/uploads/${post.image}`}
              alt="Current"
              style={{ width: "100px", borderRadius: "6px", marginTop: "5px" }}
            />
          )}
        </div>

        <div style={formGroup}>
          <label>Change Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div style={buttonGroup}>
          <button type="submit" style={submitBtn}>Update Post</button>
          <button type="button" onClick={handleBack} style={backBtn}>Go Back</button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;

// 🔧 Styles
const container = {
  maxWidth: "550px",
  margin: "40px auto",
  padding: "25px",
  backgroundColor: "#f9f9f9",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  fontFamily: "'Segoe UI', sans-serif",
};

const heading = {
  textAlign: "center",
  marginBottom: "25px",
  color: "#333",
  fontSize: "24px",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const buttonGroup = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
};

const submitBtn = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const backBtn = {
  padding: "10px 20px",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const messageStyle = {
  color: "green",
  textAlign: "center",
  fontWeight: "500",
  marginBottom: "15px",
};
