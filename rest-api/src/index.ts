import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import { registerNotFound } from "./utils/helper";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api", routes);

registerNotFound(app);

app.listen(PORT, () => {
  console.log(`Rest API Server is running at http://localhost:${PORT}`);
});
