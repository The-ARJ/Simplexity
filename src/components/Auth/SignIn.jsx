import React, { useEffect, useState, useContext } from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import UserService from "../../utils/Services/UserService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserContext } from "../../utils/Context/UserContext";
import ProtectedRoute from "@/utils/Context/ProtectedRoute";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const router = useRouter();
  const { fetchUser } = useContext(UserContext);
  const handleLogin = (e) => {
    e.preventDefault();
    UserService.login({ email, password })
      .then((res) => {
        window.localStorage.setItem(`token`, res.data.token);
        fetchUser()
          .then(() => {
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
            router.push("/home");
          })
          .catch((err) => {
            setValidationMessage(err);
          });
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          setValidationMessage(err.response.data.error);
        } else {
          setValidationMessage("An error occurred. Please try again.");
        }
      });
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

          <Input
            label="Password"
            name="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            containerProps={{ className: "mt-4" }}
          />
        </div>
        <Typography
          variant="small"
          className="mb-2 cursor-pointer font-semibold text-gray-700 text-end"
        >
          Forgot Password
        </Typography>
        <Typography color="deep-orange" className="font-medium text-xs">
          {validationMessage}
        </Typography>
        <Button type="submit" size="lg" color="amber" className="text-gray-700">
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
