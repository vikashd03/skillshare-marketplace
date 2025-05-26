import { Request, Response, NextFunction } from "express";
import prisma from "@/config/db";
import { verifyPassword } from "@/utils/auth";
import { UserRequest } from "@/utils/models";

const authorizationRequired = (res: Response) => {
  res.setHeader("WWW-Authenticate", 'Basic realm="Access to the site"');
  res.status(401).send("Authentication required.");
};

export const basicAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("basicAuth -", req.url);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    authorizationRequired(res);
    return;
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [email, password] = credentials.split(":");

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      authorizationRequired(res);
      return;
    }

    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) {
      authorizationRequired(res);
      return;
    }

    (req as UserRequest).user = { ...user };

    next();
  } catch (err) {
    res.status(500).send("Internal server error");
    return;
  }
};
