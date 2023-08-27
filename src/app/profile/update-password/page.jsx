"use client";
import {
  Button,
  Typography,
  Input,
  Breadcrumbs,
} from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/utils/Context/UserContext";
import UserService, { imgURL } from "../../../utils/Services/UserService";
import ProtectedRoute from "@/utils/Context/ProtectedRoute";
import { useSelector } from "react-redux";

const UpdatePassword = () => {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
  });
  const [validationMessage, setValidationMessage] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const handleOldPasswordChange = (event) => {
    const newOldPassword = event.target.value;
    setOldPassword(newOldPassword);
  };
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword === "") {
      setPasswordValidations({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialCharacter: false,
      });
    } else {
      const validations = {
        length: newPassword.length >= 8,
        uppercase: /[A-Z]/.test(newPassword),
        lowercase: /[a-z]/.test(newPassword),
        number: /[0-9]/.test(newPassword),
        specialCharacter: /[!@#$%^&*]/.test(newPassword),
      };

      setPasswordValidations(validations);
    }

    if (confirmPassword !== "" && newPassword !== confirmPassword) {
      setValidationMessage("Password does not match");
    } else {
      setValidationMessage("");
    }
  };
  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocus(false);
  };
  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setValidationMessage("Passwords do not match");
    } else {
      setValidationMessage("");
    }
  };
  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    try {
      await UserService.updatePassword(user._id, oldPassword, password);
      toast.success("Password Update Successful!", {
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
      logout();
    } catch (error) {
      console.error("Failed to update password:", error);
      setValidationMessage("Failed to update password");
    }
  };

  const isSubmitDisabled =
    !(
      passwordValidations.length &&
      passwordValidations.uppercase &&
      passwordValidations.lowercase &&
      passwordValidations.number &&
      passwordValidations.specialCharacter
    ) ||
    password !== confirmPassword ||
    oldPassword === "" ||
    validationMessage !== "";

  return (
    <div className="py-8 px-4 mx-auto max-w-screen-2xl mt-20 ">
      <Breadcrumbs fullWidth>
        <Link href="/" className="opacity-60">
          Home
        </Link>
        <Link href="/profile" className="">
          Profile
        </Link>
        <Link href="/profile/update-password" className="">
          Update Password
        </Link>
      </Breadcrumbs>
      <form
        onSubmit={handleUpdatePassword}
        className="mx-auto max-w-screen-sm   flex flex-col gap-4"
      >
        <Typography variant="h5" className=" py-2 ">
          Update Password
        </Typography>
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="my-4 font-medium"
          >
            Current Password
          </Typography>
          <Input
            type="password"
            required
            label="Current Password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </div>
        <div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              Password
            </Typography>
            {passwordFocus && (
              <Typography
                color={
                  passwordValidations.length &&
                  passwordValidations.uppercase &&
                  passwordValidations.lowercase &&
                  passwordValidations.number &&
                  passwordValidations.specialCharacter
                    ? "green"
                    : "deep-orange"
                }
                className="my-4 font-medium text-xs"
              >
                Password must contain at least:{" "}
                <span
                  style={{
                    color: passwordValidations.length ? "green" : "deep-orange",
                  }}
                >
                  8 characters
                </span>
                ,{" "}
                <span
                  style={{
                    color: passwordValidations.uppercase
                      ? "green"
                      : "deep-orange",
                  }}
                >
                  one uppercase letter
                </span>
                ,{" "}
                <span
                  style={{
                    color: passwordValidations.lowercase
                      ? "green"
                      : "deep-orange",
                  }}
                >
                  one lowercase letter
                </span>
                ,{" "}
                <span
                  style={{
                    color: passwordValidations.number ? "green" : "deep-orange",
                  }}
                >
                  one number
                </span>
                , and{" "}
                <span
                  style={{
                    color: passwordValidations.specialCharacter
                      ? "green"
                      : "deep-orange",
                  }}
                >
                  one special character
                </span>
                .
              </Typography>
            )}

            <Input
              type="password"
              label="Password"
              required
              value={password}
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />
          </div>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="my-4 font-medium"
            >
              Confirm Password
            </Typography>
            <Input
              type="password"
              required
              label="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
        </div>
        <Typography color="deep-orange" className="font-medium text-xs">
          {validationMessage}
        </Typography>
        <Button
          type="submit"
          size="lg"
          color="amber"
          className="text-gray-700"
          disabled={isSubmitDisabled}
        >
          Update Password
        </Button>
        <Typography
          variant="small"
          color="gray"
          className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
        >
          <LockClosedIcon className="-mt-0.5 h-4 w-4" />
          Password is secure and encrypted
        </Typography>
      </form>
    </div>
  );
};

export default ProtectedRoute(UpdatePassword);
