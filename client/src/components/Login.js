// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPopUp from './LoginPopUp';

function Login() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSuccess = () => {
    console.log('Login successful!');
    navigate('/dashboard'); // Redirect to dashboard after successful login
  };

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      handleLoginSuccess();
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, display message, etc.
    }
  };

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  return (
    <>
      <button onClick={handleLoginClick}>Login</button>
      {showLoginPopup && <LoginPopUp onClose={() => setShowLoginPopup(false)} onLogin={handleLogin} />}
    </>
  );
}

export default Login;
