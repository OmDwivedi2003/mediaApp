import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { token } = useAuth();

  // Navbar Container Styling with Light Pink Gradient
  const navContainer = {
    background: "linear-gradient(to right, #ff7a8b, #ffafcc)", // Light Pink Gradient
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #dbdbdb",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 999,
  };

  // Logo Styling
  const logoStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff", // White for logo text to pop on pink background
    textDecoration: "none",
    letterSpacing: "1px",
    fontFamily: "'Roboto', sans-serif",
  };

  // Links Container Styling
  const linksContainer = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  // Link Styling
  const linkStyle = {
    textDecoration: "none",
    color: "#333", // White color for links to stand out on pink background
    fontSize: "16px",
    fontWeight: 600,
    padding: "8px 15px",
    borderRadius: "8px",
    transition: "background-color 0.3s ease, color 0.3s ease",
    fontFamily: "'Roboto', sans-serif",
  };

  // Hover Effects for Links
  const hoverStyle = {
    backgroundColor: "#fff", // White background on hover
    color: "#ff7a8b", // Pink color on hover
  };

  // Mouse Hover Events
  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, hoverStyle);
  };

  const handleMouseLeave = (e) => {
    Object.assign(e.target.style, linkStyle);
  };

  return (
    <nav style={navContainer}>
      <Link to="/" style={logoStyle}>MY InstaApp</Link>

      <div style={linksContainer}>
        {!token ? (
          <>
            <Link
              to="/signup"
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Signup
            </Link>
            <Link
              to="/login"
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Home
            </Link>
            <Link
              to="/user-detail"
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Profile
            </Link>
            <Link
              to="/post"
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Post
            </Link>
            <Link
              to="/logout"
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
