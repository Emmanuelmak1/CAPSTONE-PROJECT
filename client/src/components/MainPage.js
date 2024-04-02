import React, { useState } from 'react';
import logoImage from '../images/logo1.jpeg';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; // Assuming you'll use CSS for styling

function MainPage() {
  const navigate = useNavigate();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    window.location.href = 'http://localhost:3000/login';
  };


  return (
    <div className="main-page">
      {/* Top bar */}
      <div className="top-bar">
        <img src={logoImage} alt="Logo" className="logo" />
        <span className="title">PathwayBay</span>
        <button onClick={handleLoginClick} className="login-button">Login</button>
            </div>
    </div>
  );
}

export default MainPage;
