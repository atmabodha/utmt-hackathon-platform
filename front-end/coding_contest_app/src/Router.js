import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContestHistory from "./host/dashboard/Dashboard";
import Leaderboard from "./host/leaderboard/Leaderboard";
import ContestDetails from "./host/contest creation/ContestDetails";
import Loading from "./utilities/Loading";
import Header from "./host/header/Header";

const navItems = [
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Host", href: "#host" },
  { label: "Submissions", href: "#submissions" },
  { label: "Analytics", href: "#analytics" },
  { label: "Support", href: "#support" },
];

const profile = {
  name: "Manual Tester",
  email: "mtuser@gmail.com",
  photo: "/HeaderAssets/profile.jpg",
};

function ApplicationRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Header navItems={navItems}/>} /> */}
        <Route path="/" element={<ContestHistory />} />
        <Route path="/form" element={<ContestDetails />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default ApplicationRouter;
