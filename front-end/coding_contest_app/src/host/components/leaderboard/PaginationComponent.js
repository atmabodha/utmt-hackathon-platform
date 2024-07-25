import React from "react";
import { Pagination, Select, MenuItem } from "@mui/material";

const PaginationComponent = ({
  pageCount,
  currentPage,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  return (
    <div className="pagination-container">
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={onPageChange}
        siblingCount={1}
        boundaryCount={1}
        shape="rounded"
        variant="outlined"
        color="primary"
        className="pagination"
      />
      <div className="items-per-page">
        <span>
          <strong>Items per page:</strong>
        </span>
        <Select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className="MuiSelect-root"
          variant="outlined"
          color="primary"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default PaginationComponent;
