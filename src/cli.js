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