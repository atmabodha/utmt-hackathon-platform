import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClock, FaUserFriends } from "react-icons/fa";
import {
  MonthFormattedDate,
  TimeDifference,
  TimeFromDate,
} from "./TimeConversion";
import "./styles/Contest.css";

const LiveContests = ({ data }) => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    setContests(data);
  }, [data]);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-4 g-4">
        {contests.map((contest, index) => (
          <div className="col" key={index}>
            <div className="card" id="contest-card">
              <img
                src={contest.contest_banner_image}
                alt={index}
                className="card-img-top"
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{contest.contest_name}</h5>
                <p className="card-text">
                  Contest ended on{" "}
                  <MonthFormattedDate utcTime={contest.end_date_time} />
                </p>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FaUsers size={20} />
                    <p className="ms-2" style={{ fontSize: "smaller" }}>
                      465 R'g
                    </p>
                  </div>
                  <div className="d-flex">
                    <FaUserFriends size={20} />
                    <p className="ms-1" style={{ fontSize: "smaller" }}>
                      259 Participated
                    </p>
                  </div>
                </div>
                <div className="details mt-2">
                  <Link className="btn" id="link-button">
                    Contest Analytics
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveContests;
