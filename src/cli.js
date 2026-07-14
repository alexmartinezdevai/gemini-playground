const exitCommands = ["exit", "quit", "q"];

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
  return exitCommands.includes(input);
}

export function printGeminiError(error, isQuotaError) {
  if (isQuotaError(error)) {
    console.error("⚠️ Gemini quota limit reached. Please wait and try again later.\n");
    return;
  }

  console.error("❌ Failed to generate response. Please try again.\n");
}