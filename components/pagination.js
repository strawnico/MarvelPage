/* eslint-disable react/jsx-key */
import React from "react";
import { useRouter } from "next/router";

const MAX_ITEMS = 7;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({ limit, total, offset, setOffset }) => {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const firstPage = Math.max(current - MAX_LEFT, 1);
  const router = useRouter();

  return (
      <ul className="pagination flex list-none justify-center pb-12">
        {Array.from({ length: Math.min(MAX_ITEMS, pages) })
          .map((_, index) => index + firstPage)
          .map((page) =>
            total - page * limit + limit <= 0 ? (
              ""
            ) : (
              <li key={page}>
                <button
                  onClick={() => setOffset((page - 1) * limit)}
                  className={` "hover:bg-[#955E73] text-white" ${
                    page === current && router.pathname == "/characters"
                      ? " bg-[#955E73] text-white border-none w-6 rounded-sm font-bold"
                      : null
                  }
                ${
                  page === current && router.pathname == "/comics"
                    ? " bg-[#5E9595] text-white border-none w-6 rounded-sm font-bold"
                    : null
                }
                ${
                  page === current && router.pathname == "/series"
                    ? " bg-[#64A94C] text-white border-none w-6 rounded-sm font-bold"
                    : null
                }
                `}
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
