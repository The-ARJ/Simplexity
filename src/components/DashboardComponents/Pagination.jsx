import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalProducts,
}) {
  const [active, setActive] = useState(currentPage);
  const pageSize = 4; // Number of products per page
  const totalPages = Math.ceil(totalProducts / pageSize);

  const next = () => {
    if (active === totalPages) return;

    setActive((prevActive) => prevActive + 1);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive((prevActive) => prevActive - 1);
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const renderPaginationNumbers = () => {
    const paginationNumbers = [];
    const maxPaginationNumbers = 5; // Maximum number of pagination numbers to display

    // Calculate the range of pagination numbers to display
    let startPage = Math.max(1, active - Math.floor(maxPaginationNumbers / 2));
    let endPage = Math.min(startPage + maxPaginationNumbers - 1, totalPages);

    // Adjust the startPage if the endPage is at the maximum limit
    startPage = Math.max(1, endPage - maxPaginationNumbers + 1);

    for (let i = startPage; i <= endPage; i++) {
      paginationNumbers.push(
        <IconButton
          key={i}
          onClick={() => {
            setActive(i);
            setCurrentPage(i);
          }}
          className={`rounded-xl flex justify-center items-center ${
            active === i
              ? "bg-amber-500 text-white"
              : "bg-amber-200 dark:bg-[#27272a] dark:text-gray-200 text-black"
          }`}
        >
          {i}
        </IconButton>
      );
    }

    return paginationNumbers;
  };

  useEffect(() => {
    setActive(currentPage);
  }, [currentPage]);

  return (
    <div className="flex justify-center items-center gap-4 mt-14">
      <Button
        variant="text"
        color="blue-gray"
        className="flex  dark:bg-[#27272a] dark:text-gray-200 items-center gap-2 rounded-xl"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>
      <div className="flex text-center items-center gap-2">
        {renderPaginationNumbers()}
      </div>
      <Button
        variant="text"
        color="blue-gray"
        className=" dark:bg-[#27272a] dark:text-gray-200 flex items-center gap-2 rounded-xl"
        onClick={next}
        disabled={active === totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
