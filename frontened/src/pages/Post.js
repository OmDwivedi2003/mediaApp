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

  return (
    <div>
    <h2>Welcome to my mediaAPP , you can create,read, edit, delete your post.</h2>
        <Link to="/create-post">
        <button>Create New Post</button>
      </Link>
      <br></br><br></br><br></br>
      <hr></hr>
      <h2>My Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <div key={post._id}>
            <h3>post-title :"{post.title}"</h3>
            <p>post-desc: {post.desc}</p>
             <Link  to={`/post-detail/${post._id}`}> <button>View</button> </Link>
            <Link to={`/edit-post/${post._id}`}><button>Edit</button></Link>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
        ))
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Post;
