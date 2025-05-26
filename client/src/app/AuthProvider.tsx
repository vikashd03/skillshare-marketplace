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
  const { fetchUser, setLoading } = useAppContext();

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return children;
};

export default AuthProvider;
