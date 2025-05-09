import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function EditProfile() {
  const [user, setUser] = useState({ name: '', email: '', contact: '', dob: '', city: '', profilePic: null });
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
        setUser({
          name: res.data.user.name,
          email: res.data.user.email,
          city: res.data.user.city,
          contact: res.data.user.contact,
          dob: res.data.user.dob ? res.data.user.dob.slice(0, 10) : '',
          age: res.data.user.age
        });
      } catch (err) {
        setError('Failed to fetch user data.');
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in user) {
        formData.append(key, user[key]);
      }

      await axios.put('http://localhost:4000/api/user/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Profile updated successfully!');
      navigate('/user-detail');
    } catch (err) {
      alert('Failed to update profile.');
    }
  };

  return (
    <div style={container}>
      <h2 style={heading}>Edit Profile</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleSubmit} style={form}>
        <div style={formGroup}>
          <label>Name:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} required />
        </div>

        <div style={formGroup}>
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required disabled />
        </div>

        <div style={formGroup}>
          <label>City:</label>
          <input type="text" name="city" value={user.city} onChange={handleChange} required />
        </div>

        <div style={formGroup}>
          <label>DOB:</label>
          <input type="date" name="dob" value={user.dob} onChange={handleChange} required />
        </div>

        <div style={formGroup}>
          <label>Age:</label>
          <input type="number" name="age" value={user.age} required disabled />
        </div>

        <div style={formGroup}>
          <label>Contact:</label>
          <input type="text" name="contact" value={user.contact} onChange={handleChange} required />
        </div>

        <div style={formGroup}>
          <label>Profile Picture:</label>
          <input type="file" name="profilePic" onChange={(e) => setUser({ ...user, profilePic: e.target.files[0] })} />
        </div>

        <button type="submit" style={submitButton}>Update</button>
      </form>
    </div>
  );
}

export default EditProfile;

// 🔧 Styles
const container = {
  maxWidth: '600px',
  margin: '40px auto',
  padding: '25px',
  backgroundColor: '#f8f8f8',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  fontFamily: "'Segoe UI', sans-serif",
};

const heading = {
  fontSize: '26px',
  textAlign: 'center',
  color: '#333',
  marginBottom: '30px'
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const formGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
};

const submitButton = {
  padding: '12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '500',
  cursor: 'pointer',
  marginTop: '10px'
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
  marginBottom: '10px'
};
