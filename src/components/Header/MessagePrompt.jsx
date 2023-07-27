import React, { useContext } from "react";
import { UserContext } from "../../utils/Context/UserContext";
import Link from "next/link";
import { Chip, Typography } from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
export default function MessagePrompt() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, passwordExpired } = useContext(UserContext);

  // Check if the user object exists and user is not verified
  const isUserNotVerified = user && !user.isVerified;
  const handleSendVerifyCode = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3005/users/forgot-password", {
        email: user.email,
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
      router.push("/verify-account");
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
        toast.error("Failed to send reset password email", {
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

  if (isUserNotVerified && pathname !== "/verify-account") {
    return (
      <>
        <Typography className=" text-lg font-medium">
          Please verify your account,
          <span
            onClick={handleSendVerifyCode}
            className=" cursor-pointer text-green-500"
          >
            {" "}
            Click Here
          </span>
        </Typography>
      </>
    );
  }
  if (
    !isUserNotVerified &&
    passwordExpired &&
    pathname !== "/profile/update-password"
  ) {
    return (
      <>
        <Link href="/profile/update-password">
          <Typography className=" text-lg font-medium">
            Your password has expired,
            <span className=" cursor-pointer text-green-500"> Click Here</span>
          </Typography>
        </Link>
      </>
    );
  }
}
