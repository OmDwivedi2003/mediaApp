import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { token } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/post/All-post', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(res.data.posts);
        setPosts(res.data.posts);
      } catch (err) {
        setError('Unable to fetch posts. Check token or backend.');
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query!");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:4000/api/post/search?keyword=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data.posts);
    } catch (err) {
      setError('Error searching posts.');
      console.error(err);
    }
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Poppins', sans-serif",
    color: "#333"
  };

  const headerStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#ff416c"
  };

  const inputStyle = {
    padding: "10px",
    width: "300px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginRight: "10px"
  };

  const buttonStyle = {
    padding: "10px 16px",
    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    marginTop: "30px"
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>📸 Welcome to mediaAPP</h1>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="🔍 Search posts by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleSearch} style={buttonStyle}>Search</button>
      </div>

      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>🧾 All Posts</h2>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      <div style={gridStyle}>
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
