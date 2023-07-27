"use client";
import React, { useState, useEffect, useContext } from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "@/utils/Context/UserContext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/utils/Context/ProtectedRoute";

const CodeVerification = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [verificationCode, setverificationCode] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  useEffect(() => {
    let countdownTimer;
    if (resendDisabled) {
      countdownTimer = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(countdownTimer);
    };
  }, [resendDisabled]);

  const handleResendCode = async (event) => {
    event.preventDefault();
    setResendDisabled(true);
    setResendTimer(30);
    try {
      await axios.post("http://localhost:3005/users/forgot-password", {
        email: user.email,
      });
      toast.success("Validation code resent successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Failed to resend validation code", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  const handleVerifyCode = async (event) => {
    console.log(user.email);

    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3005/users/verify-code",
        {
          email: user.email,
          verificationCode: verificationCode,
        }
      );

      console.log("Received verification code:", verificationCode);

      if (response.data.message === "Code is correct") {
        setverificationCode("Validation");
        toast.success("Account Verified Successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/");
      } else {
        setValidationMessage("Unable to verify account");
      }
    } catch (error) {
      console.log(error);
      setValidationMessage("Unable to verify account");
      if (
        error.response &&
        error.response.data !== "Invalid verification code"
      ) {
        setValidationMessage("Failed to verify code");
        setValidationMessage(error.response.data);
      } else {
        setValidationMessage("Can not verify code at this moment");
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleVerifyCode}
        className="mx-auto max-w-screen-sm  mt-12 md:mt-32 flex flex-col gap-4"
      >
        <Typography variant="h5">Account Verification</Typography>
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
          >
            Enter Validation Code Sent to Your Email
          </Typography>
          <Input
            type="text"
            name="code"
            required
            value={verificationCode}
            onChange={(e) => setverificationCode(e.target.value)}
            label="Six Digit Validation Code"
          />
        </div>
        <Typography color="deep-orange" className="font-medium text-xs">
          {validationMessage}
        </Typography>
        <Button type="submit" size="lg" color="amber" className="text-gray-700">
          Confirm Code
        </Button>

        <Typography
          variant="small"
          color="gray"
          className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
        >
          <LockClosedIcon className="-mt-0.5 h-4 w-4" />
          {resendDisabled ? (
            `Resend code in ${resendTimer} seconds`
          ) : (
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendDisabled}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              Resend code
            </button>
          )}
        </Typography>
      </form>
    </>
  );
};

export default ProtectedRoute(CodeVerification);
