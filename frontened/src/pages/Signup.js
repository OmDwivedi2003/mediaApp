import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', dob: '', contact: '', city: '', profilePic: null });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    //  console.log("event", event);
    //  console.log('event.target :', event.target);
    //  console.log(name, value, type, files);

    if (type === 'file') {
      // setFormData((prev) => ({ ...prev, [name]: files[0] },console.log("setform data ka prev :", prev)));
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // console.log("Bhai ye hai form ka data:",formData);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); //form refresh naho
    try {
      const form = new FormData(); //form data object file bhi bhejne keliye json se hum file nhi bhej pate
      for (let key in formData) {
        form.append(key, formData[key]);
      }
      console.table("Mera form ka data :", form);
      const api_url = 'http://localhost:4000/api/auth/signup';

      const response = await axios.post(api_url, form, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Header: Bata raha hai ki ye file/image bhej raha hoon
        }
      });
      console.log("bhai ye hai signup api ka response:", response);
      setMessage('Signup successfully hogya hai ab tu 2 sec baad login page me redirect ho jayega.');

      // Reset all values
      setFormData({ name: '', email: '', password: '', dob: '', contact: '', city: '', profilePic: null });

      //redirect to login after 2 second
      setTimeout(() => {
        navigate('/login')
      }, 2000);

    } catch (error) {
      console.log("Bhai signup api endpoint me koi dikkat arhi backend se .", error)
      setMessage('Bhai Signup failed ho gya fir se try kar ho jayega.');
    }
  }

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
        <h2 style={{ textAlign: 'center', color: '#4f46e5', marginBottom: '20px' }}>Welcome to sign up page bro !</h2>
        <form onSubmit={handleSubmit}>

          <label htmlFor='name'>Name  </label>
          <input
            type='text'
            name='name'
            placeholder='bhai apna naam daal'
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '15px' }}
          />

          <label htmlFor='email'>Email  </label>
          <input
            type='email'
            name='email'
            placeholder='bhai apna email daal'
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '15px' }}
          />

          <label htmlFor='password'>Password  </label>
          <input
            type="password"
            name="password"
            placeholder="Bhai Password daal"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '15px' }}
          />

          <label htmlFor='dob'>Date of Birth  </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '15px' }}
          />

          <label htmlFor='contact'>Mobile no.  </label>
          <input
            type="text"
            name="contact"
            placeholder="bhai apna contact number daal"
            value={formData.contact}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '15px' }}
          />

          <label htmlFor='city'>Location  </label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '15px' }}
          />

          <label htmlFor='profilePic'>profilePic</label>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
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
            Signup button
          </button>

        </form>

        <p style={{ marginTop: '15px', color: '#374151', textAlign: 'center' }}>
          status: {message}
        </p>
      </div>
    </div>
  )
}

export default Signup;
