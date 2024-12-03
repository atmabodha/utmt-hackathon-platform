import React from "react";
import Header from "../../host/components/header/Header";
import ContestHistory from "../components/ContestHistory";

const ParticipantDashboard = () => {
  return (
    <div>
      <Header headerType={"participant"} />
      <ContestHistory />
    </div>
  );
};

export default ParticipantDashboard;
