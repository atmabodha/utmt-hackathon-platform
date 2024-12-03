import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClock } from "react-icons/fa";
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
                  Contest Started on{" "}
                  <MonthFormattedDate utcTime={contest.start_date_time} /> at{" "}
                  <TimeFromDate utcTime={contest.start_date_time} />
                </p>
                <div className="d-flex justify-content-between">
                  <div className="d-flex ">
                    <FaUsers size={20} />
                    <p className="ms-1" style={{ fontSize: "smaller" }}>
                      465 Reg'd
                    </p>
                  </div>
                  <div className="d-flex ">
                    <FaClock size={20} />
                    <p className="ms-1" style={{ fontSize: "smaller" }}>
                      Time:{" "}
                      <TimeDifference
                        startDate={contest.start_date_time}
                        endDate={contest.end_date_time}
                      />
                    </p>
                  </div>
                </div>
                <div className="details mt-2">
                  <Link
                    className="btn"
                    id="link-button"
                    to={`/contests/${contest.contest_id}/details`}
                    target="_blank"
                  >
                    Contest Details
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
