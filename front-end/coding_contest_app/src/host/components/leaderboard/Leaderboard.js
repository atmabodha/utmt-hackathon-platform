import React, { useState } from "react";
import profile1 from "./leaderboard assets/profile1.jpeg";
import "./Leaderboard.css";
import PaginationComponent from "./PaginationComponent";
import ReactCountryFlag from "react-world-flags";
import SortingComponent from "./SortingComponent";
import SearchBarComponent from "./SearchBarComponent";

const data = [
  { rank: 1, name: "Wade Warren", points: 1280, location: "US", img: profile1 },
  {
    rank: 2,
    name: "Kristin Watson",
    points: 1140,
    location: "GB",
    img: profile1,
  },
  {
    rank: 3,
    name: "Savannah Nguyen",
    points: 1030,
    location: "JP",
    img: profile1,
  },
  {
    rank: 4,
    name: "Courtney Henry",
    points: 960,
    location: "IN",
    img: profile1,
  },
  {
    rank: 5,
    name: "Marvin McKinney",
    points: 940,
    location: "DE",
    img: profile1,
  },
  { rank: 6, name: "Robert Fox", points: 890, location: "FR", img: profile1 },
  {
    rank: 7,
    name: "Bessie Cooper",
    points: 880,
    location: "CN",
    img: profile1,
  },
  { rank: 8, name: "Jerome Bell", points: 790, location: "AU", img: profile1 },
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
                  <td className="tableData">
                    <ReactCountryFlag countryCode={player.location} svg />
                  </td>
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
