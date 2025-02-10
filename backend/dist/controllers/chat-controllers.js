import { chatSchema } from "../utils/types.js";
import User from "../models/User.js";
import genAI from "../config/gemini.js";
import { SYSTEM_INSTRUCTIONS } from "../utils/constants.js";
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-001",
    generationConfig: {
        temperature: 0.7, // Adjust for desired "rizz" level (0.2-0.9)
        topP: 0.8, // Adjust for diversity (0.1-1.0)
        topK: 40, // Adjust for token selection (1-40)
        maxOutputTokens: 5000, // Limit output length
    },
    systemInstruction: SYSTEM_INSTRUCTIONS
});
const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const result = chatSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ error: "Invalid request body" });
        }
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Convert chat history from old format {role, content} → new {role, parts}
        const chatHistory = user.chats.map(chat => ({
            role: chat.role === "assistant" ? "model" : "user",
            parts: [{ text: chat.content }]
        }));
        // Ensure the first message is from "user" (Gemini requires this)
        if (chatHistory.length > 0 && chatHistory[0].role !== "user") {
            chatHistory.shift(); // Remove the first message if it's not from the user
        }
        // Start chat session with chat history
        const chatSession = model.startChat({ history: chatHistory,
            generationConfig: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 5000,
            },
        });
        // Send the new user message
        const response = await chatSession.sendMessage(message);
        const aiResponse = response.response.text() || "Sorry, I could not generate a response at this time.";
        // Store chat in DB using the **old format** (to keep compatibility)
        user.chats.push({ role: "user", content: message });
        user.chats.push({ role: "assistant", content: aiResponse });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized Access"
            });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({
                message: "Unauthorized Access- Permissions did not match"
            });
        }
        return res.status(200).json({
            chats: user.chats
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            cause: error.message || "An unknown error occurred",
        });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized Access"
            });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({
                message: "Unauthorized Access- Permissions did not match"
            });
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({
            message: "OK"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            cause: error.message || "An unknown error occurred",
        });
    }
};
export default generateChatCompletion;
//# sourceMappingURL=chat-controllers.js.map