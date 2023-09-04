import React, { Suspense } from "react";
import { Typography } from "@/components/MaterialComponents/Material-Tailwind";
import Skeleton from "./Product/Skeleton";
import Await from "./Product/Await";
import Products from "./Product/Products";

const TopSelling = ({ promise }) => {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl py-20 px-4">
        <Typography
          color="orange"
          variant="h4"
          className=" text-start  font-bold "
        >
          Top Selling
        </Typography>
        <div className=" mt-6">
          <Suspense fallback={<Skeleton />}>
            <Await promise={promise}>
              {(result) => {
                const sortedProducts = result.data.sort(
                  (a, b) => b.boughtBy.length - a.boughtBy.length
                );
                return (
                  <>
                    <Products
                      products={sortedProducts}
                      page={promise.page}
                      search={promise.search}
                    />
                  </>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default TopSelling;
