import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const handleClick = (e, loadPage, page) => {
  e.preventDefault();
  loadPage(page);
};

const DataPagination = ({ data, loadPage }) => {
  const currentPage = data.page_number;
  const totalPages = data.total_pages;

  if (totalPages === 1) {
    return null;
  }

  return (
    <Pagination size="md">
      {currentPage > 1 ? (
        <PaginationItem>
          <PaginationLink
            previous
            href="#"
            onClick={e => handleClick(e, loadPage, currentPage - 1)}
          />
        </PaginationItem>
      ) : null}
      {[...Array(totalPages).keys()].map(page => (
        <PaginationItem key={`page-${page}`} active={currentPage === page + 1}>
          <PaginationLink
            href="#"
            onClick={e => handleClick(e, loadPage, page + 1)}
          >
            {page + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      {currentPage < totalPages ? (
        <PaginationItem>
          <PaginationLink
            next
            href="#"
            onClick={e => handleClick(e, loadPage, currentPage + 1)}
          />
        </PaginationItem>
      ) : null}
    </Pagination>
  );
};

export default DataPagination;
