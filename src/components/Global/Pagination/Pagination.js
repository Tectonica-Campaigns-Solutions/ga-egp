import React from 'react';
import { usePagination, DOTS } from './hooks/usePagination';

import './index.scss';

export const PAGE_SIZE = 12;

const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={'pagination-container'}>
      {/* Left navigation arrow */}
      <li className={`${currentPage === 1 ? '' : 'pagination-item'}`} onClick={onPrevious}>
        <div className="arrow left" />
      </li>

      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <li
            className={`pagination-item ${pageNumber === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      {/*  Right Navigation arrow */}
      <li className={`${currentPage === lastPage ? '' : 'pagination-item'}`} onClick={onNext}>
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
