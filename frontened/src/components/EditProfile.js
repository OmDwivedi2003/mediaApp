import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function EditProfile() {
  const [user, setUser] = useState({ name: '', email: '' ,contact:'',dob:'', city:'',profilePic: null });
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
        console.table(res.data.user);
        setUser({ name: res.data.user.name, email: res.data.user.email ,city: res.data.user.city, contact:res.data.user.contact,dob: res.data.user.dob ? res.data.user.dob.slice(0, 10) : '' ,age:res.data.user.age});
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
    <div>
      <h2>Edit Profile</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
      
          <label>Name:</label>
          <input  type="text"  name="name"  value={user.name} onChange={handleChange} required  />
    <br></br>
          <label>Email:</label>
          <input  type="email" name="email"  value={user.email}  onChange={handleChange} required  disabled // Email update allowed nahi bola tha tu ne!
          />
       <br></br>
       <label>City:</label>
          <input  type="text"  name="city"  value={user.city} onChange={handleChange} required  />
          <br></br>
          <label>DOB:</label>
          <input  type="date"  name="dob"  value={user.dob} onChange={handleChange} required  />
          <br></br>
          <label>Age:</label>
          <input  type="number"  name="age"  value={user.age} required disabled  />
          <br></br>
          <label>contact:</label>
          <input  type="text"  name="contact"  value={user.contact} onChange={handleChange} required  />
          <br></br>
          <label>profilePic:</label>
          <input type="file" name="profilePic" onChange={(e) => setUser({ ...user, profilePic: e.target.files[0] })} />
          <br></br>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProfile;
