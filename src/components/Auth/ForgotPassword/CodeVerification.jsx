import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Input,
} from "@/components/MaterialComponents/Material-Tailwind";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import showToast from "@/components/Cart/Toast";
import UserService from "../../../utils/Services/UserService";

const CodeVerification = ({ email, onNext }) => {
  const [verificationCode, setverificationCode] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  console.log(email);
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

  const handleResendCode = () => {
    setResendDisabled(true);
    setResendTimer(30);
    showToast("Code Resent Successfully", "success");
  };

  const handleVerifyCode = async (event) => {
    event.preventDefault();
    try {
      const response = await UserService.VerifyCode({
        email: email,
        verificationCode: verificationCode,
      });
      if (response.data.message === "Code is correct") {
        setverificationCode("Validation");
        onNext(email, verificationCode);
        showToast("Code Verified Successfully", "success");
      } else {
        setValidationMessage("Invalid verification code");
      }
    } catch (error) {
      console.log(error);
      setValidationMessage("Invalid verification code2");
      if (
        error.response &&
        error.response.data !== "Invalid verification code"
      ) {
        setValidationMessage("Failed to verify code");
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
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
          >
            Enter Validation Code
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
          Confirm Validation
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

export default CodeVerification;
