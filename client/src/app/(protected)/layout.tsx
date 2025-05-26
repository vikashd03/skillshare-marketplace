"use client";

import NavBar from "@/components/NavBar";
import React, { ReactNode, useEffect } from "react";
import { useAppContext } from "../context";
import { redirect, usePathname } from "next/navigation";
import { roleRouteAccessMap } from "@/utils/constants";

const page = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAppContext();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        redirect("/login");
      } else if (
        user?.role &&
        !roleRouteAccessMap[user?.role].includes(pathname)
      ) {
        redirect(roleRouteAccessMap[user?.role][0]);
      }
    }
  }, [user, loading]);

  return !loading && user ? (
    <div>
      <NavBar />
      {children}
    </div>
  ) : (
    <div className="h-full flex items-center justify-center">Loading...</div>
  );
};

export default page;
