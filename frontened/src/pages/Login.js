import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 use context

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const api_url = 'http://localhost:4000/api/auth/login';
      const response = await axios.post(api_url, formData, {
        withCredentials: true, // 👈 important for cookie handling
      });

      console.log('login ka response :', response);
      const token = response?.data?.token;
      if (!token) throw new Error("Token missing from response");

      // localStorage.setItem('token', token);
      login(token); // maine direct local storage me token rakhne ki jagah ek context bnaya auth aur store kiya
      setMessage('Login successful redirect to home page in 2 sec..');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.log('Login Error:', error);
      setMessage(error.response?.data?.message || 'Login failed, firse try kr backend me error hai');
      // setMessage('Login failed, firse try kr backend me error hai');
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '30px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#4f46e5', marginBottom: '20px' }}>Welcome to the login page bro !</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email </label>
          <input
            type='email'
            name='email'
            placeholder='bhai apna register email daal'
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '15px' }}
          />

          <label htmlFor='password'>Password </label>
          <input
            type='password'
            name='password'
            placeholder='bhai password daal'
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '20px' }}
          />

          <button
            type='submit'
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4f46e5',
              color: 'white',
              borderRadius: '10px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Login button
          </button>
        </form>

        <p style={{ marginTop: '15px', color: '#374151', textAlign: 'center' }}>
          Status: {message}
        </p>
      </div>
    </div>
  )
}

export default Login;
