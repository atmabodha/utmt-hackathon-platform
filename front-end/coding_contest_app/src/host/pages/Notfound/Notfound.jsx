// src/NotFound.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Notfound.css';

const NotFound = () => {
  const location = useLocation();

  // Check if the current URL contains the keyword 'administration'
  const redirectPath = location.pathname.includes('administration')
    ? '/administration/dashboard'
    : '/participant/dashboard';

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Currently this page is under development</h2>
      <Link to={redirectPath}>Go back to Dashboard</Link>
    </div>
  );
};

export default NotFound;

