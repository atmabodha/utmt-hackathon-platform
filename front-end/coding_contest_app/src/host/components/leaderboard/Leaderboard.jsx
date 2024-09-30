import React, { useState } from "react";
import profile1 from "./leaderboard assets/profile1.jpeg";
import "./Leaderboard.css";
import PaginationComponent from "./PaginationComponent";
import SortingComponent from "./SortingComponent";
import SearchBarComponent from "./SearchBarComponent";

const data = [
  {
    rank: 1,
    name: "Pankaj Yadav",
    points: 1280,
    location: "Lucknow",
    img: profile1,
  },
  {
    rank: 2,
    name: "Shyam",
    points: 1140,
    location: "Gorakhpur",
    img: profile1,
  },
  {
    rank: 3,
    name: "Shravan",
    points: 1000,
    location: "Jodhpur",
    img: profile1,
  },
  {
    rank: 4,
    name: "Ashutosh",
    points: 960,
    location: "Rajsamand",
    img: profile1,
  },
  { rank: 5, name: "Shivam", points: 940, location: "Patna", img: profile1 },
  { rank: 6, name: "Ranjan", points: 890, location: "Buxer", img: profile1 },
  { rank: 7, name: "Ram", points: 880, location: "Delhi", img: profile1 },
  { rank: 8, name: "Suraj", points: 790, location: "Bengalore", img: profile1 },
];

const Leaderboard = ({ itemsPerPage = 5 }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedData, setSortedData] = useState([...data]);

  const filteredData = sortedData.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const endOffset = itemOffset + itemsPerPageState;
  const currentItems = filteredData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredData.length / itemsPerPageState);

  const handlePageChange = (event, page) => {
    const newOffset = (page - 1) * itemsPerPageState;
    setItemOffset(newOffset);
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPageState(Number(event.target.value));
    setItemOffset(0);
    setCurrentPage(1);
  };

  const handleSortByPoints = () => {
    const direction = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(direction);

    const sorted = [...data].sort((a, b) => {
      return direction === "asc" ? a.points - b.points : b.points - a.points;
    });
    setSortedData(sorted);
  };

  return (
    <>
      <div className="leaderboard">
        <h1 className="title mb-5">LEADERBOARD</h1>
        <div className="search-bar-container mt-5">
          <SearchBarComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="table-responsive">
          <table className="tableName mt-2">
            <thead>
              <tr className="tableRow">
                <th className="tableHeader">Rank</th>
                <th className="tableHeader">Player</th>
                <SortingComponent
                  sortOrder={sortOrder}
                  handleSort={handleSortByPoints}
                />
                <th className="tableHeader">Location</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((player, index) => (
                <tr className="tableRow" key={index}>
                  <td className="tableData">{player.rank}</td>
                  <td className="tableData" id="player-info">
                    <img src={player.img} alt={player.name} id="player-img" />
                    {player.name}
                  </td>
                  <td className="tableData">{player.points}</td>
                  <td className="tableData">{player.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PaginationComponent
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPageState}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default Leaderboard;
