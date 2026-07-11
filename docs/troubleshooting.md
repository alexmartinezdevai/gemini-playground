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