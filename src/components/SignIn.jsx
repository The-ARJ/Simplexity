import React, { useEffect } from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";

const SignIn = () => {
  return (
    <>
      <form className="mt-12 flex flex-col gap-4">
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
          >
            Email Address
          </Typography>
          <Input type="email" label="example@gmail.com" />
        </div>

        <div className="my-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
          >
            Password
          </Typography>

          <Input label="Password" containerProps={{ className: "mt-4" }} />
        </div>
        <Typography
          variant="small"
          className="mb-2 cursor-pointer font-semibold text-gray-700 text-end"
        >
          Forgot Password
        </Typography>
        <Button size="lg" color="amber" className="text-gray-700">
          Sign In
        </Button>
        <Typography
          variant="small"
          color="gray"
          className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
        >
          <LockClosedIcon className="-mt-0.5 h-4 w-4" />
          User Information is secure and encrypted
        </Typography>
      </form>
    </>
  );
};

export default SignIn;
