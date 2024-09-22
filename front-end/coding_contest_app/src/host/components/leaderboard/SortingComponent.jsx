import React from "react";

const SortingComponent = ({ sortOrder, handleSort }) => {
  return (
    <th
      className="tableHeader"
      onClick={handleSort}
      style={{ cursor: "pointer" }}
    >
      Points {sortOrder === "asc" ? "↑" : "↓"}
    </th>
  );
};

export default SortingComponent;
