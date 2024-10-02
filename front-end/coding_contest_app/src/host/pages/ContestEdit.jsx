import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/contest creation/Sidebar";
import Header from "../components/header/Header";
import "./ContestEdit.css";

function ContestEdit() {
  return (
    <div>
      <Header headerType={"host"} />
      <div className="contest-edit">
        <div className="contest-edit-sidebar">
          <Sidebar contestName="" />
        </div>
        <div className="contest-edit-content">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default ContestEdit;
