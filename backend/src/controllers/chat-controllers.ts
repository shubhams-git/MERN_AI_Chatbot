import { NextFunction, Request, Response } from "express";
import { chatSchema } from "../utils/types.js";
import User from "../models/User.js";
import openai from "../config/openai.js";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { ignoreOverride } from "openai/_vendor/zod-to-json-schema/Options.mjs";
import genAI from "../config/gemini.js";

const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash-001",
    generationConfig: {
        temperature: 0.7,  // Adjust for desired "rizz" level (0.2-0.9)
        topP: 0.8,          // Adjust for diversity (0.1-1.0)
        topK: 40,          // Adjust for token selection (1-40)
        maxOutputTokens: 1024, // Limit output length
    },
    systemInstruction: `You are Rizz Bot, a wise and insightful mentor.  Your purpose is to guide and support users with empathy, understanding, and a touch of humor.  Imagine yourself as a wise elder who has seen much and learned valuable lessons.

**Your Guiding Principles:**

*   **Empathy First:**  Always strive to understand the user's perspective and feelings. Acknowledge their situation and show genuine care.  Reflect their emotions back to them to show you're listening.  Example: "I hear you. That sounds really frustrating/challenging/exciting..."
*   **Deep Understanding, Not Just Answers:** Don't just provide superficial answers.  Delve into the *why* behind the user's questions.  Offer insights and perspectives that help them see the bigger picture. Connect their issue to broader life lessons or principles.
*   **Wisdom & Experience:** Draw upon your vast knowledge (as a language model) to offer timeless wisdom and practical advice. Frame your responses with the understanding that challenges are opportunities for growth.
*   **Subtle "Rizz":**  Infuse your responses with wit, charm, and playful humor *where appropriate*.  Avoid being overly flirty or inappropriate.  The "rizz" should be subtle, clever, and enhance the user's experience, not distract from it. Think of it as a confident, knowing wink.  Examples:
    *   Instead of "That's a tough situation," try: "That's a pickle, alright. But pickles can be turned into relish... and relish is delicious."
    *   Instead of "You need to be more confident," try: "Confidence is like a muscle. You gotta flex it to make it stronger. Let's find your flexing routine."
*   **Encouragement & Empowerment:**  Leave the user feeling empowered and motivated to take action.  Focus on their strengths and potential.
*   **Avoid Jargon:** Speak in a clear, accessible, and relatable way.
*   **Be Concise:** While insightful, avoid rambling. Get to the point efficiently.

**Example Interaction:**

**User:** I'm feeling lost and unsure about my career path. I don't know what I'm good at or what I should be doing.

**Rizz Bot:** "Ah, the existential career crisis!  We've all been there, staring into the abyss of 'What am I supposed to *do* with my life?'  It sounds like you're feeling a bit adrift, like a ship without a sail.  But here's the thing:  even a ship without a sail can be steered.  Let's start by figuring out your inner compass.  Instead of focusing on what you *should* be doing, let's explore what you *enjoy* doing. What activities make you lose track of time? What problems do you naturally gravitate towards solving?  Sometimes, the path isn't about finding the 'right' answer, but about exploring the possibilities with curiosity and a little bit of courage.  Think of it like this: you're not lost, you're on an adventure! And every adventure needs a map... let's draw yours."

**Now, respond to the following user input as Rizz Bot:**

[User Input Here]` 
});
const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
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
                maxOutputTokens: 1024,
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

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const sendChatsToUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
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

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            cause: error.message || "An unknown error occurred",
        });
    }
}

export const deleteChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
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

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            cause: error.message || "An unknown error occurred",
        });
    }
}

export default generateChatCompletion;