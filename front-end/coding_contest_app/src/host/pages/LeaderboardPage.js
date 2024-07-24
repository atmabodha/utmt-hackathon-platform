import React from "react";
import Leaderboard from "../components/leaderboard/Leaderboard";
import Header from "../components/header/Header";
const LeaderboardPage = () => {
  return (
    <>
      <Header headerType={"host"} />
      <Leaderboard />
    </>
  );
};

export default LeaderboardPage;
