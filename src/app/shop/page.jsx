import { Suspense } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Typography } from "@/components/MaterialComponents/Material-Tailwind";
import Skeleton from "@/components/Product/Skeleton";
import Await from "@/components/Product/Await";
import Search from "@/components/Product/SearchBox";
import Products from "@/components/Product/Products";
import Pagination from "@/components/Product/Pagination";

const getProducts = async ({ page, limit, query }) => {
  const response = await axios.get("http://localhost:3005/products", {
    params: { page, limit, query },
  });
  const totalPages = Math.ceil(response.data.total / limit);

  return response.data;
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
      </div>

      <Suspense fallback={<Skeleton />}>
        <Await promise={promise}>
          {(result) => {
            const totalPages = Math.ceil(result.total / limit);
            const isValidPage = page <= totalPages;

            return (
              <>
                <Products products={result.data} page={page} search={search} />
                <Pagination
                  page={page}
                  total={result.total}
                  limit={limit}
                  search={search}
                  isValidPage={isValidPage} // Pass the validity information here
                />
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default Page;
