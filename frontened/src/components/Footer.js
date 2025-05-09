import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#fff',
      borderTop: '1px solid #ddd',
      padding: '30px 10px',
      marginTop: '50px',
      fontFamily: 'sans-serif',
      color: '#555',
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        textAlign: 'left',
        gap: '20px'
      }}>
        
        {/* About Section */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3 style={{ fontSize: '16px', color: '#262626', marginBottom: '10px' }}>About InstaClone</h3>
          <p style={{ fontSize: '14px', color: '#888' }}>
            InstaClone is a fun project inspired by Instagram, built with 💙 using React, Node.js & MongoDB. Upload pics, like, comment and feel the real vibe.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3 style={{ fontSize: '16px', color: '#262626', marginBottom: '10px' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
            <li><Link to="/" style={linkStyle}>Home</Link></li>
            <li><Link to="/user-detail" style={linkStyle}>Profile</Link></li>
            <li><Link to="/create-post" style={linkStyle}>Create Post</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3 style={{ fontSize: '16px', color: '#262626', marginBottom: '10px' }}>Contact</h3>
          <p style={textStyle}>Email: omdwivedi.dev@gmail.com</p>
          <p style={textStyle}>GitHub: github.com/omdwivedi</p>
          <p style={textStyle}>LinkedIn: linkedin.com/in/omdwivedi</p>
        </div>

      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '30px',
        fontSize: '13px',
        color: '#999'
      }}>
        © {new Date().getFullYear()} InstaClone by Om Dwivedi 🚀. All rights reserved.
      </div>
    </footer>
  );
}

const linkStyle = {
  textDecoration: 'none',
  color: '#262626',
  display: 'block',
  marginBottom: '6px'
};

const textStyle = {
  fontSize: '14px',
  color: '#777',
  marginBottom: '5px'
};

export default Footer;
