import React, { useState } from "react";
import "./HostedContests.css";
import { Link } from "react-router-dom";
import Header from "../header/Header";

const HostedContests = () => {
  const [data, setData] = useState([
    {
      id: 1,
      position: "Manager",
      description: "Oversees operations",
      amount: "$4000",
      others: "Full-time",
    },
    {
      id: 2,
      position: "Developer",
      description: "Builds software",
      amount: "$3000",
      others: "Remote",
    },
    {
      id: 3,
      position: "Designer",
      description: "Designs UI/UX",
      amount: "$3500",
      others: "Freelance",
    },
  ]);

  return (
    <div className="contests-page">
      <Header headerType={"host"} />
    <div className="contests-list">
      <div className="contests-list-header">
        <h2 style={{ fontWeight: 600 }}>Administration</h2>
      </div>
      <div className="table-container">
        <div className="table-header">
          <button className="add-btn">
            <Link to={"/administration/contests/create"} style={{ textDecoration: "none", color: "white" }}>
              Create Contest
            </Link>
          </button>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Contest Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Registrations</th>
              <th>Participants</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.position}</td>
                <td>{row.description}</td>
                <td>{row.amount}</td>
                <td>{row.others}</td>
                <td>
                  <button className="edit-btn">
                    <Link
                      to={"/administration/contests/edit"}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Edit
                    </Link>
                  </button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default HostedContests;
