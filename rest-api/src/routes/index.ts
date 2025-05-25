import { Router } from "express";
import {
  privateRouter as userPrivateRouter,
  publicRouter as userPublicRouter,
} from "./user";
import skillsRouter from "./skills";
import tasksRouter from "./tasks";
import { basicAuth } from "@/middlewares/auth";
import { registerNotFound } from "@/utils/helper";

const router = Router();

router.use("/user", userPublicRouter);
router.use("/user", basicAuth, userPrivateRouter);
router.use("/skill", basicAuth, skillsRouter);
router.use("/task", basicAuth, tasksRouter);

registerNotFound(router);

export default router;
