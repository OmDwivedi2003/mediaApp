import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // 👈 context method
    navigate('/login');
  }, [logout, navigate]);

  return <h3>Logging out...</h3>;
}

export default Logout;
