import React, { useState } from "react";
import {
  Button,
  Typography,
  Input,
  IconButton,
} from "@/components/MaterialComponents/Material-Tailwind";
import { LockClosedIcon, EyeIcon } from "@heroicons/react/24/solid";
import UserService from "../../utils/Services/UserService";

const SignUp = ({ onSuccess }) => {
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (
      firstName &&
      lastName &&
      (newPassword.toLowerCase().includes(firstName.toLowerCase()) ||
        newPassword.toLowerCase().includes(lastName.toLowerCase()))
    ) {
      setValidationMessage("Password cannot contain your name or email");
    } else if (newPassword === "") {
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

      if (confirmPassword !== "" && newPassword !== confirmPassword) {
        setValidationMessage("Password does not match");
      } else {
        setValidationMessage("");
      }
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
      setValidationMessage("Password does not match");
    } else {
      setValidationMessage("");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    UserService.register({ email, password, firstName, lastName })
      .then((res) => {
        // Clear all the fields
        setFname("");
        setLname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Update the validation message and make it green
        setValidationMessage(
          "Sign Up Successful! Please proceed to the Sign In tab to log in."
        );

        // Trigger the onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          setValidationMessage(err.response.data.error);
        } else {
          setValidationMessage("An error occurred. Please try again.");
        }
      });
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
    !firstName ||
    !lastName ||
    !email;

  return (
    <>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <div>
          <div className="my-4 flex items-center gap-4">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="my-4 font-medium"
              >
                First Name
              </Typography>
              <Input
                label="eg; John"
                name="firstName"
                required
                value={firstName}
                onChange={(e) => setFname(e.target.value)}
                containerProps={{ className: "min-w-[72px]" }}
              />
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="my-4 font-medium"
              >
                Last Name
              </Typography>
              <Input
                label="eg; Doe"
                name="lastName"
                required
                value={lastName}
                onChange={(e) => setLname(e.target.value)}
                containerProps={{ className: "min-w-[72px]" }}
              />
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="my-4 font-medium"
            >
              Email Address
            </Typography>
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="example@gmail.com"
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="my-4 font-medium"
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
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                required
                value={password}
                onChange={handlePasswordChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                containerProps={{
                  className: "min-w-0",
                }}
                className="pr-20"
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

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="my-4 font-medium"
            >
              Confirm Password
            </Typography>
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                required
                label="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                containerProps={{
                  className: "min-w-0",
                }}
                className="pr-20"
              />
              <IconButton
                size="sm"
                disabled={!confirmPassword}
                className="!absolute rounded-full  bg-transparent shadow-none hover:shadow-none right-1 top-1"
                onClick={() =>
                  setShowConfirmPassword(
                    (prevShowConfirmPassword) => !prevShowConfirmPassword
                  )
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
        </div>
        <Typography
          color={
            validationMessage ===
            "Sign Up Successful! Please proceed to the Sign In tab to log in."
              ? "green"
              : "deep-orange"
          }
          className="font-medium text-xs"
        >
          {validationMessage}
        </Typography>

        <Button
          type="submit"
          size="lg"
          color="amber"
          className="text-gray-700"
          disabled={isSubmitDisabled}
        >
          Sign Up
        </Button>
        <Typography
          variant="small"
          color="gray"
          className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
        >
          <LockClosedIcon className="-mt-0.5 h-4 w-4" /> User Information is
          secure and encrypted
        </Typography>
      </form>
    </>
  );
};

export default SignUp;
