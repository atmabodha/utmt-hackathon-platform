import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HostDashboard from "./host/pages/Dashboard";
import ContestCreation from "./host/pages/ContestCreation";
import LeaderboardPage from "./host/pages/LeaderboardPage";
import NotFound from "./host/pages/Notfound/notfound";
import ContestDetails from "./utilities/ContestDetails";
import ContestEdit from "./host/components/contest creation/ContestEdit";
import AboutContest from "./host/components/contest creation/AboutContest";
import ContestEditFooter from "./host/components/contest creation/ContestEditFooter";

function ApplicationRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContestEdit />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/host" element={<ContestCreation />} />
        <Route path="/submissions" element={<ContestDetails />} />
        <Route path="/analytics" element={<ContestEdit />} />
        <Route path="/support" element={<NotFound />} />
        <Route path="/profile" element={<NotFound />} />
        <Route path="/settings" element={<NotFound />} />
        <Route path="/logout" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default ApplicationRouter;
