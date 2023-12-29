"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

export default function UserToggleButton() {
  const { user } = useUser();
  const { theme } = useTheme();
  return (
    <>
      {!user ? (
        <SignInButton />
      ) : (
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
            elements: {
              avatarBox: { width: "1.8rem", height: "1.8rem" },
            },
          }}
        />
      )}
    </>
  );
}
