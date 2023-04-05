import React from 'react';

export default function Pagination({
  goToFirstPage,
  goToLastPage,
  goToNextPage,
  goToPrevPage,
  totalPages,
  currentPage,
}) {
  return (
    <ul className="pagination">
      <li className="pages-list" onClick={goToFirstPage}>
        ⋘
      </li>
      <li className="pages-list" onClick={goToPrevPage}>
        ≪
      </li>
      <li className="current-page">
        Page {currentPage} of {totalPages}
      </li>
      <li className="pages-list" onClick={goToNextPage}>
        ≫
      </li>
      <li className="pages-list" onClick={goToLastPage}>
        ⋙
      </li>
    </ul>
  );
}
