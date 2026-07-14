# Troubleshooting

---

# PowerShell Execution Policy

## Error

```text
npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

## Root Cause

PowerShell blocks script execution by default.

## Solution

Run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Then restart PowerShell or VS Code.

---

# API Key Invalid

## Error

```text
ApiError: API key not valid.
```

## Symptoms

The application throws an `ApiError` with HTTP status `400`.

## Root Cause

The API Key stored in `.env` is invalid, expired, or incorrectly copied.

## Solution

- Check the API Key in Google AI Studio.
- Verify that the `.env` file exists.
- Verify that the variable name is correct:

```env
GEMINI_API_KEY=your_api_key
```

- Restart the application after modifying `.env`.

## Notes

This error comes from the Google Gemini SDK, not from JavaScript itself.

---

# Gemini API Quota Exceeded

## Error

```text
ApiError: Quota exceeded.
status: 429
RESOURCE_EXHAUSTED
```

Example:

```text
You exceeded your current quota, please check your plan and billing details.
Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests
```

## Symptoms

The application starts correctly, but the Gemini API call fails.

The error may include:

```text
status: 429
RESOURCE_EXHAUSTED
Please retry later
```

## Root Cause

The Gemini API free-tier request limit was exceeded.

This can happen when too many requests are made in a short period of time or when the daily free-tier limit is reached.

## Solution

- Wait and retry later.
- Reduce the number of API calls while testing.
- Test non-API flows by typing `exit`.
- Check usage and rate limits in Google AI Studio.
- Consider using another model or checking billing settings if needed.

## User-Friendly Handling

The application now detects this error with:

```javascript
export function isQuotaError(error) {
  return error.status === 429;
}
```

And prints:

```text
⚠️ Gemini quota limit reached. Please wait and try again later.
```

## Notes

This is not a JavaScript error.

If the stack trace reaches `generateGeminiResponse()`, it means the code reached the Gemini API correctly.

---

# Assignment to Constant Variable

## Error

```text
Assignment to constant variable.
```

## Root Cause

A variable declared with `const` cannot be reassigned.

Example:

```javascript
const prompt = "Hello";

prompt = "New value";
```

## Solution

Use `let` if the value will change during execution.

```javascript
let prompt;
```

---

# readline Already Closed

## Error

The application cannot ask for another prompt after calling:

```javascript
rl.close();
```

## Root Cause

The readline interface was closed before all user interactions were completed.

## Solution

Only call:

```javascript
rl.close();
```

after all user input has been completed.

---

# Unreachable Code After continue

## Problem

A block of code does not execute because a previous condition already uses `continue`.

Example:

```javascript
if (exitCommands.includes(normalizedPrompt)) {
  isRunning = false;
  continue;
}

if (exitCommands.includes(normalizedPrompt)) {
  console.log("Goodbye!");
}
```

## Root Cause

The first `continue` skips the rest of the current loop iteration.

This means the second `if` block is never reached.

## Solution

Merge the logic into a single condition.

```javascript
if (exitCommands.includes(normalizedPrompt)) {
  console.log("\nGoodbye! 👋");
  isRunning = false;
  continue;
}
```

---

# Wrong CLI Message Formatting

## Problem

The application printed this message:

```text
Type your prompt or +"exit" to quit.
```

## Root Cause

The string was written incorrectly.

Problematic code:

```javascript
console.log("Type your prompt or +\"exit\" to quit.");
```

## Solution

Use single quotes outside the string if the message contains double quotes.

```javascript
console.log('Type your prompt or "exit" to quit.\n');
```

---

# Gemini Does Not Remember Previous Messages

## Problem

The user tells Gemini something, but Gemini does not remember it in the next message.

Example:

```text
You: My name is Alex
Gemini: Nice to meet you, Alex

