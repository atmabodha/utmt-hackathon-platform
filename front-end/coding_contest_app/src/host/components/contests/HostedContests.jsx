import React, { useEffect, useState } from "react";
import "./HostedContests.css";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import { getData } from "../../apis/ApiRequests";
import { BASE_SERVER_URL, CONTESTS, HOST_ENDPOINT } from "../../../Constants";
import { useUser } from "../../../context/user";

const HostedContests = () => {
  const [contestData, setContestData] = useState([]);
  const { current: user } = useUser();
  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchData = async () => {
      try {
        if (user) {
          const url =
            BASE_SERVER_URL + HOST_ENDPOINT + user.uid + "/" + CONTESTS;
          const response = await getData(url); // Wait for the async function to resolve
          const data = response.data;
          if (data) {
            setContestData(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  console.log("data", contestData);
  if (!contestData) {
    return;
  }
  return (
    <div className="contests-page">
      <Header headerType={"host"} />
      <div className="contests-list">
        <div className="contests-list-header">
          <h2 style={{ fontWeight: 600 }}>Administration</h2>
        </div>
        <div className="table-container">
          <div className="table-header">
            <Link
              to={"/administration/contests/create"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <button className="add-btn">Create Contest</button>
            </Link>
          </div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Contest Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Registrations</th>
                <th>Participants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contestData.map((row, index) => (
                <tr key={index}>
                  <td>{row.contest_name}</td>
                  <td>{row.start_date_time}</td>
                  <td>{row.end_date_time}</td>
                  <td>{0}</td>
                  <td>{0}</td>
                  <td>
                    <Link
                      to={`/administration/contests/${row.contest_id}/edit`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <button className="edit-btn">Edit</button>
                    </Link>
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
