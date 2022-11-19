/* eslint-disable react/jsx-key */
import React from "react";

const MAX_ITEMS = 5;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({ limit, total, offset, setOffset }) => {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const firstPage = Math.max(current - MAX_LEFT, 1);

  return (
    <ul className="pagination">
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + firstPage)
        .map((page) =>
          total - (page * limit) + limit <= 0 ? (
            ""
          ) : (
            <li key={page}>
              <button
                onClick={() => setOffset((page - 1) * limit)}
                className={page === current ? "pagination__item--active" : null}
              >
                {page}
              </button>
            </li>
          )
        )}
    </ul>
  );
};

export default Pagination;
