// Load environment variables from the .env file
import "dotenv/config";

// Import the official Google Gemini SDK
import { GoogleGenAI } from "@google/genai";

import readline from "node:readline/promises";

console.log("========================");
console.log("   Gemini Playground");
console.log("========================");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Create a Gemini client authenticated with our API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

let prompt;


do{
    prompt = await rl.question("Enter your prompt: ");
    if (!prompt.trim()) {
        console.log("❌ Prompt cannot be empty. Please try again.");
    }
}while(!prompt.trim());

rl.close();



console.log("\nGenerating response...\n");

try {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

  console.log(response.text);

} catch (error) {
  console.error("Failed to generate response:");
  console.error(error);
}