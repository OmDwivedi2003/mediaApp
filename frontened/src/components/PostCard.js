// components/PostCard.jsx
import React from 'react';
import { Link } from "react-router-dom";

import axios from "axios";
import { useAuth } from '../context/AuthContext';
const PostCard = ({ post }) => {
  
  const { token } = useAuth();  // context se token aur user le rahe hain


  const  imageStyle={
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        objectFit: "cover",
        marginRight: "10px",
      }
      
    
  const handleLike = async () => {
    try {
      const res = await axios.post(`http://localhost:4000/api/post/like-post/${post._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res.message)
      window.location.reload(); // Like update ke baad reload
    } catch (error) {
      
      console.error("Error liking post:", error.response?.data?.message);
    }
  };

  return (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px'}}>
      <div>
        <strong>Posted by: {post.createdBy.name}</strong>
        <img src={`http://localhost:4000/uploads/${post.createdBy.profilePic}`} alt="profile" style={imageStyle}/>
      </div>
      
      <h3>PostTitle : {post.title}</h3>
      {/* <p>Description : {post.desc}</p> */}

      {/* <img src={`http://localhost:4000/uploads/${post.image}`} alt="post" width="70" height={'70px'}/> */}

      {/* <p>Likes: {post.likes.length}</p>
      <p>Comments: {post.comments.length}</p> */}
      <Link    to={`/post-detail/${post._id}`}>
       <button>View</button>
       </Link>
       <button onClick={handleLike} style={{ marginLeft: "10px" }}>
          Like ({post.likes.length})
        </button>
        
        <Link to={`/create-comment/${post._id}`}>
          <button style={{ marginLeft: "10px" }}>Comment ({post.comments.length})</button>
        </Link>
    
      

    </div>
  );
};

export default PostCard;




  