You: What is my name?
Gemini: I do not know your name.
```

## Root Cause

The application is only sending the latest prompt to Gemini.

Problematic code:

```javascript
contents: prompt
```

This sends only the current user message, not the full conversation history.

## Solution

Store messages in `conversationHistory`.

```javascript
const conversationHistory = [];
```

Save the user message after validation.

```javascript
conversationHistory.push({
  role: "user",
  text: prompt,
});
```

Transform the history into Gemini's expected format.

```javascript
const contents = conversationHistory.map((message) => ({
  role: message.role,
  parts: [
    {
      text: message.text,
    },
  ],
}));
```

Send the full history to Gemini.

```javascript
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents,
});
```

Save Gemini's response.

```javascript
conversationHistory.push({
  role: "model",
  text: response.text,
});
```

---

# Debug Logs Left in Final Code

## Problem

The application prints the full conversation history after every response.

Example:

```text
Conversation history:
[
  { role: 'user', text: 'My name is Alex' },
  { role: 'model', text: 'Nice to meet you, Alex!' }
]
```

## Root Cause

Debug logs were added to check if the conversation history was working.

```javascript
console.log("Conversation history:");
console.log(conversationHistory);
```

## Solution

Remove debug logs from the final version.

Keep them only when debugging.

```javascript
// Remove this from final code
console.log("Conversation history:");
console.log(conversationHistory);
```

---

# Function Does Not Return a Value

## Problem

A helper function runs, but the result is `undefined`.

Example:

```javascript
function normalizeInput(input) {
  input.trim().toLowerCase();
}

const normalizedPrompt = normalizeInput(prompt);
```

`normalizedPrompt` becomes `undefined`.

## Root Cause

The function does not use `return`.

## Solution

Return the transformed value.

```javascript
function normalizeInput(input) {
  return input.trim().toLowerCase();
}
```

---

# async Function Without await

## Problem

The API call does not behave as expected, or the function returns a Promise instead of the final result.

## Root Cause

An asynchronous operation was not awaited.

Problematic example:

```javascript
function generateGeminiResponse(contents) {
  const response = ai.models.generateContent({
    model: GEMINI_MODEL,
    contents,
  });

  return response.text;
}
```

## Solution

Use `async` and `await`.

```javascript
async function generateGeminiResponse(contents) {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents,
  });

  return response.text;
}
```

---

# ReferenceError: Function Is Not Defined

## Error

```text
ReferenceError: normalizeInput is not defined
```

## Root Cause

The function name is misspelled, or the function does not exist in the current file.

Example:

```javascript
const normalizedPrompt = normaliseInput(prompt);
```

But the function is named:

```javascript
function normalizeInput(input) {
  return input.trim().toLowerCase();
}
```

## Solution

Check that the function name matches exactly.

JavaScript is case-sensitive.

```javascript
const normalizedPrompt = normalizeInput(prompt);
```

---

# Cannot Find Module

## Error

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find module
```

## Root Cause

Node.js cannot find the file being imported.

Common causes:

- Wrong file path.
- Missing `.js` extension.
- File name typo.
- File does not exist in the expected folder.

Problematic example:

```javascript
import { normalizeInput } from "./cli";
```

## Solution

Use the correct relative path and include the `.js` extension.

```javascript
import { normalizeInput } from "./cli.js";
```

---

# Named Export Not Found

## Error

```text
SyntaxError: The requested module './cli.js' does not provide an export named 'normalizeInput'
```

## Root Cause

The imported name does not match any exported name from the target file.

Example:

```javascript
import { normaliseInput } from "./cli.js";
```

But the exported function is:

```javascript
export function normalizeInput(input) {
  return input.trim().toLowerCase();
}
```

## Solution

Make sure the exported and imported names match exactly.

Correct:

```javascript
import { normalizeInput } from "./cli.js";
```

---

# Raw Stack Trace Printed to User

## Problem

The application prints a large technical stack trace when Gemini fails.

Example:

```text
ApiError: {"error":{"code":429,"message":"You exceeded your current quota"...}}
    at throwErrorIfNotOK (...)
    at async Models.generateContent (...)
    at async generateGeminiResponse (...)
```

## Root Cause

The catch block prints the full error object.

Problematic code:

```javascript
} catch (error) {
  console.error("Failed to generate response:");
  console.error(error);
}
```

## Solution

Use a user-facing error printer.

```javascript
} catch (error) {
  printGeminiError(error, isQuotaError);
}
```

And in `cli.js`:

```javascript
export function printGeminiError(error, isQuotaError) {
  if (isQuotaError(error)) {
    console.error("⚠️ Gemini quota limit reached. Please wait and try again later.\n");
    return;
  }

  console.error("❌ Failed to generate response. Please try again.\n");
}
```

