import React from "react";

const Pagination = ({
  currentPage = 0,
  responseCount = 0,
  handlePagination,
  handleCount,
  total = 5,
}) => {
  return (
    <div className="pagination-main">
      <span
        className="btn"
        onClick={() => currentPage !== 0 && handlePagination(currentPage - 1)}
      >
        Left
      </span>
      <span className={currentPage === 0 ? "btn-select" : "btn"}>1</span>
      <span className={currentPage === 1 ? "btn-select" : "btn"}>2</span>
      <span className={currentPage === 2 ? "btn-select" : "btn"}>3</span>
      <span
        className={
          currentPage > 2 && currentPage < total ? "btn-select" : "btn"
        }
      >
        ...
      </span>
      <span className={currentPage === total ? "btn-select" : "btn"}>
        {total}
      </span>
      <span
        className="btn"
        onClick={() => handlePagination(currentPage < total && currentPage + 1)}
      >
        Right
      </span>
      <input
        maxLength={2}
        max={50}
        min={5}
        minLength={1}
        type={"number"}
        onChange={(e) => handleCount(Number(e.target.value))}
        value={responseCount}
        placeholder="Page"
      />
    </div>
  );
};

export default Pagination;
