// components/PostCard.jsx
import React from 'react';

const PostCard = ({ post }) => {
  const  imageStyle={
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        objectFit: "cover",
        marginRight: "10px",
      }
  return (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      <div>
        <strong>Posted by: {post.createdBy.name}</strong>
        <img src={`http://localhost:4000/uploads/${post.createdBy.profilePic}`} alt="profile" style={imageStyle}/>
      </div>
       <p>Post_id:{post._id}</p>
      <h3>PostTitle : {post.title}</h3>
      <p>Description : {post.desc}</p>

      <img src={`http://localhost:4000/uploads/${post.image}`} alt="post" width="200" />

      <p>Likes: {post.likes.length}</p>
      <p>Comments: {post.comments.length}</p>
    </div>
  );
};

export default PostCard;
