import React from "react";
import "./Leaderboard.css";
import profile1 from "./Leaderboard Assets/profile1.jpeg"; // Ensure the image path is correct

const data = [
  {
    rank: 1,
    name: "Wade Warren",
    points: 1280,
    prize: "$5000",
    img: profile1,
  },
  {
    rank: 2,
    name: "Kristin Watson",
    points: 1140,
    prize: "$2500",
    img: profile1,
  },
  {
    rank: 3,
    name: "Savannah Nguyen",
    points: 1030,
    prize: "$1000",
    img: profile1,
  },
  {
    rank: 4,
    name: "Courtney Henry",
    points: 960,
    prize: "$0",
    img: profile1,
  },
  {
    rank: 5,
    name: "Marvin McKinney",
    points: 940,
    prize: "$0",
    img: profile1,
  },
  {
    rank: 6,
    name: "Robert Fox",
    points: 890,
    prize: "$0",
    img: profile1,
  },
  {
    rank: 7,
    name: "Bessie Cooper",
    points: 880,
    prize: "$0",
    img: profile1,
  },
  {
    rank: 8,
    name: "Jerome Bell",
    points: 790,
    prize: "$0",
    img: profile1,
  },
  // Add more entries as needed
];

const Leaderboard = () => {
  return (
    <div className="container-md leaderboard-container">
      <div className="row">
        <div className="col-12">
          <h1 className="leaderboard-title">LEADERBOARD</h1>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Player</th>
                  <th scope="col">Points</th>
                  <th scope="col">Prize</th>
                </tr>
              </thead>
              <tbody>
                {data.map((player, index) => (
                  <tr key={index}>
                    <td>{player.rank}</td>
                    <td className="d-flex align-items-center">
                      <img
                        src={player.img}
                        alt={player.name}
                        className="player-img"
                      />
                      {player.name}
                    </td>
                    <td>{player.points}</td>
                    <td>{player.prize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
