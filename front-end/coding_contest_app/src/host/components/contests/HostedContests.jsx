import React, { useEffect, useState } from "react";
import "./HostedContests.css";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import { getData, deleteData } from "../../apis/ApiRequests";
import { BASE_SERVER_URL, CONTESTS, HOST_ENDPOINT } from "../../../Constants";
import { useUser } from "../../../context/user";
import { showConfirmationAlert } from "../../../utilities/AlertComponents";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../../../utilities/AlertComponents";

const HostedContests = () => {
  const [contestData, setContestData] = useState([]);
  const { current: user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const url =
            BASE_SERVER_URL + HOST_ENDPOINT + user.uid + "/" + CONTESTS;
          const response = await getData(url, 
          //   {
          //     Authorization: `Bearer ${user?.accessToken || ""}`
          // }
        );
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

  const handleDelete = async (contest_id) => {
    const confirmed = await showConfirmationAlert({
      title: "Are you sure?",
      text: "This contest will be permanently deleted!",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (confirmed) {
      try {
        const url = `${BASE_SERVER_URL}${HOST_ENDPOINT}api/contests/${contest_id}/delete/`;
        await deleteData(url, 
        //   {
        //   headers: {
        //     Authorization: `Bearer ${user?.accessToken || ""}`,
        //   },
        // }
      );

        // Remove deleted contest from the state
        setContestData(
          contestData.filter((contest) => contest.contest_id !== contest_id)
        );

        // Show success toast
        showSuccessToast("Contest deleted successfully!");
      } catch (error) {
        console.error("Error deleting contest:", error);

        // Show error toast
        showErrorToast("Failed to delete the contest.");
      }
    } else {
      showInfoToast("Contest deletion was canceled.");
    }
  };

  if (!contestData) {
    return <p>Loading...</p>;
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
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(row.contest_id)}
                    >
                      Delete
                    </button>
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
