import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utilities/ProtectedRoute.jsx";
import HostDashboard from "./host/pages/Dashboard";
import LeaderboardPage from "./host/pages/LeaderboardPage";
import NotFound from "./host/pages/Notfound/Notfound.jsx";
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
import LandingPage from "./common/landing/Main.jsx";
import Support from "./utilities/Support.jsx";
import ParticipantDashboard from "./participant/pages/Dashboard.jsx";
import ContestDetails from "./utilities/ContestDetails.jsx";
import ProfilePageComponent from "./host/components/profile/ProfilePageComponent.jsx";

function ApplicationRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="participant/analytics" element={<NotFound />} />
        <Route
          path="/participant/leaderboard"
          element={<LeaderboardPage headerType={"participant"} />}
        />

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
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePageComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/administration/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardPage headerType={"host"} />
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
          path="/contests/:contestId/details"
          element={
            <ProtectedRoute>
              <ContestDetails />
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
        <Route
          path="participant/dashboard"
          element={
            <ProtectedRoute>
              <ParticipantDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="participant/submissions" element={<NotFound />} />
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
          <Route path="prizes/create" element={<AddPrizes />} />
          <Route path="analytics" element={<NotFound />} />
          <Route path="prizes/:prizeId/edit" element={<AddPrizes />} />
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
