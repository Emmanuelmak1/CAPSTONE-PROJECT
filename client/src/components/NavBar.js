import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure this path matches your context
import logoImage from '../images/logo1.jpeg'; // Import the logo image
import './NavBar.css'; // Import your custom styles

const NavBar = () => {
  const { currentUser, logout } = useAuth(); // Use the useAuth hook to access currentUser and logout

  // Log the current user to the console
  console.log('Current User:', currentUser);

  // Handler for the logout process
  const handleLogout = async () => {
    logout(); // Call the logout function from your AuthContext
    // Optionally, perform additional actions like redirecting the user
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <img src={logoImage} alt="Logo" width="30" height="30" />
          <span>PathwayBay</span>
        </Link>
        {currentUser ? (
          <div className="user-info-and-logout">
            <span>Welcome, {currentUser.displayName}</span>
            <span>Email: {currentUser.email}</span>
            {/* You can style this button with CSS as needed */}
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <div className="login-signup-links">
            {/* Assuming you have routes set up for these */}
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
