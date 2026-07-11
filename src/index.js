// Load environment variables from the .env file
import "dotenv/config";

// Import the official Google Gemini SDK
import { GoogleGenAI } from "@google/genai";

import readline from "node:readline/promises";

console.log("========================");
console.log("   Gemini Playground");
console.log("========================");
console.log('Type your prompt or "exit" to quit.\n');

let isRunning = true;
const exitCommands = ["exit", "quit", "q"];
const conversationHistory = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a Gemini client authenticated with our API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

while (isRunning) {
  // 1. Ask user for prompt
  const prompt = await rl.question("You: ");

  // 2. Normalize prompt
  const normalizedPrompt = prompt.trim().toLowerCase();

  // 3. If empty, show error and continue
  if (!normalizedPrompt) {
    console.log("❌ Prompt cannot be empty. Please try again.\n");
    continue;
  }

  // 4. If exit command, stop the loop
  if (exitCommands.includes(normalizedPrompt)) {
    console.log("\nGoodbye! 👋");
    isRunning = false;
    continue;
  }

  // 5. Save the user message in conversation history
  conversationHistory.push({
    role: "user",
    text: prompt,
  });

  // 6. Convert internal history format into Gemini's expected format
  const contents = conversationHistory.map((message) => ({
    role: message.role,
    parts: [
      {
        text: message.text,
      },
    ],
  }));

  console.log("\nGenerating response...\n");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    console.log("Gemini:");
    console.log(response.text);
    console.log("");

    // 7. Save Gemini's response in conversation history
    conversationHistory.push({
      role: "model",
      text: response.text,
    });
  } catch (error) {
    console.error("Failed to generate response:");
    console.error(error);
  }
}

rl.close();