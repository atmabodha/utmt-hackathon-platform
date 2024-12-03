import React, { useState, useEffect } from "react";
import "./ContestHistory.css";
import { getData } from "../../apis/ApiRequests.js";
import PastContest from "../../../utilities/PastContest.jsx";
import ScheduledContest from "../../../utilities/ScheduledContest.jsx";
import LiveContests from "../../../utilities/LiveContests.jsx";
import { BASE_SERVER_URL, HOST_ENDPOINT } from "../../../Constants.js";
import { useUser } from "../../../context/user.jsx";

const contestType = ["live", "scheduled", "past"];

const ContestHistory = () => {
  const { current: user } = useUser();
  const [type, setType] = useState("live");
  const [pastContests, setPastContests] = useState([]);
  const [scheduledContests, setScheduledContests] = useState([]);
  const [liveContests, setLiveContests] = useState([]);

  useEffect(() => {
    const fetchContest = async () => {
      if (user) {
        const response = await getData(
          BASE_SERVER_URL + HOST_ENDPOINT + user.uid + "/contests/"
        );
        const data = response.data.data;
        if (data) {
          const past = [];
          const scheduled = [];
          const live = [];
          console.log(data)
          data.forEach((contest) => {
            if (contest.end_date_time < new Date().toISOString()) {
              past.push(contest);
            } else if (contest.start_date_time > new Date().toISOString()) {
              scheduled.push(contest);
            } else {
              live.push(contest);
            }
          });

          setPastContests(past);
          setScheduledContests(scheduled);
          setLiveContests(live);

          if (live.length > 0) setType("live");
          else if (scheduled.length > 0) setType("scheduled");
          else if (past.length > 0) setType("past");
          else setType("live");
        }
      }
    };

    fetchContest();
  }, [user]);

  const handleTypeClick = (event, selectedType) => {
    event.preventDefault();
    setType(selectedType);
  };

  return (
    <div className="contests">
      <div>
        <h1
          style={{
            textAlign: "center",
            fontWeight: 900,
            paddingTop: "150px",
            color: "var(--text-color)",
            fontFamily: "sans-serif",
          }}
        >
          Contests
        </h1>
      </div>
      <div className="contest-filter d-flex justify-content-around">
        {contestType.map((ctype, index) => (
          <div key={index}>
            <button
              to=""
              className={`contest-type ${type === ctype ? "active" : ""}`}
              onClick={(event) => handleTypeClick(event, ctype)}
            >
              {ctype}
            </button>
          </div>
        ))}
      </div>
      <div style={{ padding: "50px 0" }}>
        {type === "scheduled" ? (
          <ScheduledContest data={scheduledContests} />
        ) : type === "past" ? (
          <PastContest data={pastContests} />
        ) : (
          <LiveContests data={liveContests} />
        )}
      </div>
    </div>
  );
};

export default ContestHistory;