## Notes

Raw stack traces are useful during development, but they are usually not appropriate for normal CLI output.

---

# Persistent Memory Not Loading

## Problem

The application does not remember previous conversations after restarting.

Example:

```text
You: My name is Alex
Gemini: Nice to meet you, Alex

Application is closed and opened again.

You: What is my name?
Gemini: I do not know your name.
```

## Root Cause

The conversation history is not being loaded from the JSON file when the application starts.

Possible causes:

- `data/conversation-history.json` does not exist.
- The file path in `config.js` is incorrect.
- `loadConversationHistory()` is not imported in `index.js`.
- `index.js` still uses an empty array instead of loading from storage.

Problematic code:

```javascript
const conversationHistory = [];
```

## Solution

Make sure this file exists:

```text
data/conversation-history.json
```

Initial content:

```json
[]
```

Make sure `config.js` includes:

```javascript
export const CONVERSATION_HISTORY_FILE = "data/conversation-history.json";
```

Make sure `index.js` imports the storage functions:

```javascript
import {
  loadConversationHistory,
  saveConversationHistory,
} from "./storage.js";
```

And make sure the conversation history is loaded like this:

```javascript
const conversationHistory = await loadConversationHistory();
```

## Notes

The app needs persistent storage if it should remember information after being closed.

Session-based memory only works while the application is running.

---

# Persistent Memory Not Saving

## Problem

The app remembers messages during the current session, but the JSON file does not update.

## Root Cause

The application updates the `conversationHistory` array but does not write it to disk.

Example:

```javascript
conversationHistory.push({
  role: "user",
  text: prompt,
});
```

This only updates memory inside the running program.

It does not save the data to a file.

## Solution

Call `saveConversationHistory()` after adding a new message.

For user messages:

```javascript
conversationHistory.push({
  role: "user",
  text: prompt,
});

await saveConversationHistory(conversationHistory);
```

For Gemini responses:

```javascript
conversationHistory.push({
  role: "model",
  text: geminiResponse,
});

await saveConversationHistory(conversationHistory);
```

## Notes

Updating an array and saving a file are two different operations.

The app must do both if memory should persist.

---

# conversation-history.json Does Not Exist

## Problem

The app cannot load persistent memory.

## Root Cause

The memory file was not created.

The app expects this file:

```text
data/conversation-history.json
```

## Solution

Create the folder:

```text
data/
```

Create the file:

```text
conversation-history.json
```

Add this initial content:

```json
[]
```

Final structure:

```text
data/
└── conversation-history.json
```

## Notes

The file starts as an empty JSON array because conversation history is stored as a list of messages.

---

# Invalid JSON in conversation-history.json

## Problem

The app starts with empty memory or fails to load existing memory.

## Root Cause

The JSON file contains invalid JSON syntax.

Invalid example:

```json
[
  {
    "role": "user",
    "text": "Hello",
  }
]
```

The trailing comma after `"Hello"` is invalid JSON.

## Solution

Fix the JSON manually or reset the file to:

```json
[]
```

Valid example:

```json
[
  {
    "role": "user",
    "text": "Hello"
  }
]
```

## Notes

JavaScript objects can sometimes allow trailing commas, but JSON files cannot.

---

# Clear Command Does Not Work

## Problem

Typing `clear` or `reset` does not clear the conversation memory.

## Root Cause

One of the clear command pieces is missing.

Possible causes:

- `CLEAR_COMMANDS` is missing from `config.js`.
- `isClearCommand()` is missing from `cli.js`.
- `isClearCommand()` is not imported in `index.js`.
- The history array is cleared but not saved to disk.

## Solution

In `config.js`:

```javascript
export const CLEAR_COMMANDS = ["clear", "reset"];
```

In `cli.js`:

```javascript
export function isClearCommand(input) {
  return CLEAR_COMMANDS.includes(input);
}
```

In `index.js`, import it:

```javascript
import {
  printWelcomeMessage,
  normalizeInput,
  isExitCommand,
  printGeminiError,
  isClearCommand,
} from "./cli.js";
```

