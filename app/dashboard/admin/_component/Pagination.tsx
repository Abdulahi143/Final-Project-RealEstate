import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="list-style-none mb-6 flex">
        <li>
          <a
            className={`${
              currentPage === 1
                ? 'pointer-events-none'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white'
            } relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
            href="#!"
          >
            Previous
          </a>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index}>
            <a
              className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
                currentPage === index + 1
                  ? 'font-medium'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white'
              } ${
                currentPage === index + 1
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-neutral-600'
              } transition-all duration-300`}
              href="#!"
            >
              {index + 1}
              {currentPage === index + 1 && (
                <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                  (current)
                </span>
              )}
            </a>
          </li>
        ))}
        <li>
          <a
            className={`${
              currentPage === totalPages
                ? 'pointer-events-none'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white'
            } relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
            href="#!"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
