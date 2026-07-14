# Day 06 - Better Error Handling

## Objectives

Today I improved the error handling in the Gemini Playground CLI.

Before this session, when the Gemini API returned an error, the application printed a large stack trace.

The goal was to detect specific Gemini API errors and show cleaner user-facing messages.

---

## The Problem

When Gemini returned a quota error, the CLI printed a long error object and stack trace.

Example:

```text
ApiError: Quota exceeded.
status: 429
RESOURCE_EXHAUSTED
```

The stack trace included:

- Internal SDK files
- Node.js internal paths
- Long API metadata
- URLs
- Request details

This is useful for debugging, but it is not a good user experience.

---

## Why This Matters

A CLI application should not always show raw technical errors to the user.

Raw errors can be useful during development, but normal users need clear messages.

Bad user experience:

```text
ApiError: {"error":{"code":429,"message":"You exceeded your current quota"...}}
at throwErrorIfNotOK (...)
at async Models.generateContent (...)
```

Better user experience:

```text
⚠️ Gemini quota limit reached. Please wait and try again later.
```

---

## Error Type: 429 Quota Error

The Gemini API returned this status:

```text
429
```

HTTP `429` usually means:

```text
Too Many Requests
```

In this project, it means the Gemini API quota or rate limit was reached.

---

## New Function: isQuotaError()

This function was added to `geminiClient.js`.

```javascript
export function isQuotaError(error) {
  return error.status === 429;
}
```

This function checks if an error is a quota error.

Example:

```javascript
isQuotaError({ status: 429 });
// true

isQuotaError({ status: 400 });
// false

isQuotaError({ status: 500 });
// false
```

---

## Why isQuotaError() Lives in geminiClient.js

The function belongs in `geminiClient.js` because it understands Gemini API errors.

Responsibility:

```text
geminiClient.js → Gemini API logic and Gemini API error detection
```

The main `index.js` file should not need to know that quota errors are detected with:

```javascript
error.status === 429
```

That detail is hidden inside `geminiClient.js`.

---

## New Function: printGeminiError()

This function was added to `cli.js`.

```javascript
export function printGeminiError(error, isQuotaError) {
  if (isQuotaError(error)) {
    console.error("⚠️ Gemini quota limit reached. Please wait and try again later.\n");
    return;
  }

  console.error("❌ Failed to generate response. Please try again.\n");
}
```

This function prints clean error messages for the user.

---

## Why printGeminiError() Lives in cli.js

The function belongs in `cli.js` because it prints messages to the terminal.

Responsibility:

```text
cli.js → user-facing terminal output
```

The CLI module should handle what the user sees.

---

## Updated Error Handling in index.js

Before:

```javascript
} catch (error) {
  console.error("Failed to generate response:");
  console.error(error);
}
```

This printed too much technical information.

After:

```javascript
} catch (error) {
  printGeminiError(error, isQuotaError);
}
```

Now `index.js` stays focused on the main application flow.

It does not contain detailed error formatting logic.

---

## Separation of Responsibilities

The new structure is cleaner:

```text
geminiClient.js
→ detects Gemini-specific API errors

cli.js
→ prints clean messages for the user

index.js
→ coordinates the main application flow
```

This makes the project easier to maintain.

---

## Current Error Messages

### Quota Error

When Gemini returns status `429`, the app shows:

```text
⚠️ Gemini quota limit reached. Please wait and try again later.
```

### Unknown Error

For other unexpected errors, the app shows:

```text
❌ Failed to generate response. Please try again.
```

---

## Important Lesson

Good error handling is not only about catching errors.

Good error handling means:

- Detecting the type of error.
- Showing a useful message.
- Avoiding unnecessary technical noise.
- Keeping the application alive when possible.
- Keeping the code organized by responsibility.

---

## What I Learned

- What HTTP status `429` means.
- How to detect API quota errors.
- How to create an error helper function.
- How to hide raw stack traces from normal CLI output.
- How to show cleaner user-facing error messages.
- Why API-specific error logic belongs in the API module.
- Why terminal output logic belongs in the CLI module.
- How to keep `index.js` focused on the main flow.
- How better error handling improves user experience.

---

## Future Improvements

Current error handling is cleaner, but it can still improve.

Possible future improvements:

- Add retry logic for temporary errors.
- Add a debug mode to optionally show full stack traces.
- Handle invalid API key errors with a custom message.
- Handle network errors.
- Handle empty API responses.
- Save error logs to a file.