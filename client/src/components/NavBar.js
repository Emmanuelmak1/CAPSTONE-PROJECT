import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../images/logo1.jpeg'; // Import the logo image
import './NavBar.css'; // Import your custom styles

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <img src={logoImage} alt="Logo" width="30" height="30" />
          <span>PathwayBay</span>
        </Link>
        <ul className="nav-list">
          <li><Link to="/housing">Housing</Link></li>
          <li><Link to="/transportation">Transportation</Link></li>
          <li><Link to="/dining">Dining</Link></li>
          <li><Link to="/activities">Cultural Activities</Link></li>
          <li><Link to="/recreational-facilities">Recreational Facilities</Link></li>
          <li><Link to="/personal-assistant">Personal Assistant</Link></li>
          <li><Link to="/social-integration">Social Integration</Link></li>
          <li><Link to="/account-settings">Account and Settings</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
