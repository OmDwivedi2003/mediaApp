import React from "react";

const UserCard = ({ user }) => {
  return (
    <div style={styles.card}>
      {/* 🖼 Profile Picture */}
      <img src={`http://localhost:4000/uploads/${user.profilePic}`}  alt="Profile" style={styles.profilePic} />

      {/* 🧾 User Info */}
      <h2 style={styles.name}>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Contact:</strong> {user.contact}</p>
      <p><strong>City:</strong> {user.city}</p>
      <p><strong>DOB:</strong> {new Date(user.dob).toLocaleDateString()}</p>
      <p><strong>Age:</strong> {user.age}</p>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  profilePic: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
  },
  name: {
    marginBottom: "10px",
    fontSize: "22px",
  },
};

export default UserCard;
