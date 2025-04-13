import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { token } = useAuth();

  const navStyle = { fontSize: '24px', cursor: 'pointer' };
  const navlinkStyle = { margin: '12px', textDecoration: 'none' };

  return (
    <nav style={navStyle}>
      {!token ? (
        <>
          <Link to="/signup" style={navlinkStyle}>Signup</Link>
          <Link to="/login" style={navlinkStyle}>Login</Link>
        </>
      ) : (
        <>
          <Link to="/" style={navlinkStyle}>Home</Link>
          <Link to="/user-detail" style={navlinkStyle}>Profile</Link>
          <Link to="/post" style={navlinkStyle}>Post</Link>
          <Link to="/logout" style={navlinkStyle}>Logout</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
