"use client";

import { useAppContext } from "@/app/context";
import { ROLE, RoleLabelMap, UserTypeLabelMap } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const NavBar = () => {
  const { user, logout } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleNaviate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="wi-full h-[70px] bg-blue-200 border-b-gray-500 border-b-2 flex flex-row items-center justify-between  px-[40px]">
      <div className="text-3xl font-medium">
        {user?.role && RoleLabelMap[user.role]}&nbsp;Portal&nbsp;
        {user?.role === ROLE.PROVIDER && (
          <>&nbsp;({UserTypeLabelMap[user?.user_type]})</>
        )}
      </div>
      <div className="flex flex-row gap-[50px]">
        <button
          className={`px-[8px] py-[2px] underline underline-offset-2 cursor-pointer rounded-md hover:bg-blue-300 ${
            pathname === "/dashboard" ? "!bg-blue-500 text-white" : ""
          }`}
          onClick={() => handleNaviate("/dashboard")}
        >
          Dashboard
        </button>
        {user &&
          (user.role === ROLE.USER ? (
            <>
              <button
                className={`px-[8px] py-[2px] underline underline-offset-2 cursor-pointer rounded-md hover:bg-blue-300 ${
                  pathname === "/tasks" ? "!bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleNaviate("/tasks")}
              >
                My Tasks
              </button>
            </>
          ) : user.role === ROLE.PROVIDER ? (
            <>
              <button
                className={`px-[8px] py-[2px] underline underline-offset-2 cursor-pointer rounded-md hover:bg-blue-300 ${
                  pathname === "/skills" ? "!bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleNaviate("/skills")}
              >
                My Skills
              </button>
            </>
          ) : null)}
        <button
          className="px-[8px] py-[2px] cursor-pointer hover:bg-blue-300 hover:rounded-md hover:underline hover:underline-offset-2"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
