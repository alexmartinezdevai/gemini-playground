# Session Summary - Project 001 (Day 01)

## Concepts Learned

| Concept | Explanation |
|----------|-------------|
| readline | Built-in Node.js module used to communicate with the terminal. |
| readline Interface | Object that manages terminal input and output. |
| stdin | Standard input stream. Receives data from the keyboard. |
| stdout | Standard output stream. Sends data to the terminal. |
| User Input | Reading information entered by the user. |
| Input Validation | Checking user data before processing it. |
| trim() | Removes spaces from the beginning and end of a string. |
| do...while | Loop that always executes at least once. |
| let | Variable that can be reassigned. |
| const | Variable that cannot be reassigned. |
| Stack Trace | Information showing where an error occurred. |
| Debugging | Process of finding and fixing errors. |
| Code Review | Reviewing code to improve quality and maintainability. |

---

## New Code

| Code | Purpose |
|------|---------|
| `import readline from "node:readline/promises"` | Import the readline module. |
| `readline.createInterface()` | Create the terminal interface. |
| `await rl.question()` | Ask the user for input. |
| `rl.close()` | Close the terminal interface. |
| `prompt.trim()` | Remove extra spaces before validation. |
| `do...while` | Keep asking until the prompt is valid. |

---

## Files Modified

- src/index.js
- notes/day-02.md
- docs/troubleshooting.md
- resources/glossary/glossary.md

---

## Project Progress

Today the application evolved from a static prompt to an interactive CLI.

Features:

- Interactive terminal.
- User input.
- Prompt validation.
- Error handling.
- Better code organization.

---

## Senior Developer Insight

Working software is only the first step.

Professional software should also:

- Validate user input.
- Handle errors gracefully.
- Be easy to read.
- Be easy to maintain.
- Provide a good user experience.

Today was the first time the project started to look like a real application instead of a simple API test.

---

## Next Session

- Create a conversation loop.
- Build a simple AI chat in the terminal.
- Learn how to manage conversation state.
- Prepare the project for multiple files and better architecture.