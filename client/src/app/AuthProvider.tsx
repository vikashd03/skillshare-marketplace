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

  return children;
};

export default AuthProvider;
