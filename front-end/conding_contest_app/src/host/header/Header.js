import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ menuItems, profile }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  const handleLogout = () => {
    // Perform any logout logic (e.g., clearing sessions, etc.)
    // Redirect to the login page
    // Replace '/login' with your actual login page route if different
    window.location.href = '/login';
  };

  return (
    <header className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      <div className="navbar-brand">
        <Link to="/">Coding Competition</Link>
      </div>
      <nav className="navbar-menu">
        <ul className="navbar-list">
          {menuItems.map((item, index) => (
            <li key={index} className="navbar-item">
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
          <li
            className={`navbar-item profile-item ${showProfileCard ? 'active' : ''}`}
            onMouseEnter={() => setShowProfileCard(true)}
            onMouseLeave={() => setShowProfileCard(false)}
          >
            <div className="profile-container">
              <img src={profile.photo} alt="Profile" className="profile-photo" />
              <span className={`dropdown-arrow ${showProfileCard ? 'up' : ''}`}>&#9662;</span>
            </div>
            {showProfileCard && (
              <div
                className="profile-card"
                onMouseEnter={() => setShowProfileCard(true)}
                onMouseLeave={() => setShowProfileCard(false)}
              >
                <div className="profile-info">
                  <p>{profile.name}</p>
                  <p>{profile.email}</p>
                </div>
                <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
