import React, { useState, useEffect, useMemo } from 'react';
import Pagination, { PAGE_SIZE } from './Pagination';

const ListPaginated = ({ list, renderItem, resetPage = null, customPageSize = PAGE_SIZE }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (resetPage) {
      setCurrentPage(1);
    }
  }, [resetPage]);

  // Given a list, we take care of making a pagination according to the number of items (PAGE_SIZE)
  const listPaginated = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;

    return list.slice(firstPageIndex, lastPageIndex);
  }, [list, currentPage]);

  return (
    <>
      {listPaginated.map((item, index) => renderItem(item, index))}

      <Pagination
        pageSize={customPageSize}
        currentPage={currentPage}
        totalCount={list.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default ListPaginated;
