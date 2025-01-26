import express from "express";
import {config} from "dotenv";
config()
import morgan from "morgan";
import { GoogleGenerativeAI } from "@google/generative-ai";
import appRouter from "./routes/index.js";

const app = express()

app.use(express.json())
// remove it in production
app.use(morgan("dev"))

app.use("/api/v1", appRouter)

// // Test the Gemini API key
// app.get("/test-gemini-key", async (req, res) => {
//     try {
//         const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
//         const prompt = "Explain how special theory of relativity works as if explaining it to a kid";
        
//         const result = await model.generateContent(prompt);
//         console.log(result.response.text());
  
//       return res.status(200).json({
//         message: "Gemini API key is valid.",
//         data: result.response.text(),
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: "Failed to validate Gemini API key.",
//         error: error.response ? error.response.data : error.message,
//       });
//     }
//   });

export default app;