import React, { useState } from 'react';
import logoImage from '../images/logo1.jpeg';
import LoginPopUp from './LoginPopUp'; // Import the LoginPopUp component
import SignupPopUp from './SignupPopUp'; // Import the SignupPopUp component
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; // Assuming you'll use CSS for styling

function MainPage() {
  // eslint-disable-next-line
  const navigate = useNavigate();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <div className="main-page">
      <div className="top-bar">
        <img src={logoImage} alt="Logo" className="logo" />
        <span className="title">PathwayBay</span>
        <button onClick={handleLoginClick} className="login-button">Login</button>
        <button onClick={handleSignupClick} className="signup-button">Sign Up</button>
      </div>
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
        <LoginPopUp onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}

export default MainPage;
