// UserPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserCard from '../components/UserCard';


function User() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const { token } = useAuth(); // context ka use kiya
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
       // const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
     //   console.log(res.data.user);
        setUser(res.data.user);
       // console.log(user);
      } catch (err) {
        setError('Failed to fetch user info.');
      }
    };
    fetchUser();
  }, []);

  
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone!");
  if (!confirmDelete) return;  // agar user cancel kare to delete mat kar.

    try {

      await axios.delete('http://localhost:4000/api/user/delete-profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('User deleted successfully!');
      setTimeout(() => {  
      navigate('/login');  // after delete, redirect to login
      }, 2000);
      
    } catch (err) {
      alert('Failed to delete user.');
    }
  };


  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading user profile...</p>;
  }

  return (
    <div>
    <h2>User Profile</h2>
   <UserCard user={user} />
   {error && <p>{error}</p>}

   <div>
        <Link to="/edit-profile">
          <button>Edit Profile</button>
        </Link>
        <button onClick={handleDelete}>Delete Account</button>
      </div>
     </div>
  );
}

export default User;


