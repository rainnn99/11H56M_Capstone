import React, { useState, useEffect } from 'react';

function Pagination({ page, perPage, totalPosts, onPageChange }) {
    const totalPages = Math.ceil(totalPosts / perPage);
    const pages = [...Array(totalPages).keys()].map((num) => num + 1);
  
    return (
      <div className="pagination">
        {page > 1 && (
          <button onClick={() => onPageChange(page - 1)}>이전</button>
        )}
        {pages.map((pageNum) => (
          <button
            key={pageNum}
            className={page === pageNum ? "active" : ""}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        {page < totalPages && (
          <button onClick={() => onPageChange(page + 1)}>다음</button>
        )}
      </div>
    );
  }

export default Pagination;
  