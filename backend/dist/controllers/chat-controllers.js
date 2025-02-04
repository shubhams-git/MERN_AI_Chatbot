import { chatSchema } from "../utils/types.js";
import User from "../models/User.js";
import openai from "../config/openai.js";
const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    const result = chatSchema.safeParse(req.body);
    if (!result.success) {
        console.log(req.body);
        return res.status(400).json({ error: "Invalid request body" });
    }
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    try {
        user.chats.push({ role: "user", content: message });
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        const completion = await openai.chat.completions.create({
            model: "meta-llama/llama-3.1-405b-instruct:free",
            messages: chats
        });
        console.log(completion);
        const aiResponse = completion.choices[0].message.content || "Sorry, I could not generate a response at this time.";
        user.chats.push({ role: "assistant", content: aiResponse });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
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