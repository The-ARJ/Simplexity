"use client";
import ProtectedRoute from "@/utils/Context/ProtectedRoute";
import { Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Product from "@/components/Product";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="mx-auto max-w-screen-2xl pt-28 pb-20 px-4 ">
      <div className=" flex justify-between gap-10 mx-auto max-w-screen-2xl pb-6 ">
        <div className="">
          <Typography variant="h4" color="orange" className=" ">
            Shop
          </Typography>
        </div>
        <div className="w-full md:w-72">
          <Input
            label="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
      <div className="">
        <Product searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default ProtectedRoute(Shop);
