import React from "react";

const SearchBarComponent = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search by name..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        padding: "10px",
        width: "100%",
        height: "30px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "20px",
      }}
    />
  );
};

export default SearchBarComponent;
