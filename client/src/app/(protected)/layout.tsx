"use client";

import NavBar from "@/components/NavBar";
import React, { ReactNode, useEffect } from "react";
import { useAppContext } from "../context";
import { redirect, usePathname } from "next/navigation";
import { roleRouteAccessMap } from "@/utils/constants";

const page = ({ children }: { children: ReactNode }) => {
  const { user } = useAppContext();
  const pathname = usePathname();

  useEffect(() => {
    if (!user?.role) {
      redirect("/login");
    } else if (!roleRouteAccessMap[user?.role].includes(pathname)) {
      redirect(roleRouteAccessMap[user?.role][0]);
    }
  }, [user?.role]);

  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default page;
