# Session Summary - Project 001 (Day 02)

## Main Goal

The goal of this session was to turn the Gemini Playground project into a basic conversational CLI.

Before this session, the application could only send one prompt to Gemini and then finish.

After this session, the application can keep running, ask for multiple prompts, and exit only when the user types an exit command.

---

## Concepts Learned

| Concept | Explanation |
|----------|-------------|
| `while` loop | Repeats code while a condition is true. |
| Conversation loop | A loop that keeps the application running so the user can send multiple messages. |
| `isRunning` | A state variable used to control whether the application should continue running. |
| Exit command | A command such as `exit`, `quit`, or `q` that stops the application. |
| Input normalization | Cleaning user input before checking it. |
| `toLowerCase()` | Converts text to lowercase. |
| `includes()` | Checks if an array contains a specific value. |
| `continue` | Skips the rest of the current loop iteration and moves to the next one. |
| CLI UX | User experience inside a terminal application. |
| Unreachable code | Code that never runs because the program flow skips it. |

---

## New Code

| Code | Purpose |
|------|---------|
| `let isRunning = true` | Controls whether the application keeps running. |
| `const exitCommands = ["exit", "quit", "q"]` | Stores allowed exit commands. |
| `while (isRunning)` | Keeps the application running until the user exits. |
| `prompt.trim().toLowerCase()` | Normalizes user input. |
| `exitCommands.includes(normalizedPrompt)` | Checks if the user wants to exit. |
| `continue` | Skips the rest of the loop when needed. |
| `console.log("\nGoodbye! 👋")` | Displays a friendly exit message. |

---

## Files Modified

- `src/index.js`
- `README.md`
- `notes/day-02.md`
- `docs/troubleshooting.md`
- `notes/session-summary-day-02.md`
- `Resources/glossary/glossary.md`

---

## Project Progress

The application now supports:

- Multiple prompts in one execution.
- Exit commands.
- Empty input validation.
- Better terminal messages.
- A basic conversational flow.

---

## Code Review Notes

### What was done well

- Correct use of `while`.
- Correct use of `isRunning`.
- Clean input normalization.
- Proper prompt validation.
- Correct use of exit commands.
- Good use of `continue`.

### What was improved

- Removed duplicated exit condition.
- Fixed the goodbye message.
- Improved CLI instruction formatting.
- Moved logic into a cleaner flow.

---

## Senior Developer Insight

Today the project moved from being a simple API test to becoming a real CLI application.

The important concept is not just the `while` loop.

The important concept is application state.

The variable `isRunning` represents whether the application should continue operating. This is a simple example of state management.

State management will become very important later when building:

- Chatbots
- AI assistants
- Agents
- Automations
- SaaS products

---

## Next Session

The next step is to add conversation memory.

Currently, the application looks like a chat, but it does not truly remember previous messages.

Next session goals:

- Understand conversation state.
- Store user and model messages.
- Send conversation history to Gemini.
- Make the assistant remember context during the session.