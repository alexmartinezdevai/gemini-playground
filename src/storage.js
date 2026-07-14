import fs from "node:fs/promises";

import { CONVERSATION_HISTORY_FILE } from "./config.js";

export async function loadConversationHistory() {
  try {
    const fileContent = await fs.readFile(CONVERSATION_HISTORY_FILE, "utf-8");

    return JSON.parse(fileContent);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    } else if (error.name === "SyntaxError") {
      console.error(
        `Error: The conversation history file "${CONVERSATION_HISTORY_FILE}" contains invalid JSON.`
      );
    }

    throw error;
  }
}

export async function saveConversationHistory(history) {
  await fs.mkdir("data", { recursive: true });

  const jsonContent = JSON.stringify(history, null, 2);

  await fs.writeFile(CONVERSATION_HISTORY_FILE, jsonContent, "utf-8");
}