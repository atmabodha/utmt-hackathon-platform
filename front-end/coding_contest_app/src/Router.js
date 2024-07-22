import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HostDashboard from "./host/pages/Dashboard";
import ContestCreation from "./host/pages/ContestCreation";


function ApplicationRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HostDashboard/>} />
        <Route path="/host" element={<ContestCreation />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default ApplicationRouter;
