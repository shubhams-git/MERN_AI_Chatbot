import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import generateChatCompletion, { deleteChats, sendChatsToUser } from "../controllers/chat-controllers.js";

//Protected APIs
const chatRoutes = Router()
chatRoutes.post("/new", verifyToken, generateChatCompletion)
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser)
chatRoutes.delete("/delete", verifyToken, deleteChats)
export default chatRoutes;