import Link from "next/link";
import clsx from "clsx";
import { Button } from "@/components/MaterialComponents/Material-Tailwind"; // Replace with your actual path
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ page, total, limit, search }) => {
  const totalPages = Math.ceil(total / limit);
  let startPage = page - 1;
  let endPage = page + 1;

  // Handle edge cases
  if (startPage < 1) startPage = 1;
  if (endPage > totalPages) endPage = totalPages;

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => i + startPage
  ).filter((num) => num <= totalPages);

  return (
    <div className="flex justify-center items-center gap-4 mt-14">
      <Link
        href={{
          pathname: "/shop",
          query: {
            ...(search ? { search } : {}),
            page: page > 1 ? page - 1 : 1,
          },
        }}
        passHref
      >
        <Button
          variant="text"
          color="blue-gray"
          className={`flex items-center gap-2 rounded-md dark:bg-[#27272a] dark:text-gray-200 ${
            page <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <ArrowLeftIcon className="h-4 w-4" strokeWidth={2} />
          <span className="hidden sm:inline">Previous</span>
        </Button>
      </Link>

      {pageNumbers.map((num) => (
        <Link
          key={num}
          href={{
            pathname: "/shop",
            query: {
              ...(search ? { search } : {}),
              page: num,
            },
          }}
          className={clsx(
            "rounded-xl flex justify-center items-center w-6 h-6",
            page === num && "bg-amber-500 text-white"
          )}
          passHref
        >
          {num}
        </Link>
      ))}

      <Link
        href={{
          pathname: "/shop",
          query: {
            ...(search ? { search } : {}),
            page: page + 1 <= totalPages ? page + 1 : totalPages,
          },
        }}
        passHref
      >
        <Button
          variant="text"
          color="blue-gray"
          className={`flex items-center gap-2 rounded-md dark:bg-[#27272a] dark:text-gray-200 ${
            page >= totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
        </Button>
      </Link>
    </div>
  );
};

export default Pagination;
