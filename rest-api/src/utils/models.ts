import { User } from "@/prisma";
import { Request } from "express";

export interface UserRequest extends Request {
  user?: User;
}

export enum ROLE {
  USER = "USER",
  PROVIDER = "PROVIDER",
}

export enum USER_TYPE {
  INDIVIDUAL = "INDIVIDUAL",
  COMPANY = "COMPANY",
}
