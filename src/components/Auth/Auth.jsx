import React, { useState } from "react";
import { Typography, MenuItem } from "@material-tailwind/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import AuthDialog from "./AuthDialogue";

const SignInTypography = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Typography
        as="a"
        variant="small"
        color="blue-gray"
        className="lg:ml-auto"
        onClick={handleOpen}
      >
        <MenuItem className="flex items-center gap-2 lg:rounded-full bg-amber-500 hover:bg-amber-800 text-white hover:text-white py-2 px-4 rounded-full shadow-lg transition-colors duration-300 ease-in-out">
          <ArrowRightOnRectangleIcon className="h-[18px] w-[18px]" />
          <p className="hidden md:block">Sign In</p>
        </MenuItem>
      </Typography>
      <AuthDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default SignInTypography;
