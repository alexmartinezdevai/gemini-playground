// Load environment variables from the .env file
import "dotenv/config";

// Import the official Google Gemini SDK
import { GoogleGenAI } from "@google/genai";

import readline from "node:readline/promises";

const GEMINI_MODEL = "gemini-2.5-flash";
const exitCommands = ["exit", "quit", "q"];
const conversationHistory = [];

let isRunning = true;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a Gemini client authenticated with our API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function printWelcomeMessage() {
  console.log("========================");
  console.log("   Gemini Playground");
  console.log("========================");
  console.log('Type your prompt or "exit" to quit.\n');
}

function normalizeInput(input) {
  return input.trim().toLowerCase();
}

function isExitCommand(input) {
  return exitCommands.includes(input);
}

function formatHistoryForGemini(history) {
  return history.map((message) => ({
    role: message.role,
    parts: [
      {
        text: message.text,
      },
    ],
  }));
}

async function generateGeminiResponse(contents) {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents,
  });

  return response.text;
}

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