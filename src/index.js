// Load environment variables from the .env file
import "dotenv/config";

import readline from "node:readline/promises";

import {
  printWelcomeMessage,
  normalizeInput,
  isExitCommand,
  printGeminiError,
  isClearCommand,
  isHelpCommand,
  printHelpMessage,
  isMemoryStatusCommand,
  printMemoryStatus,
} from "./cli.js";

import {
  formatHistoryForGemini,
  getRecentConversationHistory,
} from "./history.js";


import {
  generateGeminiResponse,
  isQuotaError,
} from "./geminiClient.js";

import {
  loadConversationHistory,
  saveConversationHistory,
} from "./storage.js";

const conversationHistory = await loadConversationHistory();

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

  if (isHelpCommand(normalizedPrompt)) {
    printHelpMessage();
    continue;
  }

  if (isMemoryStatusCommand(normalizedPrompt)) {
    printMemoryStatus(conversationHistory);
    continue;
  }

  if (isExitCommand(normalizedPrompt)) {
    console.log("\nGoodbye! 👋");
    isRunning = false;
    continue;
  }

  if (isClearCommand(normalizedPrompt)) {
    const confirmation = await rl.question(
      'Are you sure you want to clear conversation memory? Type "yes" to confirm: '
    );

    const normalizedConfirmation = normalizeInput(confirmation);

    if (normalizedConfirmation !== "yes") {
      console.log("Clear memory cancelled.\n");
      continue;
    }

    conversationHistory.length = 0;
    await saveConversationHistory(conversationHistory);
    console.log("🧹 Conversation history cleared.\n");
    continue;
  }

  // 5. Save the user message in conversation history
  conversationHistory.push({
    role: "user",
    text: prompt,
  });

  await saveConversationHistory(conversationHistory);

  // 6. Keep only recent messages before sending context to Gemini
  const recentHistory = getRecentConversationHistory(conversationHistory);

  // 7. Convert recent history into Gemini's expected format
  const contents = formatHistoryForGemini(recentHistory);

  console.log("\nGenerating response...\n");

  try {
    const geminiResponse = await generateGeminiResponse(contents);

    console.log("Gemini:");
    console.log(geminiResponse);
    console.log("");

    // 8. Save Gemini's response in conversation history
    conversationHistory.push({
      role: "model",
      text: geminiResponse,
    });

    await saveConversationHistory(conversationHistory);

  } catch (error) {
    printGeminiError(error, isQuotaError);
  }
}

rl.close();