"use client";

import { useAppContext } from "@/app/context";
import { ROLE } from "@/utils/constants";
import BrowseSkills from "./BrowseSkills";
import BrowseTasks from "./BrowseTasks";

const page = () => {
  const { user } = useAppContext();
  if (!user) return;

  return (
    <div>
      {user.role === ROLE.USER ? (
        <BrowseSkills />
      ) : user.role === ROLE.PROVIDER ? (
        <BrowseTasks />
      ) : null}
    </div>
  );
};

export default page;
