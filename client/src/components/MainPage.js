import React, { useState } from 'react';
import logoImage from '../images/logo1.jpeg';
import LoginPopUp from './LoginPopUp'; // Import the LoginPopUp component
import SignupPopUp from './SignupPopUp'; // Import the SignupPopUp component
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; // Assuming you'll use CSS for styling

function MainPage() {
  const navigate = useNavigate();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSignupClick = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleLoginClick = () => {
    window.location.href = 'http://localhost:3000/login';
  };

  const handleLogin = async (email, password) => {
    try {
      // Make a POST request to your backend server to authenticate the user
      const response = await fetch('/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // If the response is successful (status code 200-299), redirect to the dashboard
      if (response.ok) {
        navigate('/dashboard');
      } else {
        // Handle authentication error, maybe display an error message
        console.error('Authentication failed');
      }
    } catch (error) {
      // Handle any network or server error
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="main-page">
      {/* Top bar */}
      <div className="top-bar">
        <img src={logoImage} alt="Logo" className="logo" />
        <span className="title">PathwayBay</span>
        <button onClick={handleLoginClick} className="login-button">Login</button>
        <button onClick={handleSignupClick} className="signup-button">Sign Up</button>
      </div>

      {/* Middle-bottom content */}
      <div className="middle-bottom">
        <p>New to the bay?</p>
        <button onClick={handleSignupClick} className="manage-button">Manage</button>
      </div>

      {/* Sign-up Modal */}
      {showSignupModal && (
        <SignupPopUp onClose={() => setShowSignupModal(false)} />
      )}

      {/* Login Pop-up */}
      {showLoginModal && (
        <LoginPopUp onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default MainPage;
