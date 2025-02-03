import { NextFunction, Request, Response } from "express";
import { chatSchema } from "../utils/types.js";
import User from "../models/User.js";
import openai from "../config/openai.js";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const generateChatCompletion = async (req: Request, res:Response, next:NextFunction) => {
    const {message} = req.body;
    const result = chatSchema.safeParse(req.body);
    if(!result.success){
        console.log(req.body);
        return res.status(400).json({error: "Invalid request body"});
    }
    const user = await User.findById(res.locals.jwtData.id);
    if(!user){
        return res.status(404).json({error: "User not found"});
    }

    try {
        user.chats.push({role: "user", content: message});

        const chats = user.chats.map(({role,content})=>({role,content})) as ChatCompletionMessageParam[];
    
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-thinking-exp:free",
            messages: chats
        })

        const aiResponse = completion.choices[0].message.content || "Sorry, I could not generate a response at this time.";
        user.chats.push({role: "assistant", content: aiResponse});
        await user.save();
        return res.status(200).json({response: aiResponse});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
        
    }

}

export default generateChatCompletion;