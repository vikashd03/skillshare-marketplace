import express from "express";
import cors from "cors";
import routes from "@/routes";
import { registerNotFound } from "@/utils/helper";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

registerNotFound(app);

export default app;
