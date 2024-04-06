import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from '../images/logo1.jpeg';
import './NavBar.css';
import { useTranslation } from 'react-i18next'; // Ensure this is correctly imported
import i18n from './i18n'; 

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const { t } = useTranslation(); // Corrected: Removed duplicate i18n variable

  const handleLogout = async () => {
    logout();
  };

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <img src={logoImage} alt="Logo" width="30" height="30" />
          <span>PathwayBay</span>
        </Link>
        <div className="language-selector">
          <select onChange={handleLanguageChange} defaultValue={i18n.language}>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="zh">中文</option>
            <option value="es">Español</option>
            <option value="ar">العربية</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
        {currentUser ? (
          <div className="user-info-and-logout">
            <span>{t('welcome')},</span>
            <span>{currentUser.email}</span>
            <button onClick={handleLogout} className="logout-button">{t('logout')}</button>
          </div>
        ) : (
          <div className="login-signup-links">
            <Link to="/login">{t('login')}</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
