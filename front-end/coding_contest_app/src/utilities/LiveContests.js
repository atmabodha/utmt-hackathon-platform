import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUsers, FaClock } from "react-icons/fa";
import { MonthFormattedDate, TimeDifference, TimeFromDate } from "./TimeConversion";
import "./styles/PastContest.css";

const ScheduledContest = ({data}) => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    setContests(data);
  },[data])

  console.log(contests)
  return (
    <div className="contest-cards">
      <MDBRow className="row-cols-1 row-cols-sm-2  row-cols-lg-3 row-cols-xl-4 g-4">
        {contests.map((contest, index) => (
          <MDBCol key={index}>
            <MDBCard id="past-card">
              <MDBCardImage
                src={contest.contest_image}
                alt={index}
                position="top"
                style={{ height: "150px" }}
              />

              <MDBCardBody className="card-body">
                <MDBCardTitle className="title">
                  {contest.contest_name}
                </MDBCardTitle>
                <MDBCardText className="text">
                  <p
                    style={{
                      fontWeight: 100,
                      fontSize: "0.9rem",
                      fontFamily: "serif",
                      textAlign: "center",
                    }}
                  >
                    Contest Started on{" "}
                    <MonthFormattedDate utcTime={contest.start_date_time} /> at <TimeFromDate utcTime={contest.start_date_time}/>
                  </p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex" }}>
                      <FaUsers size={20} />
                      <p style={{ paddingLeft: "3px", fontSize: "small" }}>
                        465 Registered
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <FaClock size={20} style={{paddingTop: "2px"}}/>
                      <p style={{ paddingLeft: "3px", fontSize: "small" }}>
                        Time: <TimeDifference startDate={contest.start_date_time} endDate={contest.end_date_time} />
                      </p>
                    </div>
                  </div>
                </MDBCardText>
                <div className="details">
                  <Link className="link-button">
                    Manage Contest
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
};

export default ScheduledContest;
