import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserCard from '../components/UserCard';

function User() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data.user);
      } catch (err) {
        setError('Failed to fetch user info.');
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone!");
    if (!confirmDelete) return;

    try {
      await axios.delete('http://localhost:4000/api/user/delete-profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('User deleted successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      alert('Failed to delete user.');
    }
  };

  if (!user) {
    return <p style={loadingStyle}>Loading user profile...</p>;
  }

  return (
    <div style={pageContainer}>
      <h2 style={heading}>User Profile</h2>

      <UserCard user={user} />

      {error && <p style={errorStyle}>{error}</p>}

      <div style={buttonContainer}>
        <Link to="/edit-profile">
          <button style={editButton}>Edit Profile</button>
        </Link>
        <button onClick={handleDelete} style={deleteButton}>Delete Account</button>
      </div>
    </div>
  );
}

export default User;

// 🔧 Styles

const pageContainer = {
  maxWidth: '700px',
  margin: '40px auto',
  padding: '20px',
  background: '#f4f4f4',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  fontFamily: "'Segoe UI', sans-serif"
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
  marginBottom: '30px',
};

const loadingStyle = {
  textAlign: "center",
  marginTop: "60px",
  fontSize: "18px",
  color: "#777"
};

const buttonContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '30px'
};

const editButton = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '500',
  transition: '0.3s',
};

const deleteButton = {
  backgroundColor: '#e53935',
  color: 'white',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '500',
  transition: '0.3s',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
  marginTop: '20px',
  fontSize: '14px',
};
