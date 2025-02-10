import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
// Store keys in order of priority
const OPENROUTER_KEYS = [
    process.env.OPEN_ROUTER_KEY,
    process.env.OPEN_ROUTER_KEY_2,
    process.env.OPEN_ROUTER_KEY_3,
    process.env.OPEN_ROUTER_KEY_4
].filter(Boolean); // Remove any undefined keys if some are missing
let currentKeyIndex = 0;
const getOpenAIClient = () => {
    const apiKey = OPENROUTER_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % OPENROUTER_KEYS.length; // Cycle keys
    return new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: apiKey,
        defaultHeaders: {
            "HTTP-Referer": "<YOUR_SITE_URL>",
            "X-Title": "<YOUR_SITE_NAME>",
        }
    });
};
export default getOpenAIClient; // Export the function
//# sourceMappingURL=openai.js.map