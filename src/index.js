// Load environment variables from the .env file
import "dotenv/config";

import readline from "node:readline/promises";

import {
  printWelcomeMessage,
  normalizeInput,
  isExitCommand,
} from "./cli.js";

import { formatHistoryForGemini } from "./history.js";

import { generateGeminiResponse } from "./geminiClient.js";

const conversationHistory = [];

let isRunning = true;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

printWelcomeMessage();

while (isRunning) {
  // 1. Ask user for prompt
  const prompt = await rl.question("You: ");

  // 2. Normalize prompt
  const normalizedPrompt = normalizeInput(prompt);

  // 3. If empty, show error and continue
  if (!normalizedPrompt) {
    console.log("❌ Prompt cannot be empty. Please try again.\n");
    continue;
  }

  // 4. If exit command, stop the loop
  if (isExitCommand(normalizedPrompt)) {
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
  const contents = formatHistoryForGemini(conversationHistory);

  console.log("\nGenerating response...\n");

  try {
    const geminiResponse = await generateGeminiResponse(contents);

    console.log("Gemini:");
    console.log(geminiResponse);
    console.log("");

    // 7. Save Gemini's response in conversation history
    conversationHistory.push({
      role: "model",
      text: geminiResponse,
    });
  } catch (error) {
    console.error("Failed to generate response:");
    console.error(error);
  }
}

rl.close();