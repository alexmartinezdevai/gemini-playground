import {
  MAX_CONTEXT_MESSAGES,
} from "./config.js";



export function formatHistoryForGemini(history) {
  return history.map((message) => ({
    role: message.role,
    parts: [
      {
        text: message.text,
      },
    ],
  }));
}

export function getRecentConversationHistory(history) {
  return history.slice(-MAX_CONTEXT_MESSAGES);
}