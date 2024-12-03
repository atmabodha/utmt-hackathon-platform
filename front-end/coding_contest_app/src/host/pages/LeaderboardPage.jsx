import React from "react";
import Leaderboard from "../components/leaderboard/Leaderboard";
import Header from "../components/header/Header";
const LeaderboardPage = ({headerType}) => {
  return (
    <>
      <Header headerType={headerType} />
      <Leaderboard />
    </>
  );
};

export default LeaderboardPage;
