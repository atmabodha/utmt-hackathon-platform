import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HostDashboard from "./host/pages/Dashboard";
import LeaderboardPage from "./host/pages/LeaderboardPage";
import NotFound from "./host/pages/Notfound/notfound";
import ContestDetails from "./utilities/ContestDetails";
import ContestEdit from "./host/pages/ContestEdit.jsx";
import AboutContest from "./host/components/contest creation/AboutContest";
import ContestEditFooter from "./host/components/contest creation/ContestEditFooter";
import ContestCreation from "./host/pages/ContestCreation.jsx";
import ContestRegistration from "./host/components/contest creation/ContestRegistration.jsx";
import Challenge from "./host/components/contest creation/Challenge.jsx";
import Prizes from "./host/components/contest creation/Prizes.jsx";
import QuestionsPage from "./participant/pages/QuestionsPage.jsx";

function ApplicationRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HostDashboard />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/host" element={<ContestCreation/>} />
        <Route path="/submissions" element={<ContestDetails />} />
        <Route path="/support" element={<NotFound />} />
        <Route path="/profile" element={<NotFound />} />
        <Route path="/settings" element={<NotFound />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/logout" element={<NotFound />} />
        <Route path="/analytics/" element={<ContestEdit />}>
          <Route index element={<ContestRegistration pageTitle={"Edit Basic Registration Details"} isRegistration={false}/>} />
          <Route path="basic details" element={<ContestRegistration pageTitle={"Edit Basic Registration Details"} isRegistration={false}/>} />
          <Route path="about" element={<AboutContest />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="prizes" element={<Prizes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default ApplicationRouter;
