import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContestHistory from './host/dashboard/Dashboard';
import Header from './host/header/Header';

/* Header elements for different pages */
const menuItems = [
  { label: 'Leaderboard', path: '/leaderboard' },
];

const profile = {
  name: 'Manual Tester',
  email: 'mtuser@gmail.com',
  photo: '/HeaderAssets/profile.jpg'
};

function ApplicationRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header menuItems={menuItems} profile={profile} />} />
        {/* <Route path="/" element={<ContestHistory />} /> */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default ApplicationRouter;
