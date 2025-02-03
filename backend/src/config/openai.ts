import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPEN_ROUTER_KEY,
    defaultHeaders: {
        "HTTP-Referer": "<YOUR_SITE_URL(TO be done during deployment)>", // Optional. Site URL for rankings on openrouter.ai -  Will add later
        "X-Title": "<YOUR_SITE_NAME>(TO be done during deployment)", // Optional. Site title for rankings on openrouter.ai - Will add later
      }
});

export default openai;