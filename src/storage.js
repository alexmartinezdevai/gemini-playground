import fs from "node:fs/promises";

import { CONVERSATION_HISTORY_FILE } from "./config.js";

export async function loadConversationHistory() {
  try {
    const fileContent = await fs.readFile(CONVERSATION_HISTORY_FILE, "utf-8");

    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

export async function saveConversationHistory(history) {
  const jsonContent = JSON.stringify(history, null, 2);

  await fs.writeFile(CONVERSATION_HISTORY_FILE, jsonContent, "utf-8");
}