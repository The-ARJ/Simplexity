"use client"
import React, { useState } from "react";
import Product from "./Product";
import { Typography } from "@material-tailwind/react";

const TopSelling = () => {
  const [searchQuery, setSearchQuery] = useState(""); // New state variable for search

  return (
    <>
      <div className="mx-auto max-w-screen-2xl py-20 px-4">
        <Typography
          color="orange"
          variant='h4'
          className=" text-start  font-bold "
        >
          Top Selling
        </Typography>
        <div className=" mt-6">
        <Product searchQuery={searchQuery} topSelling={true} />
        </div>
      </div>
    </>
  );
};

export default TopSelling;
