// Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';


function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = async () => {
    console.log(searchQuery);
    try {
      if (!searchQuery.trim()) {
        alert("Please enter a search query!");
        return;
      }
  
      const res = await axios.get(`http://localhost:4000/api/post/search?keyword=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data.posts);
      setPosts(res.data.posts); // assume backend returns {posts: []}
    } catch (err) {
      setError('Error searching posts.');
      console.error(err);
    }
  };
  

  return (
    <>
    <h1>Welcome to Home Page </h1>
    <input  type="text" placeholder="Search posts by title..."  value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)}style={{ padding: "8px", marginBottom: "10px", width: "300px" }}/>
      <button onClick={handleSearch} style={{ padding: "8px", marginLeft: "5px" }}>Search</button>

      <h2>All Posts</h2>
      {error && <p>{error}</p>}
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
           ))}
    </>
  );
}

export default Home;

