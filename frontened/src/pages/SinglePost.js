import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


const SinglePost = () => {
  const { id } = useParams(); // getting :id from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const  imageStyle={
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "10px",
  }   
const handleback = () => {
  navigate(-1);  // -1 ka matlab previous page
}
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
        console.log("post details: ",res.data.post);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching single post:", error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem("token");
   const res=  await axios.delete(`http://localhost:4000/api/post/delete-post/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.message);
      setMessage(res.data.message); 

   //   alert("Post deleted successfully!");
      // Navigate back to home or posts list
     // window.location.href = "/";  // ya navigate('/home');
     navigate('/');
    } catch (error) {
    //  alert("Failed to delete the post.");
      setMessage(error.response?.data?.message || "Failed to delete the post.");
      console.error("Delete error:", error);
    }
  };
  

  if (loading) {
    return <p >Loading post...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div >
      <h2>Post Detail</h2>

      <div >
        <img
          src={`http://localhost:4000/uploads/${post.image}`}  alt="post" width={300} height={200} />
        <h3>Title: {post.title}</h3> 
        <p>Post_id:{post._id}</p>

        <div>
        <strong>Posted by: {post.createdBy.name}</strong>
        <img src={`http://localhost:4000/uploads/${post.createdBy.profilePic}`} alt="profile" style={imageStyle}/>
      </div>
        <p>Description: {post.desc || ''}</p>
        <p>Likes: {post.likes?.length || 0}</p>
<ul>
  {post.likes && post.likes.map((user) => (
    <li key={user._id}>
      <img src={`http://localhost:4000/uploads/${user.profilePic}`} alt="profile" style={imageStyle} />
      {user.name}
    </li>
  ))}
</ul>

<p>Comments: {post.comments?.length || 0}</p>
<ul>
  {post.comments && post.comments.map((comment) => (
    <li key={comment._id}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={`http://localhost:4000/uploads/${comment.createdBy.profilePic}`} alt="commenter" style={imageStyle} />
        <strong>{comment.createdBy.name}</strong>
      </div>
      <p>{comment.text}</p>
      <small>{new Date(comment.createdAt).toLocaleString()}</small>
    </li>
  ))}
</ul>

      
      </div>
    
     <div>
     <Link to={`/edit-post/${post._id}`}>
      <button>Edit</button>
      </Link>

     <button onClick={handleDelete}>Delete</button>
     {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}

<button onClick={handleback}>Back</button>
     </div>
    
    </div> 
  );
};



export default SinglePost;
