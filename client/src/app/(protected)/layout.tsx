import NavBar from "@/components/NavBar";
import React, { ReactNode } from "react";

const page = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default page;
