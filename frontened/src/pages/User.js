// UserPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserCard from '../components/UserCard';


function User() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const { token } = useAuth(); // context ka use kiya
  useEffect(() => {
    const fetchUser = async () => {
      try {
       // const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data.user);
        setUser(res.data.user);
        console.log(user);
      } catch (err) {
        setError('Failed to fetch user info.');
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading user profile...</p>;
  }

  return (
    <div>
    <h2>User Profile</h2>
   <UserCard user={user} />
   {error && <p>{error}</p>}
     </div>
  );
}

export default User;
