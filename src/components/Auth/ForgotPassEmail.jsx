import React, { useState } from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import axios from "axios";
const ForgotPassEmail = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3005/users/forgot-password", {
        email: email,
      });
      toast.success("Validation Code Sent to Email", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
export default ForgotPassEmail;
