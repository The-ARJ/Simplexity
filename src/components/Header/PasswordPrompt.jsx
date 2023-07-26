import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/Context/UserContext";
import { Chip, Typography } from "@material-tailwind/react";
import Link from "next/link";

export default function UserProfile() {
  const { user, passwordExpired } = useContext(UserContext);
  return (
    <Link href="/profile/update-password">
      {passwordExpired && (
        <Chip
          color="amber"
          size="lg"
          value="Your password has expired. Please Click Here to update it."
        >
          <Typography>xzcxzc</Typography>
        </Chip>
      )}
    </Link>
  );
}
