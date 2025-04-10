import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SinglePost = () => {
  const { id } = useParams(); // getting :id from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch post detail
  useEffect(() => {
    const fetchPost = async () => {
        const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:4000/api/post/single-post/${id}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }}
        );
        setPost(res.data.post); // assuming API returns { post: {..} }
        console.log("id post",res);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching single post:", error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p style={styles.loading}>Loading post...</p>;
  }

  if (!post) {
    return <p style={styles.loading}>Post not found.</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Post Detail</h2>

      <div style={styles.card}>
        <img
          src={`http://localhost:4000/uploads/${post.image}`}
          alt="post"
          style={styles.image}
        />
        <h3>{post.caption}</h3>
        <p>Posted by: <strong>{post.createdBy?.name}</strong></p>
        <p>City: {post.createdBy?.city || 'unknown'}</p>
        <p>Likes: {post.likes?.length || 0}</p>
        <p>Comments: {post.comments?.length || 0}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
  },
};

export default SinglePost;
