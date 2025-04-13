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
  navigate(-1);  // -1 ka matlab previous page
}


  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:4000/api/post/single-post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
          "Content-Type": "multipart/form-data"
        }
      });
      setMessage(res.data.message);
      setTimeout(() => navigate(`/post-detail/${id}`), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update post.");
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input   type="text"  name="title"  value={post.title} onChange={handleChange}  required  />
        <br />
<br></br>
        <label>Description:</label>
        <textarea  name="desc"  value={post.desc}  onChange={handleChange}  required  />
        <br />
<br></br>
        <label>Current Image:</label>
        {post.image && <img src={`http://localhost:4000/uploads/${post.image}`} alt="Current" width="100" />}
        <br />
        <br></br>
        <label>Change Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <br /><br></br>

        <button type="submit">Update Post</button>
        <button onClick={handleBack}>Go Back</button>

      </form>
    </div>
  );
};

export default EditPost;
