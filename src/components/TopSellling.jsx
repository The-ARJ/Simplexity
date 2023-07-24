import React from "react";
import Product from "./Product";
import { Typography } from "@material-tailwind/react";

const TopSelling = () => {
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
          {/* <Product /> */}
        </div>
      </div>
    </>
  );
};

export default TopSelling;
