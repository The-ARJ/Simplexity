"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@material-tailwind/react";

const GoogleSignInButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <Button
      onClick={() => signIn("google", { callbackUrl })}
      size="lg"
      variant="outlined"
      color="blue-gray"
      className="flex items-center gap-3"
    >
      <img src="/assets/google.svg" alt="metamask" className="h-6 w-6" />
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton;
