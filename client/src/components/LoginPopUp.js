import React, { useState } from 'react';
import { MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './LoginPopUp.css';

function LoginPopUp({ onClose, onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData.email, formData.password); // Call the onLogin function with email and password
    onClose(); // Close the popup after submitting
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <span className="close" onClick={onClose}>&times;</span> {/* Close button */}
        <form onSubmit={handleSubmit}>
          <MDBInput
            wrapperClass='mb-4'
            label='Email address'
            id='email'
            name='email'
            type='email'
            size='lg'
            onChange={handleChange}
            required
          />
          <MDBInput
            wrapperClass='mb-4'
            label='Password'
            id='password'
            name='password'
            type='password'
            size='lg'
            onChange={handleChange}
            required
          />
          <MDBCheckbox
            name='remember'
            id='remember'
            className='mb-4'
            label='Remember password'
          />
          <MDBBtn
            type='submit'
            size='lg'
            style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
          >
            Login
          </MDBBtn>
          {/* Additional login options */}
          <hr className="my-4" />
          <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
            <MDBIcon fab icon="google" className="mx-2" />
            Sign in with Google
          </MDBBtn>
          <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
            <MDBIcon fab icon="facebook-f" className="mx-2" />
            Sign in with Facebook
          </MDBBtn>
        </form>
      </div>
    </div>
  );
}

export default LoginPopUp;
