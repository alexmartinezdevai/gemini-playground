# Day 08 - Memory Commands and Safe Storage

## Objectives

Today I improved the CLI experience and made persistent memory safer.

The main goals were:

- Add a help command.
- Add a memory status command.
- Improve the clear command with confirmation.
- Make storage error handling safer.
- Add a context message limit before sending history to Gemini.

---

## Commands Added

New CLI commands:

```text
help
commands
memory
status
```

Updated existing commands:

```text
clear
reset
```

The clear/reset command now asks for confirmation before deleting memory.

---

## Help Command

The app can now show available commands.

Example:

```text
You: help

Available commands:

exit, quit, q     Close the application
clear, reset      Clear conversation memory
help, commands    Show available commands
memory, status    Show memory status
```

---

## Memory Status Command

The app can now show memory information.

Example:

```text
Memory status:

Stored messages: 34
User messages: 17
Model messages: 17
Context messages sent to Gemini: 20
```

This helps track how much memory is stored and how much context is sent to Gemini.

---

## Clear Confirmation

Before today, `clear` deleted memory immediately.

Now it asks for confirmation:

```text
Are you sure you want to clear conversation memory? Type "yes" to confirm:
```

If the user types anything other than `yes`, the clear action is cancelled.

---

## Safe Storage Improvements

I improved `loadConversationHistory()`.

Before, any loading error returned an empty array.

Now:

```text
File does not exist → return []
Invalid JSON → show a clear error and throw
Other errors → throw
```

This prevents the app from hiding real problems.

---

## Automatic data/ Folder Creation

I improved `saveConversationHistory()` so it creates the `data/` folder if needed.

```javascript
await fs.mkdir("data", { recursive: true });
```

This prevents errors when saving memory and the folder does not exist.

---

## Context Message Limit

I added:

```javascript
export const MAX_CONTEXT_MESSAGES = 20;
```

The app keeps the full history in the JSON file, but only sends the most recent messages to Gemini.

Flow:

```text
Full conversation history
↓
Get recent messages
↓
Format recent messages for Gemini
↓
Send limited context to Gemini
```

This helps avoid sending too much context as the conversation grows.

---

## Important Clarification

`MAX_CONTEXT_MESSAGES = 20` means the app sends the last 20 total messages.

It does not always mean 10 user messages and 10 model messages.

Usually it will be close to that because the conversation alternates between user and model, but it is not guaranteed.

---

## What I Learned

- How to add new CLI commands.
- How to show help information.
- How to display memory status.
- How to ask for confirmation before destructive actions.
- How to handle file loading errors more safely.
- How to detect missing files with `ENOENT`.
- How to detect invalid JSON with `SyntaxError`.
- How to create folders with `fs.mkdir()`.
- How to limit context using `.slice()`.
- How to use `Math.min()` to show accurate memory status.

---

## Final Result

The app now has better memory management and a cleaner CLI experience.

Current features added today:

```text
help / commands
memory / status
clear confirmation
safe storage loading
automatic data folder creation
context message limit
updated memory status
```