import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter = Router()

appRouter.use("/user", userRoutes)
appRouter.use("/chat", chatRoutes)

appRouter.get("health", (req, res) => res.status(200).send("OK"))

export default appRouter;