import React, { useEffect, useState } from "react";
import "./prizes.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HOST_ENDPOINT, BASE_SERVER_URL, CONTESTS } from "../../../Constants";
import { getData } from "../../apis/ApiRequests";
import { useNavigate } from "react-router-dom";

const Prizes = ({ contestUrl }) => {
  const {contestId} = useParams();
  const navigate = useNavigate()
  const [prizes, setPrizes] = useState([
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

  useEffect(() => {
    const fetchPrizes = async ()=>{
      const url = BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + contestId + "/edit/prizes/";
      const response = await getData(url);
      const data = response.data.data;
      if (data){
        setPrizes(data);
        console.log("prizes", data)
      }
    }

    fetchPrizes();
  }, [contestId])

  const handleAddPrize = () => {
        navigate(`/administration/contests/${contestId}/edit/create/prizes`); // Change '/current-page' to the route you want to go back to
  }
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
          <button className="add-btn" onClick={handleAddPrize}>Add Prizes</button>
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
            {prizes.map((prize, index) => (
              <tr key={index}>
                <td>{prize.prize_position}</td>
                <td>{prize.prize_description}</td>
                <td>{prize.prize_amount}</td>
                <td>{prize.others}</td>
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
