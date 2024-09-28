import React from "react";
import Sidebar from "./Sidebar";
import ContestRegistration from "./ContestRegistration";
import Header from "../header/Header";
import "./ContestEdit.css";
import AboutContest from "./AboutContest";

function ContestEdit() {


  return (
    <div>
      <Header headerType={"host"} />
      <div className="contest-edit">
        <div className="contest-edit-sidebar">
          <Sidebar contestName=""/>
        </div>
        <div className="contest-edit-content">
          <ContestRegistration pageLink={"www.codehut.com/hackHard"} pageTitle={"Coding Contest"} isRegistration={false}/>
          {/* <AboutContest /> */}
        </div>
      </div>
    </div>
  );
}

export default ContestEdit;
