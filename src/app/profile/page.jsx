"use client";
import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function UpdateProfileForm() {
  return (
    <div className="mt-28 mb-10 flex justify-center gap-4">
      <Card color="transparent" className="px-10 py-4">
        <Typography variant="h4" color="blue-gray">
          Update Profile
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to update your profile.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="First Name" />
            <Input size="lg" label="Last Name" />
            <Input size="lg" label="Phone Number" />
            <Input type="file" label="Image" />
          </div>

          <Button className="mt-6" color="amber" fullWidth>
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
}
