import { Router } from "express";
import { register, login, getUser } from "@/controllers/user";
import validate from "@/middlewares/validate";
import { signupUserSchema } from "@/utils/validations";

const privateRouter = Router();
const publicRouter = Router();

publicRouter.post("/register", validate(signupUserSchema), register);
publicRouter.post("/login", login);

privateRouter.get("/me", getUser);

export { privateRouter, publicRouter };
