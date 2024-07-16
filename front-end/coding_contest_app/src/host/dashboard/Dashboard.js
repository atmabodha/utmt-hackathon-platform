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
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import FetchContestDetails from "../apis/Contests";
import { useState, useEffect } from "react";

const ContestHistory = () => {
  const [contests, setContests] = useState([]);

  useEffect(()=> {
    const fetchContest = async () => {
      const response = await FetchContestDetails();
      console.log(response);
      setContests(response);
    }
    fetchContest();
  }, [])


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
                <MDBCardImage src="https://drive.google.com/thumbnail?id=16kx_ksw3_7r5Z0o2HBO4BazmEHhOASgS" alt={index} position="top" />
                
                <MDBCardBody>
                  <MDBCardTitle className="title">{contest.contest_name}</MDBCardTitle>
                  <MDBCardText className="text">
                    <div className="flex-container">
                      <span className="left-text">Started On:</span>
                      <span className="right-text">{contest.start_date_time}</span>
                    </div>
                    <div className="flex-container">
                      <span className="left-text">Ends On:</span>
                      <span className="right-text">{contest.end_date_time}</span>
                    </div>
                    <div className="flex-container">
                      <span className="left-text">Participant Limit:</span>
                      <span className="right-text">
                        {contest.participant_limit}
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
