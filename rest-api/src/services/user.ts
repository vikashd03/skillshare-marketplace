import prisma from "@/config/db";
import { User } from "@/prisma";

export const getUsersForIds = async (ids: string[]) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  const usersMap = users.reduce((acc: Record<string, Partial<User>>, user) => {
    const { id, password, created_at, updated_at, ...userDetails } = user;
    acc[id] = userDetails;
    return acc;
  }, {});
  return usersMap;
};
