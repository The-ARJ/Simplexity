import React, { useState } from "react";
import {
  Button,
  Typography,
  Input,
} from "@/components/MaterialComponents/Material-Tailwind";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import showToast from "@/components/Cart/Toast";
const ResetPassword = ({ verificationCode, email, onNext }) => {
  const router = useRouter();
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
  console.log(email, verificationCode);
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
  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3005/users/reset-password", {
        email: email,
        verificationCode: verificationCode,
        newPassword: password,
      });
      showToast("Password Reset Successfully", "success");
      router.push("/");
    } catch (error) {
      console.error("Failed to reset password:", error);
      setValidationMessage("Failed to reset password");
    }
  };

  const isSubmitDisabled =
    !(
      passwordValidations.length &&
      passwordValidations.uppercase &&
      passwordValidations.lowercase &&
      passwordValidations.number &&
      passwordValidations.specialCharacter
    ) || password !== confirmPassword;

  return (
    <>
      <form
        onSubmit={handleResetPassword}
        className="mx-auto max-w-screen-sm  mt-12 md:mt-32 flex flex-col gap-4"
      >
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
          Reset Password
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
    </>
  );
};

export default ResetPassword;
