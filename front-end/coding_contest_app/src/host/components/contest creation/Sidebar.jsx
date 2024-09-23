import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

function Sidebar({contestName}) {
  const [activeLinkIndex, setActiveLinkIndex] = useState(null);
  
  const links = [
    { label: "Basic Contest Details", to: "" },
    { label: "About the Contest", to: "" },
    { label: "Challenges", to: "" },
    { label: "Prizes", to: "" },
    { label: "Rules", to: "" },
    { label: "Analytics", to: "" },
    { label: "Delete contest", to: "" },
  ];

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
            onClick={() => setActiveLinkIndex(index)}
          >
            <FaEdit size={24} style={{ paddingRight: "5px" }} /> {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
