import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";

function Sidebar({contestName}) {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  
  const links = [
    { label: "Basic Contest Details", to: "basic details" },
    { label: "About the Contest", to: "about" },
    { label: "Challenges", to: "challenge" },
    { label: "Prizes", to: "prizes" },
    { label: "Rules", to: "rules" },
    { label: "Analytics", to: "" },
    { label: "Delete contest", to: "" },
  ];

  const changeActiveIndex = (index) => {
    setActiveLinkIndex(index);
  }
  return (
    <div className="sidebar">
      <div>
        <h3 className="manage">Manage</h3>
      </div>
      <div>
        <h3 className="sidebar-contest-name">{contestName}Hack Hard</h3>
      </div>
      <div className="sidebar-links">
        {links.map((link, index) => (
          <Link 
            key={index} 
            className="sidebar-link"
            to={link.to}
            style={activeLinkIndex === index ? { fontWeight: "600" } : {}} 
            onClick={() => changeActiveIndex(index)}
          >
            <FaEdit size={24} style={{ paddingRight: "5px" }} /> {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
