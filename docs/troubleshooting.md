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