import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/contest creation/Sidebar";
import Header from "../components/header/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ContestEdit.css";
import { HOST_ENDPOINT, BASE_SERVER_URL, CONTESTS } from "../../Constants";
import { getData } from "../apis/ApiRequests";

function ContestEdit() {
  const [contestName, setContestName] = useState("");
  const { contestId } = useParams();
  const url =
    BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + `edit/${contestId}/details/`;
  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await getData(url); // Fetch data for the specific contestId
        const contestDetails = response.data.data;

        // Update formData with the fetched data
        if (contestDetails) {
          setContestName(contestDetails.contest_name);
        }
      } catch (error) {
        console.error("Error fetching contest details:", error);
      }
    };

    fetchContestData();
  }, [url]);
  return (
    <div>
      <Header headerType={"host"} />
      <div className="contest-edit">
        <div className="contest-edit-sidebar">
          <Sidebar contestName={contestName} />
        </div>
        <div className="contest-edit-content">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default ContestEdit;
