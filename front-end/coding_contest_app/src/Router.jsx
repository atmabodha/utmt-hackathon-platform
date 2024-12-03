import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HostDashboard from "./host/pages/Dashboard";
import LeaderboardPage from "./host/pages/LeaderboardPage";
import NotFound from "./host/pages/Notfound/notfound";
import ContestDetails from "./utilities/ContestDetails";
import ContestEdit from "./host/pages/ContestEdit";
import AboutContest from "./host/components/contest creation/AboutContest";
import ContestCreation from "./host/pages/ContestCreation";
import ContestRegistration from "./host/components/contest creation/ContestRegistration";
import QuestionsPage from "./participant/pages/QuestionsPage";
import Login from "./host/components/login/Login";
import SignUp from "./host/components/signup/Signup";
import SelectedChallenges from "./host/components/contest creation/SelectedChallenges";
import CreateChallenge from "./host/components/contest creation/CreateChallenge";
import AddPrizes from "./host/components/contest creation/AddPrizes";
import Prizes from "./host/components/contest creation/Prizes";
import HostedContests from "./host/components/contests/HostedContests";
import ProfilePage from "./host/pages/profilePage/ProfilePage";
import LandingPage from "./common/landing/Main";
import Support from "./utilities/Support";
import ProtectedRoute from "./utilities/ProtectedRoute";

function ApplicationRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/administration/dashboard"
          element={
            <ProtectedRoute>
              <HostDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/administration/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/administration/contests/create"
          element={
            <ProtectedRoute>
              <ContestCreation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <QuestionsPage />
            </ProtectedRoute>
          }
        />
        <Route path="participant/dashboard" element={<NotFound />} />
        <Route path="/submissions" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/support" element={<Support />} />
        <Route path="/settings" element={<NotFound />} />
        <Route
          path="/administration/create/challenge"
          element={
            <ProtectedRoute>
              <CreateChallenge />
            </ProtectedRoute>
          }
        />
        <Route
          path="/administration/contests/:contestId/edit"
          element={
            <ProtectedRoute>
              <ContestEdit />
            </ProtectedRoute>
          }
        >
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
        <Route
          path="administration/contests"
          element={
            <ProtectedRoute>
              <HostedContests />
            </ProtectedRoute>
          }
        />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default ApplicationRouter;
