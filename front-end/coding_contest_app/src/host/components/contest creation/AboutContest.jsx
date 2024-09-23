import React from "react";
import "./AboutContest.css";
import { Link } from "react-router-dom";
import { TextArea } from "../../../utilities/FormComponents";


function AboutContest({ contestUrl }) {
  const inputFieds = ["About", "Eligibility", "Other"]
  return (
    <div className="about-contest">
      <div className="about-contest-header">
        <h2 style={{ fontWeight: 600 }}>About the Contest</h2>
        <Link to="" style={{ textDecoration: "none" }}>
          {contestUrl}www.codehut.com/hackHard
        </Link>
      </div>
      <div className="about-form">
        {inputFieds.map((field, index) => (
        <TextArea key={index} textAreaName={field} />
        ))}
      </div>
    </div>
  );
}

export default AboutContest;
