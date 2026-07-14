// Import the official Google Gemini SDK
import { GoogleGenAI } from "@google/genai";

import {
  GEMINI_MODEL,
  MAX_RETRIES,
  RETRY_DELAY_MS,
  SYSTEM_INSTRUCTION,
} from "./config.js";

import { sleep } from "./utils.js";

// Create a Gemini client authenticated with our API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateGeminiResponse(contents) {
  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      return response.text;
    } catch (error) {
      if (!isQuotaError(error) || attempt === MAX_RETRIES) {
        throw error;
      }

      attempt++;

      console.log(
        `⚠️ Temporary Gemini limit reached. Retrying in ${RETRY_DELAY_MS / 1000} seconds...`
      );

      await sleep(RETRY_DELAY_MS);
    }
  }

  throw new Error("Gemini response failed after retries.");
}

export function isQuotaError(error) {
  return error.status === 429;
}