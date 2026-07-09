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

Restart PowerShell.

---

# API Key Invalid

## Error

ApiError: API key not valid.

### Symptoms

The application throws an ApiError with HTTP Status 400.

### Root Cause

The API Key stored inside `.env` is invalid or incorrectly copied.

### Solution

- Check the API Key.
- Verify the `.env` file.
- Restart the application.

### Notes

The error comes from the Google Gemini SDK.

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
const prompt = "...";

prompt = "New value";
```

## Solution

Use `let` if the value will change.

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

The readline interface was closed before all user interactions finished.

## Solution

Only call:

```javascript
rl.close();
```

after all questions have been completed.