// Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const { token } = useAuth(); // context ka use kiya
  useEffect(() => {
    const fetchPosts = async () => {
      try {
       // const token = localStorage.getItem('token');
      
        const res = await axios.get('http://localhost:4000/api/post/All-post', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data.posts);
        setPosts(res.data.posts); // backend me posts array me aa rha hoga
      } catch (err) {
        setError('Unable to fetch posts. Check token or backend.');
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
    <h1>Welcome to Home Page </h1>
      <h2>All Posts</h2>
      {error && <p>{error}</p>}
      {posts.map(post => (
        <Link    to={`/post-detail/${post._id}`}>
         <PostCard key={post._id} post={post} />
        </Link>
       
      ))}
    </div>
  );
}

export default Home;

