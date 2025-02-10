import express from "express";
import { config } from "dotenv";
import cors from "cors";
config();
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1", appRouter);
app.get("/health", (req, res) => res.status(200).send("OK"));
export default app;
//# sourceMappingURL=app.js.map