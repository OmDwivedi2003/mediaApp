// src/pages/MyPosts.jsx

import React, { useEffect, useState } from "react";
import axios from "axios"; // Direct axios (local instance bhi bana sakta hai)

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/post/my-posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMyPosts(res.data.posts);
    } catch (error) {
      console.error(
        "Error fetching your posts:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>📜 Your Posts</h2>

      {myPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        myPosts.map((post) => (
          <div key={post._id} >
            <h3>{post.title}</h3>
            <p>{post.desc}</p>

            {post.image && (
              <img
                src={`http://localhost:4000/uploads/${post.image}`}
                alt="post"
               
              />
            )}

            <p>👍 Likes: {post.likes.length}</p>
            <p>💬 Comments: {post.comments.length}</p>
            <p>🕒 Posted on: {new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPosts;