Then handle the command before sending anything to Gemini:

```javascript
if (isClearCommand(normalizedPrompt)) {
  conversationHistory.length = 0;
  await saveConversationHistory(conversationHistory);
  console.log("🧹 Conversation history cleared.\n");
  continue;
}
```

## Notes

The array is cleared with:

```javascript
conversationHistory.length = 0;
```

This keeps the same array reference but removes all items.

This is useful when the array was declared with `const`.

---

# Clear Command Clears Memory During Session But Not After Restart

## Problem

Typing `clear` removes memory during the current session, but after restarting the app, old memory comes back.

## Root Cause

The array was cleared in memory, but the JSON file was not updated.

Problematic code:

```javascript
conversationHistory.length = 0;
console.log("Memory cleared.");
```

## Solution

Save the empty array after clearing it.

```javascript
conversationHistory.length = 0;
await saveConversationHistory(conversationHistory);
console.log("🧹 Conversation history cleared.\n");
```

## Notes

Persistent memory must always update the file.

Otherwise, old memory remains stored on disk.

---

# Retry Logic Does Not Wait

## Problem

The app retries immediately instead of waiting between attempts.

## Root Cause

`sleep()` was not awaited.

Problematic code:

```javascript
sleep(RETRY_DELAY_MS);
```

This starts the Promise but does not wait for it.

## Solution

Use `await`:

```javascript
await sleep(RETRY_DELAY_MS);
```

The `generateGeminiResponse()` function must be async:

```javascript
export async function generateGeminiResponse(contents) {
  // ...
}
```

---

# Retry Logic Never Stops

## Problem

The app keeps retrying forever.

## Root Cause

There is no maximum retry limit or the retry counter is not increasing.

Problematic logic:

```javascript
while (true) {
  // retry forever
}
```

## Solution

Use `MAX_RETRIES` and increase the attempt counter.

```javascript
let attempt = 0;

while (attempt <= MAX_RETRIES) {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
    });

    return response.text;
  } catch (error) {
    if (!isQuotaError(error) || attempt === MAX_RETRIES) {
      throw error;
    }

    attempt++;

    await sleep(RETRY_DELAY_MS);
  }
}
```

## Notes

With:

```javascript
export const MAX_RETRIES = 2;
```

The app makes:

```text
1 normal attempt
+
2 retries
=
3 total attempts
```

---

# Retry Logic Retries Non-Temporary Errors

## Problem

The app retries errors that should not be retried.

Example:

```text
API key invalid
Wrong request format
Missing parameter
```

## Root Cause

The retry logic does not check the error type.

## Solution

Only retry temporary or quota-related errors.

```javascript
if (!isQuotaError(error) || attempt === MAX_RETRIES) {
  throw error;
}
```

This means:

```text
If it is not a quota error:
    throw the error

If retry attempts are finished:
    throw the error

Otherwise:
    retry
```

---

# System Instruction Not Affecting Gemini

## Problem

Gemini does not follow the expected behavior from the system instruction.

## Root Cause

The `SYSTEM_INSTRUCTION` value exists in `config.js`, but it is not sent to Gemini.

## Solution

Import it in `geminiClient.js`:

```javascript
import {
  GEMINI_MODEL,
  MAX_RETRIES,
  RETRY_DELAY_MS,
  SYSTEM_INSTRUCTION,
} from "./config.js";
```

Then send it in the API call:

```javascript
const response = await ai.models.generateContent({
  model: GEMINI_MODEL,
  contents,
  config: {
    systemInstruction: SYSTEM_INSTRUCTION,
  },
});
```

## Notes

A system instruction controls the model's default behavior.

It does not replace user prompts, but it influences how Gemini responds.

---

# Config Value Not Updating App Behavior

## Problem

Changing a value in `config.js` does not seem to affect the app.

Example:

```javascript
export const DEBUG_MODE = true;
```

But no debug details appear.

## Root Cause

Possible causes:

- The value is not imported where it is needed.
- The app was not restarted after changing the file.
- The feature only runs under certain conditions, such as errors.
- The old value is still hardcoded somewhere else.

## Solution

Check that the value is imported from `config.js`.

Example:

```javascript
import { DEBUG_MODE } from "./config.js";
```

