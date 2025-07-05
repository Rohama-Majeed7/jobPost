// app/lib/client-auth.ts (or somewhere like this)

"use client"; // Important!

import { signIn, signOut } from "next-auth/react";

export const login = async () => {
  await signIn("github", { redirect: true, callbackUrl: "/" });
};

export const logout = async () => {
  await signOut({ callbackUrl: "/auth/signin" });
};
