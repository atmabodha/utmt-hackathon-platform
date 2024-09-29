import React from "react";
import Sidebar from "../components/contest creation/Sidebar";
import ContestRegistration from "../components/contest creation/ContestRegistration";
import Header from "../components/header/Header";
import "./ContestEdit.css";
import AboutContest from "../components/contest creation/AboutContest";
import Prizes from "../components/contest creation/Prizes";
import Rules from "../components/contest creation/Rules";
import Challenge from "../components/contest creation/Challenge";

function ContestEdit() {


  return (
    <div>
      <Header headerType={"host"} />
      <div className="contest-edit">
        <div className="contest-edit-sidebar">
          <Sidebar contestName=""/>
        </div>
        <div className="contest-edit-content">
          {/* <ContestRegistration pageLink={"www.codehut.com/hackHard"} pageTitle={"Coding Contest"} isRegistration={false}/> */}
          {/* <AboutContest /> */}
          {/* <Prizes/> */}
          {/* <Rules/> */}
          <Challenge />
        </div>
      </div>
    </div>
  );
}

export default ContestEdit;