Restart the app:

```bash
node src/index.js
```

Search for hardcoded duplicated values.

Example to avoid:

```javascript
const DEBUG_MODE = false;
```

inside another file.

## Notes

A config file is useful only if other modules actually import and use its values.

---

# Debug Mode Shows No Error Details

## Problem

`DEBUG_MODE` is set to `true`, but no technical error details appear.

## Root Cause

Debug details only appear when an error happens.

If Gemini responds successfully, there is no error to print.

## Solution

Make sure `printGeminiError()` includes this logic:

```javascript
if (DEBUG_MODE) {
  console.error("Debug error details:");
  console.error(error);
}
```

And make sure `DEBUG_MODE` is imported in `cli.js`:

```javascript
import { EXIT_COMMANDS, CLEAR_COMMANDS, DEBUG_MODE } from "./config.js";
```

## Notes

Debug mode should not change normal successful responses.

It only affects error output.

---

# fs/promises Import Error

## Problem

The app fails when importing the file system module.

## Root Cause

The import path is wrong.

Problematic code:

```javascript
import fs from "fs/promises";
```

## Solution

Use the Node.js native module prefix:

```javascript
import fs from "node:fs/promises";
```

## Notes

`node:` makes it clear that the module is built into Node.js.

---

# JSON.stringify Output Is Not Readable

## Problem

The conversation history file is saved as one long line.

Example:

```json
[{"role":"user","text":"Hello"},{"role":"model","text":"Hi"}]
```

## Root Cause

`JSON.stringify()` was used without formatting arguments.

Problematic code:

```javascript
JSON.stringify(history);
```

## Solution

Use:

```javascript
JSON.stringify(history, null, 2);
```

Example:

```javascript
const jsonContent = JSON.stringify(history, null, 2);
```

This creates readable formatted JSON.

---

# Top-Level await Does Not Work

## Problem

This line causes an error:

```javascript
const conversationHistory = await loadConversationHistory();
```

## Root Cause

Top-level `await` requires ES Modules.

If the project is not configured as an ES Module project, Node.js may not allow it.

## Solution

Make sure `package.json` includes:

```json
{
  "type": "module"
}
```

## Notes

The project already uses ES Modules with `import` and `export`, so `"type": "module"` is required.


---

# Help Command Does Not Work

## Problem

Typing `help` or `commands` is sent to Gemini instead of showing the command list.

## Root Cause

The app does not detect help commands before sending the prompt to Gemini.

Possible causes:

- `HELP_COMMANDS` is missing from `config.js`.
- `isHelpCommand()` is missing from `cli.js`.
- `isHelpCommand()` is not imported in `index.js`.
- The help command check is placed after the Gemini API call.

## Solution

In `config.js`:

```javascript
export const HELP_COMMANDS = ["help", "commands"];
```

In `cli.js`:

```javascript
export function isHelpCommand(input) {
  return HELP_COMMANDS.includes(input);
}
```

In `index.js`, check the command before sending the prompt to Gemini:

```javascript
if (isHelpCommand(normalizedPrompt)) {
  printHelpMessage();
  continue;
}
```

## Notes

CLI commands should be handled before the app sends anything to the AI model.

---

# Memory Status Command Does Not Work

## Problem

Typing `memory` or `status` is sent to Gemini instead of showing memory information.

## Root Cause

The app does not detect memory status commands before the Gemini API call.

Possible causes:

- `MEMORY_STATUS_COMMANDS` is missing from `config.js`.
- `isMemoryStatusCommand()` is missing from `cli.js`.
- `printMemoryStatus()` is missing from `cli.js`.
- The command check is missing from `index.js`.

## Solution

In `config.js`:

```javascript
export const MEMORY_STATUS_COMMANDS = ["memory", "status"];
```

In `cli.js`:

```javascript
export function isMemoryStatusCommand(input) {
  return MEMORY_STATUS_COMMANDS.includes(input);
}
```

In `index.js`:

```javascript
if (isMemoryStatusCommand(normalizedPrompt)) {
  printMemoryStatus(conversationHistory);
  continue;
}
```

## Notes

The command should use the full stored `conversationHistory`, not the limited Gemini context.

---

# Clear Command Deletes Memory Without Confirmation

