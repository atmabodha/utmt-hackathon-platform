import React from "react";
import "./AboutContest.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import ContestEditFooter from "./ContestEditFooter";

function AboutContest({ contestUrl }) {
  const inputFieds = ["About", "Eligibility", "Other"];
  return (
    <div>
      <div className="about-contest">
        <div className="about-contest-header">
          <h2 style={{ fontWeight: 600 }}>About the Contest</h2>
          <Link
            to=""
            style={{ textDecoration: "none", color: "var(--text-color)" }}
          >
            {contestUrl}www.codehut.com/hackHard
          </Link>
        </div>
        <div className="about-form">
          <Form>
            {inputFieds.map((field, index) => (
              <Form.Group
                key={index}
                controlId="ControlTextarea1"
                className="about-input-field"
              >
                <Form.Label className="text-area-label">{field}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  className="text-area-control"
                />
              </Form.Group>
            ))}
          </Form>
        </div>
      </div>
      <ContestEditFooter />
    </div>
  );
}

export default AboutContest;
