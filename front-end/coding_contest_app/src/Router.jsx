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
import QuestionsPage from "./participant/pages/QuestionsPage.jsx";
import Login from "./host/components/login/Login.jsx";
import SignUp from "./host/components/signup/Signup.jsx";
import SelectedChallenges from "./host/components/contest creation/SelectedChallenges.jsx";
import CreateChallenge from "./host/components/contest creation/CreateChallenge.jsx";
import AddPrizes from "./host/components/contest creation/AddPrizes.jsx";
import Prizes from "./host/components/contest creation/Prizes.jsx";
import HostedContests from "./host/components/contests/HostedContests.jsx";

function ApplicationRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HostedContests />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/administration/dashboard" element={<HostDashboard />} />
        <Route path="/administration/leaderboard" element={<LeaderboardPage />} />
        <Route path="/administration/contests/create" element={<ContestCreation />} />
        <Route path="/submissions" element={<ContestDetails />} />
        <Route path="/support" element={<NotFound />} />
        <Route path="/profile" element={<NotFound />} />
        <Route path="/settings" element={<NotFound />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/administration/create/challenge" element={<CreateChallenge />} />
        <Route path="/administration/contests/edit" element={<ContestEdit />}>
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
          <Route path="challenges" element={<SelectedChallenges />} />
          <Route path="prizes" element={<Prizes />} />
          
          <Route path="create/prizes" element={<AddPrizes />} />
          
        </Route>
        <Route path="administration/create/challenge" element={<CreateChallenge />} />
        <Route path="administration/contests" element={<HostedContests />} />
      </Routes>
    </Router>
  );
}

export default ApplicationRouter;
