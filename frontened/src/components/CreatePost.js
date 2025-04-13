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
    navigate(-1);  // -1 ka matlab previous page
  }

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
      setTimeout(() => navigate("/post"), 1500); // success ke baad MyPosts page pe bhej dega
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to create post."
      );
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input  type="text"  name="title"  value={post.title}    onChange={handleChange}  required />
        <br />
   <br></br>
        <label>Description:</label>
        <textarea  name="desc" value={post.desc}onChange={handleChange}  required rows={2} cols={25}></textarea>
        <br />
<br></br>
        <label>Image:</label>
        <input  type="file"  name="image" accept="image/*"   onChange={handleChange}  required />
        <br />
         <br></br>
        <button type="submit">Create Post</button>
        <button onClick={handleback}>Back</button>
      </form>
    </div>
  );
};

export default CreatePost;
