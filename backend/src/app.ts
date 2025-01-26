import express from "express";
import {config} from "dotenv";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";


const app = express()
config()
app.use(express.json())

app.get("/hello", (req,res)=>{
    return res.send("Response from /hello endpoint")
})

app.post("/:id",(req,res)=>{
    console.log(req.params.id)
    return res.send("Success")
})

// Test the Gemini API key
app.get("/test-gemini-key", async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = "Explain how special theory of relativity works as if explaining it to a kid";
        
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
  
      return res.status(200).json({
        message: "Gemini API key is valid.",
        data: result.response.text(),
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to validate Gemini API key.",
        error: error.response ? error.response.data : error.message,
      });
    }
  });

export default app;