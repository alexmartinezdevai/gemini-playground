# Day 02 - Conversational CLI Loop

## Objectives

Today I improved the Gemini Playground CLI.

The previous version allowed the user to write one prompt, receive one answer from Gemini, and then the program ended.

Today the goal was to turn the application into a basic conversational CLI, where the user can keep writing prompts until they decide to exit.

---

## What I Built

The application now:

- Starts with a terminal banner.
- Explains how to exit the program.
- Asks the user for a prompt.
- Validates empty prompts.
- Sends valid prompts to Gemini.
- Prints Gemini's response.
- Keeps running until the user types an exit command.
- Supports multiple exit commands:
  - `exit`
  - `quit`
  - `q`

---

## Conversation Loop

A conversation loop keeps the application running while a condition is true.

In this project, the condition is controlled by:

```javascript
let isRunning = true;
```

The application keeps running while `isRunning` is true.

```javascript
while (isRunning) {
  // Ask user for input
  // Validate input
  // Send prompt to Gemini
}
```

When the user wants to exit, the program changes:

```javascript
isRunning = false;
```

This stops the loop.

---

## while Loop

A `while` loop repeats a block of code while a condition is true.

Example:

```javascript
while (isRunning) {
  console.log("Program is running");
}
```

In this project, the `while` loop is useful because the program should continue asking for prompts until the user decides to stop.

---

## Exit Commands

Exit commands allow the user to close the application in a controlled way.

```javascript
const exitCommands = ["exit", "quit", "q"];
```

The user input is compared against this list.

```javascript
if (exitCommands.includes(normalizedPrompt)) {
  console.log("\nGoodbye! 👋");
  isRunning = false;
  continue;
}
```

---

## Input Normalization

Input normalization means transforming user input into a consistent format before checking it.

Example:

```javascript
const normalizedPrompt = prompt.trim().toLowerCase();
```

This allows the program to correctly detect commands like:

```text
EXIT
 exit
Quit
q
```

All of them are converted into a clean lowercase format.

---

## includes()

The `includes()` method checks if an array contains a specific value.

Example:

```javascript
const exitCommands = ["exit", "quit", "q"];

exitCommands.includes("exit");
// true

exitCommands.includes("hello");
// false
```

In this project, it checks if the user typed one of the exit commands.

---

## continue

The `continue` statement skips the rest of the current loop iteration and moves to the next one.

Example:

```javascript
if (!normalizedPrompt) {
  console.log("Prompt cannot be empty.");
  continue;
}
```

This means:

- Do not continue executing the rest of the loop.
- Do not call Gemini.
- Go back to asking the user for another prompt.

---

## Empty Prompt Validation

The program should not send empty prompts to Gemini.

Why?

- It wastes API calls.
- It creates a bad user experience.
- It may produce useless responses.
- It is better to validate input before processing it.

Validation:

```javascript
if (!normalizedPrompt) {
  console.log("❌ Prompt cannot be empty. Please try again.");
  continue;
}
```

---

## CLI UX

CLI UX means improving the experience of using a command-line application.

Small details matter:

- Clear instructions.
- Helpful error messages.
- A goodbye message.
- Clean spacing.
- Clear labels like `You:` and `Gemini:`.

Example:

```text
You: What is Docker?

Gemini:
Docker is...
```

---

## Code Review Lessons

Today I learned that working code is not always finished code.

A good developer also checks:

- Is the code readable?
- Is the flow logical?
- Are there duplicated conditions?
- Are variables declared close to where they are used?
- Is the user experience clear?
- Are errors handled properly?

---

## Important Bug Fixed

I accidentally duplicated the exit condition.

The first block already used `continue`, so the second block never executed.

Problem:

```javascript
if (exitCommands.includes(normalizedPrompt)) {
  isRunning = false;
  continue;
}

if (exitCommands.includes(normalizedPrompt)) {
  console.log("\nGoodbye! 👋");
  isRunning = false;
  continue;
}
```

The second block was unreachable.

Solution:

```javascript
if (exitCommands.includes(normalizedPrompt)) {
  console.log("\nGoodbye! 👋");
  isRunning = false;
  continue;
}
```

---

## Project Progress

Today the application evolved from a single-prompt script into a basic conversational CLI.

Current application flow:

1. Start application.
2. Show instructions.
3. Ask user for prompt.
4. Normalize input.
5. Validate input.
6. Detect exit commands.
7. Send prompt to Gemini.
8. Print response.
9. Repeat until user exits.

---

## What I Learned

- How to create a conversation loop.
- How to use `while`.
- How to stop a loop with a state variable.
- How to use exit commands.
- How to normalize user input.
- How to use `includes()`.
- How to use `continue`.
- How to improve CLI user experience.
- How to identify unreachable code.
- How to review my own code.