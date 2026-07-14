import {
  EXIT_COMMANDS,
  CLEAR_COMMANDS,
  HELP_COMMANDS,
  MEMORY_STATUS_COMMANDS,
  MAX_CONTEXT_MESSAGES,
  DEBUG_MODE,
} from "./config.js";

export function printWelcomeMessage() {
  console.log("========================");
  console.log("   Gemini Playground");
  console.log("========================");
  console.log('Type your prompt or "exit" to quit.\n');
}

export function normalizeInput(input) {
  return input.trim().toLowerCase();
}

export function isMemoryStatusCommand(input) {
  return MEMORY_STATUS_COMMANDS.includes(input);
}

export function isHelpCommand(input) {
  return HELP_COMMANDS.includes(input);
}

export function printHelpMessage() {
  console.log("\nAvailable commands:\n");
  console.log("exit, quit, q     Close the application");
  console.log("clear, reset      Clear conversation memory");
  console.log("help, commands    Show available commands");
  console.log("memory, status    Show memory status\n");
}

export function printMemoryStatus(history) {
  const contextMessages = Math.min(history.length, MAX_CONTEXT_MESSAGES);
  const userMessages = history.filter((message) => message.role === "user");
  const modelMessages = history.filter((message) => message.role === "model");

  console.log("\nMemory status:\n");
  console.log(`Stored messages: ${history.length}`);
  console.log(`User messages: ${userMessages.length}`);
  console.log(`Model messages: ${modelMessages.length}\n`);
  console.log(`Context messages sent to Gemini: ${contextMessages}`);
}

export function isExitCommand(input) {
  return EXIT_COMMANDS.includes(input);
}

export function isClearCommand(input) {
  return CLEAR_COMMANDS.includes(input);
}

export function printGeminiError(error, isQuotaError) {
  if (isQuotaError(error)) {
    console.error("⚠️ Gemini quota limit reached. Please wait and try again later.\n");

    if (DEBUG_MODE) {
      console.error("Debug error details:");
      console.error(error);
    }

    return;
  }

  console.error("❌ Failed to generate response. Please try again.\n");

  if (DEBUG_MODE) {
    console.error("Debug error details:");
    console.error(error);
  }
}