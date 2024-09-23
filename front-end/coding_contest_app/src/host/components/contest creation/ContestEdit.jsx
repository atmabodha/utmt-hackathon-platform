import React from "react";
import Sidebar from "../../../utilities/Sidebar";
import ContestRegistration from "./ContestRegistration";
import { useState } from "react";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import "./ContestEdit.css";

function ContestEdit() {
  return (
    <div>
      <Header headerType={"host"} />
      <div className="contest-edit">
        <div className="contest-edit-sidebar">
          <Sidebar contestName=""/>
        </div>
        <div className="contest-edit-content">
          <ContestRegistration pageLink={"www.codehut.com/hackHard"} pageTitle={"Coding Contest"}/>
        </div>
      </div>
      <div className="contest-edit-footer">
        <div className="contest-edit-left-buttons">
          <Link className="contest-edit-footer-button" to="">
            Preview Contest
          </Link>
          <button className="contest-edit-footer-button">
            Choose From Repository
          </button>
        </div>
        <button className="contest-edit-footer-button">Save Changes</button>
      </div>
    </div>
  );
}

export default ContestEdit;
