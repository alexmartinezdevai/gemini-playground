# Day 07 - Config, Retry Logic and Persistent Memory

## Objectives

Today I made the project more configurable, more robust, and more useful as a real CLI assistant.

The main goals were:

- Add a central configuration file.
- Add debug mode support.
- Add retry logic for temporary Gemini errors.
- Add system instructions.
- Add persistent memory using a JSON file.
- Add a command to clear memory.

---

## What I Built

New files:

```text
src/config.js
src/utils.js
src/storage.js
data/conversation-history.json
```

Updated files:

```text
src/index.js
src/cli.js
src/geminiClient.js
```

---

## config.js

I created a central configuration file.

It stores values that may change later:

```javascript
export const GEMINI_MODEL = "gemini-2.5-flash";
export const DEBUG_MODE = false;
export const MAX_RETRIES = 2;
export const RETRY_DELAY_MS = 3000;
export const EXIT_COMMANDS = ["exit", "quit", "q"];
export const CLEAR_COMMANDS = ["clear", "reset"];
export const SYSTEM_INSTRUCTION =
  "You are a helpful AI assistant. Answer clearly and concisely.";
export const CONVERSATION_HISTORY_FILE = "data/conversation-history.json";
```

This makes the project easier to configure and maintain.

---

## Debug Mode

I added `DEBUG_MODE`.

When it is `false`, the app shows clean user-facing errors.

When it is `true`, the app can also show technical error details.

This is useful because normal users do not need stack traces, but developers sometimes do.

---

## Retry Logic

I added retry logic for temporary Gemini quota errors.

The app now uses:

```javascript
MAX_RETRIES
RETRY_DELAY_MS
sleep()
```

If Gemini returns a quota error, the app waits and retries instead of failing immediately.

---

## utils.js

I created a generic utility file.

```javascript
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

This function is used to wait between retries.

---

## System Instruction

I added a system instruction to control Gemini's default behavior.

```javascript
config: {
  systemInstruction: SYSTEM_INSTRUCTION,
}
```

This lets the app define how Gemini should respond by default.

---

## Persistent Memory

Before today, memory only existed while the app was open.

Now the app saves memory to:

```text
data/conversation-history.json
```

The app can:

- Load previous conversation history when it starts.
- Save user messages.
- Save Gemini responses.
- Remember context between executions.

---

## storage.js

I created a storage module.

```javascript
loadConversationHistory()
saveConversationHistory(history)
```

`loadConversationHistory()` reads the JSON file.

`saveConversationHistory()` writes the updated history to the JSON file.

---

## Clear Memory Command

I added two commands:

```text
clear
reset
```

They empty the conversation history and update the JSON file.

```javascript
conversationHistory.length = 0;
await saveConversationHistory(conversationHistory);
```

This clears the array without reassigning it.

---

## What I Learned

- How to centralize configuration.
- How to use debug mode.
- How retry logic works.
- How to wait using `sleep()`.
- How to use system instructions.
- How to read files with `fs/promises`.
- How to write JSON files.
- How to create persistent memory.
- How to clear an array without reassigning it.
- How to add custom CLI commands.

---

## Final Result

The app now has:

```text
CLI chat
+
conversation memory
+
persistent JSON memory
+
clear/reset command
+
retry logic
+
debug mode
+
system instruction
+
central config
```