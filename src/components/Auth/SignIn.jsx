import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Typography,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { LockClosedIcon, EyeIcon } from "@heroicons/react/24/solid";
import UserService from "../../utils/Services/UserService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserContext } from "../../utils/Context/UserContext";
import Link from "next/link";
import GoogleSignInButton from "./GoogleSignInButton";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/Redux/UserSlice";

const SignIn = (handleClose) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [remainingLockoutTime, setRemainingLockoutTime] = useState(0); // State to hold the remaining lockout time
  const [remainingAttempts, setRemainingAttempts] = useState(0); // State to hold the number of remaining login attempts
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();
  // const { fetchUser } = useContext(UserContext);

  function formatTime(durationInMs) {
    const minutes = Math.floor(durationInMs / 60000);
    const seconds = ((durationInMs % 60000) / 1000).toFixed(0);
    return `${minutes} minutes and ${seconds} seconds`;
  }

  // Function to reset the state values
  const resetState = () => {
    setRemainingLockoutTime(0);
    setRemainingAttempts(0);
    setValidationMessage("");
  };

  // useEffect hook to check and reset state when remainingLockoutTime reaches 0
  useEffect(() => {
    let intervalId;
    if (remainingLockoutTime > 0) {
      intervalId = setInterval(() => {
        setRemainingLockoutTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else {
      // Call the resetState function when remainingLockoutTime reaches 0
      resetState();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [remainingLockoutTime]);

  const handleForgotPassword = () => {
    router.push("/dashboard");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.login({ email, password });
      const user = response.data;
      console.log("this is user data from login", user);
      dispatch(setUser(user)); // Dispatch the setUser action with user data
      toast.success("Signed In Successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      router.push("/dashboard");
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data) {
        setValidationMessage(error.response.data.error);
        if (error.response.data.remainingLockoutTime) {
          setRemainingLockoutTime(error.response.data.remainingLockoutTime);
        } else {
          setRemainingLockoutTime(0);
        }
        if (error.response.data.remainingAttempts !== undefined) {
          setRemainingAttempts(error.response.data.remainingAttempts);
        } else {
          setRemainingAttempts(0);
        }
      } else {
        setValidationMessage("An error occurred. Please try again.");
      }
    }
  };
  return (
    <>
      <form onSubmit={handleLogin} className="mt-12 flex flex-col gap-4">
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
            onChange={(e) => setEmail(e.target.value)}
            label="example@gmail.com"
          />
        </div>

        <div className="my-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
          >
            Password
          </Typography>
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="pr-20"
              onChange={(e) => setPassword(e.target.value)}
              containerProps={{
                className: "min-w-0",
              }}
            />

            <IconButton
              size="sm"
              disabled={!password}
              className="!absolute rounded-full  bg-transparent shadow-none hover:shadow-none right-1 top-1"
              onClick={() =>
                setShowPassword((prevShowPassword) => !prevShowPassword)
              }
            >
              <EyeIcon
                className={`h-4 ${
                  password ? "text-amber-600" : "text-gray-600"
                }`}
              />
            </IconButton>
          </div>
        </div>
        <Link href="/forgot-password">
          <Typography
            onClick={handleClose}
            variant="small"
            className="mb-2 cursor-pointer font-semibold text-gray-700 text-end"
          >
            Forgot Password
          </Typography>
        </Link>
        {remainingLockoutTime > 0 && (
          <Typography color="deep-orange" className="font-medium text-xs">
            Too many failed login attempts. Please try again after{" "}
            {formatTime(remainingLockoutTime)}.{" "}
            {remainingAttempts > 0 &&
              `Remaining attempts: ${remainingAttempts}`}
          </Typography>
        )}
        {validationMessage && remainingLockoutTime <= 0 && (
          <Typography color="deep-orange" className="font-medium text-xs">
            {validationMessage}
            {remainingAttempts > 0 &&
              `, Remaining login attempts: ${remainingAttempts}`}
          </Typography>
        )}
        <Button type="submit" size="lg" color="amber" className="text-gray-700">
          Sign In
        </Button>
        {/* <GoogleSignInButton /> */}
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
