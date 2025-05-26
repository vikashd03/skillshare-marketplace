import { Request, Response } from "express";
import prisma from "@/config/db";
import { signinUserSchema, signupUserSchema } from "@/utils/validations";
import { z } from "zod";
import { hashPassword, verifyPassword } from "@/utils/auth";
import { UserRequest } from "@/utils/models";

export const register = async (
  req: Request<{}, {}, z.infer<typeof signupUserSchema>>,
  res: Response
) => {
  const data = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    res.status(404).json({ error: "Email Already Taken" });
    return;
  }

  const createdUser = await prisma.user.create({
    data: {
      ...data,
      password: await hashPassword(data.password),
    },
  });
  if (!createdUser) {
    res.status(500).json({ error: "Error in creating User" });
    return;
  }

  res.status(200).json({ msg: "Signed Up" });
};

export const login = async (
  req: Request<{}, {}, z.infer<typeof signinUserSchema>>,
  res: Response
) => {
  const data = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!existingUser) {
    res.status(404).json({ error: "User Not Found" });
    return;
  }

  const validPassword = await verifyPassword(
    data.password,
    existingUser.password
  );
  if (!validPassword) {
    res.status(401).json({ error: "Passowrd is Invalid" });
    return;
  }

  res.status(200).json({ msg: "Signed In" });
};

export const getUser = async (req: UserRequest, res: Response) => {
  if (req.user) {
    const { password, created_at, updated_at, ...userDetails } = req.user;
    res.status(200).json(userDetails);
    return;
  } else {
    res.status(404).json({ error: "User Not Found" });
    return;
  }
};
