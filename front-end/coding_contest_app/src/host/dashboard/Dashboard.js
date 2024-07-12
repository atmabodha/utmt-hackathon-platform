import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardLink,
} from "mdb-react-ui-kit";
import image from "./image.jpg";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";

const ContestHistory = () => {
  const contests = [
    {
      name: "Contest 1",
      image: image,
      startTime: "23-08-2024 at 9:30 AM",
      endTime: "23-08-2024 at 11:30 AM",
      participantLimit: 100,
      details: "url",
    },
    {
      name: "Contest 1",
      image: image,
      startTime: "23-08-2024 at 9:30 AM",
      endTime: "23-08-2024 at 11:30 AM",
      participantLimit: 100,
      details: "url",
    },
    {
      name: "Contest 1",
      image: image,
      startTime: "23-08-2024 at 9:30 AM",
      endTime: "23-08-2024 at 11:30 AM",
      participantLimit: 100,
      details: "url",
    },
    {
      name: "Contest 1",
      image: image,
      startTime: "23-08-2024 at 9:30 AM",
      endTime: "23-08-2024 at 11:30 AM",
      participantLimit: 100,
      details: "url",
    },
    {
      name: "Contest 1",
      image: image,
      startTime: "23-08-2024 at 9:30 AM",
      endTime: "23-08-2024 at 11:30 AM",
      participantLimit: 100,
      details: "url",
    },
  ];

  return (
    <div>
      <div>
        <h1 style={{textAlign: "center", fontWeight: 700, paddingTop: "100px"}}>Contests</h1>
      </div>
      <div className="contest-filter d-flex justify-content-around">
        <div><NavLink activeClassName="active" to="" className="contest-type">Live</NavLink></div>
        <div><NavLink activeClassName="active" to="" className="contest-type" >Scheduled</NavLink></div>
        <div><NavLink activeClassName="active" to="" className="contest-type" >Past</NavLink></div>
      </div>
      <div className="contest-cards">
        <MDBRow className="row-cols-1 row-cols-sm-2  row-cols-lg-3 row-cols-xl-4 g-4">
          {contests.map((contest, index) => (
            <MDBCol key={index}>
              <MDBCard>
                <MDBCardImage src={contest.image} alt={index} position="top" />
                <MDBCardBody>
                  <MDBCardTitle className="title">{contest.name}</MDBCardTitle>
                  <MDBCardText className="text">
                    <div className="flex-container">
                      <span className="left-text">Started On:</span>
                      <span className="right-text">{contest.startTime}</span>
                    </div>
                    <div className="flex-container">
                      <span className="left-text">Ends On:</span>
                      <span className="right-text">{contest.endTime}</span>
                    </div>
                    <div className="flex-container">
                      <span className="left-text">Participant Limit:</span>
                      <span className="right-text">
                        {contest.participantLimit}
                      </span>
                    </div>
                  </MDBCardText>
                  <div className="details">
                    <MDBBtn>Join the contest</MDBBtn>
                    <MDBCardLink href={contest.details}>Details</MDBCardLink>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </div>
    </div>
  );
};

export default ContestHistory;
