import { Role } from "@/proto/task";

export const roleIdMap: Record<Role, string> = {
  [Role.USER]: "userId",
  [Role.PROVIDER]: "providerId",
  [Role.UNRECOGNIZED]: "userId",
};
