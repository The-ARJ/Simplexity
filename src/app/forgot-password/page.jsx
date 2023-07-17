"use client";
import React from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import ComplexNavbar from "@/components/Header";
import EmailVerification from "@/components/Auth/ForgotPassword/EmailVerification";
import CodeVerification from "@/components/Auth/ForgotPassword/CodeVerification";
import ResetPassword from "@/components/Auth/ForgotPassword/ResetPassword";

export default function ForgotPassword() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const handleNext = (email, verificationCode) => {
    setEmail(email);
    setVerificationCode(verificationCode);
    setActiveStep((cur) => cur + 1);
  };

  const stepInputs = [
    {
      title: "Enter Your Email Address",
      icon: <UserIcon className="h-5 w-5" />,
      renderInputs: () => (
        <>
          <EmailVerification onNext={handleNext} email={email} />
        </>
      ),
    },
    {
      title: "Enter Validation Code",
      icon: <CogIcon className="h-5 w-5" />,
      renderInputs: () => (
        <>
          <CodeVerification onNext={handleNext} email={email} />
        </>
      ),
    },
    {
      title: "Reset Password",
      icon: <BuildingLibraryIcon className="h-5 w-5" />,
      renderInputs: () => (
        <>
          <ResetPassword
            onNext={handleNext}
            email={email}
            verificationCode={verificationCode}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <ComplexNavbar />

      <div className="py-8 px-4 mx-auto max-w-screen-md ">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
          className=" mt-28"
          lineClassName="amber"
          activeLineClassName="bg-amber-600"
        >
          {stepInputs.map((step, index) => (
            <Step
              key={index}
              onClick={() => {
                if (index < activeStep) {
                  setActiveStep(index);
                }
              }}
              completedClassName="!bg-amber-600 text-white"
            >
              <div
                className={`${
                  activeStep === index ? "bg-amber-600" : ""
                } rounded-full p-2`}
              >
                {step.icon}
              </div>{" "}
              <div className="absolute -bottom-10 w-max text-center">
                <Typography
                  variant="h6"
                  color={activeStep === index ? "amber" : "blue-gray"}
                  className=" hidden md:block"
                >
                  {step.title}
                </Typography>
              </div>
            </Step>
          ))}
        </Stepper>
        <div className="mt-8">{stepInputs[activeStep].renderInputs()}</div>
      </div>
    </>
  );
}
