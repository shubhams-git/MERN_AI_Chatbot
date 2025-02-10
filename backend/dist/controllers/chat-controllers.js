import User from "../models/User.js";
import genAI from "../config/gemini.js";
import { SYSTEM_INSTRUCTIONS } from "../utils/constants.js";
import getOpenAIClient from "../config/openai.js";
const generateChatCompletion = async (req, res, next) => {
    try {
        const { message, modelId } = req.body;
        if (!message || !modelId) {
            return res.status(400).json({ error: "Message and modelId are required" });
        }
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        let aiResponse;
        if (modelId.startsWith('gemini') && !modelId.includes('pro')) {
            // Gemini logic - unchanged
            const model = genAI.getGenerativeModel({
                model: modelId,
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 8000,
                },
                systemInstruction: SYSTEM_INSTRUCTIONS
            });
            const chatHistory = user.chats.map(chat => ({
                role: chat.role === "assistant" ? "model" : "user",
                parts: [{ text: chat.content }]
            }));
            if (chatHistory.length > 0 && chatHistory[0].role !== "user") {
                chatHistory.shift();
            }
            const chatSession = model.startChat({ history: chatHistory });
            const response = await chatSession.sendMessage(message);
            aiResponse = response.response.text() || "No response";
        }
        else {
            // OpenRouter logic - simplified
            const openai = getOpenAIClient(); // Get a new client with the next key
            const messages = [{ role: "system", content: SYSTEM_INSTRUCTIONS }]; // Add system instruction here!
            const chatHistory = user.chats.map(chat => ({
                role: chat.role === "assistant" ? "assistant" : "user",
                content: chat.content
            }));
            messages.push(...chatHistory); // Add the chat history after the system instruction
            messages.push({ role: "user", content: message }); // And finally the user message
            try {
                const completion = await openai.chat.completions.create({
                    model: modelId,
                    messages,
                    temperature: 0.7,
                    max_tokens: 8000
                });
                aiResponse = completion.choices[0].message.content || "No response";
            }
            catch (error) {
                // Handle errors - no retry logic
                console.error("OpenAI API error:", error);
                return res.status(500).json({ error: `OpenAI API error: ${error.message || error}` });
            }
        }
        user.chats.push({ role: "user", content: message });
        user.chats.push({ role: "assistant", content: aiResponse });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
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