import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import bodyParser from "body-parser"; // Optional (built-in in newer Express versions)

import cors from "cors";
import { initializeDatabase } from "./config/conectiondb";
import authroute from "./routes/user_routes";
import course_route from "./routes/course_route";
configDotenv();
initializeDatabase();

const app = express();
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  console.log("get first route");
  res.send("First Route");
});
app.use("/api/user", authroute);
app.use("/api/course", course_route);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} PORT`);
});
