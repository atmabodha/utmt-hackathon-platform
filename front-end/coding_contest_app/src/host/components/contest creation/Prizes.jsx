import React, { useState } from "react";
import "./prizes.css";
import { Link } from "react-router-dom";

const Prizes = ({ contestUrl }) => {
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
    <div className="prizes-list">
      <div className="prizes-list-header">
        <h2 style={{ fontWeight: 600 }}>Prizes</h2>
        <Link
          to=""
          style={{ textDecoration: "none", color: "var(--text-color)" }}
        >
          {contestUrl}www.codehut.com/hackHard
        </Link>
      </div>
      <div className="table-container">
        <div className="table-header">
          <button className="add-btn">Add Prizes</button>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Others</th>
              <th>Actions</th>
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
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prizes;
