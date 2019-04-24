import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const handleClick = (e, loadPage, page) => {
  e.preventDefault();
  loadPage(page);
};

const calculatePages = (totalPages, currentPage) => {
  const pages = [];

  const minPage = Math.max(currentPage - 5, 1);
  if (minPage > 1) {
    pages.push(1);
    pages.push('...');
  }

  for (let i = minPage; i < currentPage; i++) {
    pages.push(i);
  }

  const maxPage = Math.min(totalPages, currentPage + 5);
  for (let i = currentPage; i <= maxPage; i++) {
    pages.push(i);
  }

  if (maxPage !== totalPages) {
    pages.push('...');
    pages.push(totalPages);
  }

  return pages;
};

const DataPagination = ({ data, loadPage }) => {
  const currentPage = data.page_number;
  const totalPages = data.total_pages;

  if (totalPages === 1) {
    return null;
  }

  const pages =
    totalPages <= 10
      ? [...Array(totalPages).keys()]
      : calculatePages(totalPages, currentPage);

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
      {pages.map(page => (
        <PaginationItem key={`page-${page}`} active={currentPage === page}>
          {page === '...' ? (
            <PaginationLink ellipsis="...">...</PaginationLink>
          ) : (
            <PaginationLink
              href="#"
              onClick={e => handleClick(e, loadPage, page)}
            >
              {page}
            </PaginationLink>
          )}
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
