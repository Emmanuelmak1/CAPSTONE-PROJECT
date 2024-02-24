import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext'; // Ensure this path matches your project structure
import './Dashboard.css'; // Import your custom styles for Dashboard

function Dashboard() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="dashboard">
      <NavBar />
      <div className="dashboard-content">
        <h2>Welcome to the Dashboard, {currentUser.email}</h2>
        <p className="description">Creating a comforting, nest-like community for global students in the Bay Area.</p>
        <button className="contact-button">Contact Us</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
