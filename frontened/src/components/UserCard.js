import React from "react";

const UserCard = ({ user }) => {
  return (
    <div >
      {/*  Profile Picture */}
      <img src={`http://localhost:4000/uploads/${user.profilePic}`}  alt="Profile" width={'50px'} height={'50px'} />

      {/*  User Info */}
      <h2 >{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Contact:</strong> {user.contact}</p>
      <p><strong>City:</strong> {user.city}</p>
      <p><strong>DOB:</strong> {new Date(user.dob).toLocaleDateString()}</p>
      <p><strong>Age:</strong> {user.age}</p>
    </div>
  );
};

export default UserCard;
