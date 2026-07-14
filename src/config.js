// Gemini model used by the application
export const GEMINI_MODEL = "gemini-2.5-flash";

// Enables detailed error logs for development
export const DEBUG_MODE = false;

// Number of times the app will retry temporary Gemini errors
export const MAX_RETRIES = 2;

// Delay between retries in milliseconds
export const RETRY_DELAY_MS = 3000;

// Exit commands supported by the CLI
export const EXIT_COMMANDS = ["exit", "quit", "q"];

// Clear memory commands supported by the CLI
export const CLEAR_COMMANDS = ["clear", "reset"];

// Help commands supported by the CLI
export const HELP_COMMANDS = ["help", "commands"];

// Memory status commands supported by the CLI
export const MEMORY_STATUS_COMMANDS = ["memory", "status"];

// System instruction used to control Gemini's behavior
export const SYSTEM_INSTRUCTION =
  "You are a helpful AI assistant. Answer clearly and concisely.";

// File path used to store persistent conversation history
export const CONVERSATION_HISTORY_FILE = "data/conversation-history.json";

export const MAX_CONTEXT_MESSAGES = 20;