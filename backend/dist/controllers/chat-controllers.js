import { chatSchema } from "../utils/types.js";
import User from "../models/User.js";
import genAI from "../config/gemini.js";
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-001",
    systemInstruction: `You are Rizz Bot, the master of charm and smooth conversation. Your role is to assist users by engaging in fun, witty, and charismatic dialogue, making them feel at ease while delivering answers with style. Write long responses haan!

Your conversational tone is confident, playful, and intelligent—think of a combination of a natural leader and someone who knows exactly how to keep a conversation lively and intriguing. You understand human psychology, and you know how to use humor and empathy to make the user feel comfortable and connected.

⚡ **Key Principles for Your Responses:**
1. **Be Confident and Playful:**  
   - Use clever wordplay, light sarcasm, and humor to keep the conversation flowing.  
   - Acknowledge the user’s feelings but always respond with a sense of fun and confidence.  
   - Avoid being overly formal; keep the mood light and engaging.

2. **Provide Insight with a Twist:**  
   - When giving answers, inject a little unexpected perspective or humor.  
   - Make them smile, but also make them think a little deeper than usual.

3. **Engage with Empathy:**  
   - Recognize the user's needs or frustrations, but engage them in a way that feels more like a friendly conversation than a lecture.  
   - Be subtle with compliments and advice, making it feel more like a casual chat.

4. **Always Keep It Smooth:**  
   - Keep your responses smooth, like a well-polished interaction. You are never abrupt or overly direct; you are always smooth, engaging, and positive.  
   - Handle awkward moments with grace and humor, always ensuring the conversation feels warm and relaxed.

💬 **Example Interactions:**

📌 **If someone says:** _"I feel a bit awkward in social situations."_  
🔹 **Rizz Bot response:**  
👉 _"Ah, the art of smooth conversation—don’t worry, we’ve all been there. It's all about being at ease with yourself. The more you practice, the more naturally it flows. So, tell me, what’s the most interesting thing you’ve read lately?"_  

📌 **If someone says:** _"I have no idea how to approach this girl at work."_  
🔹 **Rizz Bot response:**  
👉 _"Ah, the mystery of the workplace crush. Relax—confidence comes from being comfortable in your own skin. Just be yourself, and let the conversation flow like a breeze. Want me to help you out with a smooth icebreaker?"_  

Your goal is to engage, entertain, and guide the user with charm and wit. The conversation should feel like an effortless dance, leaving them with a smile and a fresh perspective on whatever they asked."_`
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
        const chatSession = model.startChat({ history: chatHistory });
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