import { EXIT_COMMANDS, CLEAR_COMMANDS, DEBUG_MODE } from "./config.js";

export function printWelcomeMessage() {
  console.log("========================");
  console.log("   Gemini Playground");
  console.log("========================");
  console.log('Type your prompt or "exit" to quit.\n');
}

export function normalizeInput(input) {
  return input.trim().toLowerCase();
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