import clsx from "clsx";
import Link from "next/link";
import { Suspense } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Typography } from "@/components/MaterialComponents/Material-Tailwind";
import Skeleton from "@/components/Product/Skeleton";
import Await from "@/components/Product/Await";
import Search from "@/components/Product/SearchBox";
import Products from "@/components/Product/Products";

const getProducts = async ({ page, limit, query }) => {
  const response = await axios.get("http://localhost:3005/products", {
    params: { page, limit, query },
  });
  return response.data.data;
};

const Page = async ({ searchParams }) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const promise = getProducts({ page, limit, query: search });

  return (
    <div key={uuid()} className="mx-auto max-w-screen-2xl pt-28 pb-20 px-4 ">
      <div className=" flex justify-between gap-10 mx-auto max-w-screen-2xl pb-6 ">
        <div className="">
          <Typography variant="h4" color="orange" className=" ">
            Shop
          </Typography>
        </div>

        <div className="w-full md:w-72">
          <Search search={search} />
        </div>
        <div className="flex space-x-6">
          <Link
            href={{
              pathname: "/shop",
              query: {
                ...(search ? { search } : {}),
                page: page > 1 ? page - 1 : 1,
              },
            }}
            className={clsx(
              "rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800",
              page <= 1 && "pointer-events-none opacity-50"
            )}
          >
            Previous
          </Link>
          <Link
            href={{
              pathname: "/shop",
              query: {
                ...(search ? { search } : {}),
                page: page + 1,
              },
            }}
            className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
          >
            Next
          </Link>
        </div>
      </div>

      <Suspense fallback={<Skeleton />}>
        <Await promise={promise}>
          {(products) => <Products products={products} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default Page;
