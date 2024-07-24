import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HostDashboard from "./host/pages/Dashboard";
import ContestCreation from "./host/pages/ContestCreation";
import LeaderboardPage from "./host/pages/LeaderboardPage";

function ApplicationRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HostDashboard />} />
        <Route path="/host" element={<ContestCreation />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
}

export default ApplicationRouter;
