import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import generateChatCompletion from "../controllers/chat-controllers.js";

//Protected API
const chatRoutes = Router()
chatRoutes.post("/new", verifyToken, generateChatCompletion)

export default chatRoutes;