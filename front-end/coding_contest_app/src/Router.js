import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContestHistory from "./host/dashboard/Dashboard";
import Leaderboard from "./host/leaderboard/Leaderboard";
import ContestDetails from "./host/contest creation/ContestDetails";

function ApplicationRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ContestHistory />} />
        {/* <Route path="/" element={<ContestDetails />} /> */}
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default ApplicationRouter;
