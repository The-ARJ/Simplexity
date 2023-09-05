import React, { useState } from "react";
import {
  Button,
  Typography,
  Input,
} from "@/components/MaterialComponents/Material-Tailwind";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import axios from "axios";
import UserService from "../../../utils/Services/UserService";
import showToast from "@/components/Cart/Toast";

const EmailVerification = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      await UserService.VerifyEmail({ email: email });
      showToast("Email Sent Successfully", "success");
      onNext(email);
    } catch (err) {
      if (err.response && err.response.data) {
        setValidationMessage(err.response.data);
      } else {
        setValidationMessage("Failed to send reset password email");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleResetPassword}
        className="mx-auto max-w-screen-sm  mt-12 md:mt-32 flex flex-col gap-4"
      >
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
          >
            Email Address
          </Typography>
          <Input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="example@gemail.com"
          />
        </div>
        <Typography color="deep-orange" className="font-medium text-xs">
          {validationMessage}
        </Typography>
        <Button type="submit" size="lg" color="amber" className="text-gray-700">
          Submit
        </Button>

        <Typography
          variant="small"
          color="gray"
          className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
        >
          <LockClosedIcon className="-mt-0.5 h-4 w-4" />
          Please provide valid email address to get the code
        </Typography>
      </form>
    </>
  );
};
export default EmailVerification;
