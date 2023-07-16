import React from "react";
import Product from "./Product";

const TopSelling = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl py-20 px-4">
        <h1 className=" text-start lg:text-2xl font-bold ">Top Selling</h1>
        <div className=" mt-6">
          <Product />
        </div>
      </div>
    </>
  );
};

export default TopSelling;
