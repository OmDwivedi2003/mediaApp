import React from "react";

const UserCard = ({ user }) => {
  return (
    <div style={cardContainer}>
      {/* Profile Picture + Info */}
      <div style={topSection}>
        <img
          src={`http://localhost:4000/uploads/${user.profilePic}`}
          alt="Profile"
          style={profilePic}
        />

        <div style={infoBlock}>
          <h2 style={nameStyle}>{user.name}</h2>
          <p style={emailStyle}>{user.email}</p>
        </div>
      </div>

      {/* Extra Details */}
      <div style={detailsSection}>
        <p style={detail}><strong>Contact:</strong> {user.contact}</p>
        <p style={detail}><strong>City:</strong> {user.city}</p>
        <p style={detail}><strong>DOB:</strong> {new Date(user.dob).toLocaleDateString()}</p>
        <p style={detail}><strong>Age:</strong> {user.age}</p>
      </div>
    </div>
  );
};

export default UserCard;

// 🔧 Styles

const cardContainer = {
  width: '100%',
  background: '#f8f8f8', // ✅ Light gray background
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  fontFamily: "'Segoe UI', sans-serif",
};

const topSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  borderBottom: '1px solid #ddd',
  paddingBottom: '16px',
  marginBottom: '20px',
};

const profilePic = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '3px solid #ff85a2',
};

const infoBlock = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const nameStyle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '6px',
};

const emailStyle = {
  fontSize: '14px',
  color: '#777',
};

const detailsSection = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '12px',
};

const detail = {
  fontSize: '15px',
  color: '#444',
  lineHeight: '1.5',
};
