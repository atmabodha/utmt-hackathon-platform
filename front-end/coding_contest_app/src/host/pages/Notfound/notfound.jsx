// src/NotFound.js
import React from 'react';
import {Link} from 'react-router-dom';
import './notfound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/administration/dashboard">Go to Home</Link>
    </div>
  );
};

export default NotFound;
