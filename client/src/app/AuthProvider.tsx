"use client";

import { ReactNode, useEffect } from "react";
import { useAppContext } from "./context";

const AuthProvider = ({
  children,
  token,
}: {
  children: ReactNode;
  token: string | null;
}) => {
  const { fetchUser, user } = useAppContext();

  useEffect(() => {
    token && fetchUser();
  }, []);

  return user ? (
    children
  ) : (
    <div className="h-full flex items-center justify-center">Loading...</div>
  );
};

export default AuthProvider;