## Problem

Typing `clear` or `reset` immediately deletes the conversation memory.

## Root Cause

The clear command directly empties the array and saves it without asking the user to confirm.

Problematic flow:

```text
User types clear
Memory is deleted immediately
```

## Solution

Ask for confirmation before clearing memory.

Expected flow:

```text
User types clear
App asks for confirmation
User types yes
Memory is deleted
```

If the user does not type `yes`, cancel the operation.

## Notes

Clear/reset is a destructive action, so confirmation improves safety.

---

# Clear Confirmation Does Not Cancel

## Problem

Typing something other than `yes` still clears the memory.

## Root Cause

The confirmation input is not checked correctly.

## Solution

Normalize the confirmation input and compare it with `"yes"`.

```javascript
const normalizedConfirmation = normalizeInput(confirmation);

if (normalizedConfirmation !== "yes") {
  console.log("Clear memory cancelled.\n");
  continue;
}
```

Only clear memory after this check passes.

---

# data Folder Missing When Saving Memory

## Problem

The app fails when trying to save conversation history.

The error may look like:

```text
ENOENT: no such file or directory
```

## Root Cause

The file path points to:

```text
data/conversation-history.json
```

but the `data/` folder does not exist.

## Solution

Before writing the file, create the folder if needed.

```javascript
await fs.mkdir("data", { recursive: true });
```

Then save the JSON file.

## Notes

`recursive: true` means:

```text
If the folder exists → do nothing
If the folder does not exist → create it
```

---

# Invalid JSON Error Is Hidden

## Problem

The app silently starts with empty memory even though `conversation-history.json` exists.

## Root Cause

The catch block returns `[]` for every error.

Problematic logic:

```javascript
catch (error) {
  return [];
}
```

This hides real issues such as invalid JSON.

## Solution

Only return `[]` when the file does not exist.

```javascript
if (error.code === "ENOENT") {
  return [];
}

throw error;
```

Optionally show a clearer message for invalid JSON:

```javascript
if (error.name === "SyntaxError") {
  console.error(
    `Error: The conversation history file "${CONVERSATION_HISTORY_FILE}" contains invalid JSON.`
  );
}
```

## Notes

A missing file is normal on first run.

Invalid JSON is not normal and should not be hidden.

---

# Context Limit Does Not Seem To Work

## Problem

The app still stores many messages in `conversation-history.json`.

## Root Cause

The context limit only controls what is sent to Gemini.

It does not delete old messages from the persistent memory file.

## Solution

Understand the difference:

```text
conversation-history.json
→ stores full memory

Gemini API request
→ receives only recent context messages
```

The limiting function should be applied before formatting history for Gemini:

```javascript
const recentHistory = getRecentConversationHistory(conversationHistory);
const contents = formatHistoryForGemini(recentHistory);
```

## Notes

This is intentional.

The app keeps full memory but sends limited context.

---

# Context Messages Count Looks Wrong

## Problem

The memory status says:

```text
Context messages sent to Gemini: 20
```

or another number that does not match user/model message pairs.

## Root Cause

`MAX_CONTEXT_MESSAGES` counts total messages, not conversation turns.

A message can be:

```text
user
model
```

So `MAX_CONTEXT_MESSAGES = 20` means the last 20 total message objects.

It does not always mean:

```text
10 user messages + 10 model messages
```

## Solution

Use this mental model:

```text
MAX_CONTEXT_MESSAGES
=
maximum number of message objects sent to Gemini
```

If the app alternates perfectly between user and model, 20 messages usually means around 10 user messages and 10 model messages.

But errors or special flows can change that.

---

# Memory Status Shows More Context Messages Than Stored Messages

## Problem

The app shows more context messages than actually exist.

Example:

```text
Stored messages: 6
Context messages sent to Gemini: 20
```

## Root Cause

The app prints `MAX_CONTEXT_MESSAGES` directly instead of calculating the real number.

## Solution

Use:

```javascript
const contextMessages = Math.min(history.length, MAX_CONTEXT_MESSAGES);
```

This shows the smaller number between:

```text
stored messages
maximum context messages
```

Example:

```text
Math.min(6, 20) = 6
Math.min(34, 20) = 20
```