"use client";
import React, { useState } from "react";
// import Product from "./Product/Products";
import { Typography } from "@/components/MaterialComponents/Material-Tailwind";

const TopSelling = () => {
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
          {/* <Product topSelling={true} /> */}
        </div>
      </div>
    </>
  );
};

export default TopSelling;
