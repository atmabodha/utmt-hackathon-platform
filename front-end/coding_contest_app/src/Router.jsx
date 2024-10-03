import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HostDashboard from "./host/pages/Dashboard";
import LeaderboardPage from "./host/pages/LeaderboardPage";
import NotFound from "./host/pages/Notfound/notfound";
import ContestDetails from "./utilities/ContestDetails";
import ContestEdit from "./host/pages/ContestEdit.jsx";
import AboutContest from "./host/components/contest creation/AboutContest";
import ContestCreation from "./host/pages/ContestCreation.jsx";
import ContestRegistration from "./host/components/contest creation/ContestRegistration.jsx";
import Challenge from "./host/components/contest creation/Challenge.jsx";
import Prizes from "./host/components/contest creation/Prizes.jsx";
import QuestionsPage from "./participant/pages/QuestionsPage.jsx";
<<<<<<< HEAD
import Login from "./host/components/login/Login.jsx";
=======
import Signup from "./host/components/signup/Signup.jsx";
>>>>>>> dcaaf5ff22f3a3127cd9ac9ebf49ac6b8d8f84ce

function ApplicationRouter() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
=======
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
>>>>>>> dcaaf5ff22f3a3127cd9ac9ebf49ac6b8d8f84ce
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/host" element={<ContestCreation />} />
        <Route path="/submissions" element={<ContestDetails />} />
        <Route path="/support" element={<NotFound />} />
        <Route path="/profile" element={<NotFound />} />
        <Route path="/settings" element={<NotFound />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/logout" element={<NotFound />} />
        <Route path="/analytics/" element={<ContestEdit />}>
          <Route
            index
            element={
              <ContestRegistration
                pageTitle={"Edit Basic Registration Details"}
                isRegistration={false}
              />
            }
          />
          <Route
            path="basic details"
            element={
              <ContestRegistration
                pageTitle={"Edit Basic Registration Details"}
                isRegistration={false}
              />
            }
          />
          <Route path="about" element={<AboutContest />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="prizes" element={<Prizes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default ApplicationRouter;
