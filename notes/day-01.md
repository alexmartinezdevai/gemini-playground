# Day 02 - Interactive CLI with Gemini

## Objectives

Today I wanted to improve my first Gemini application by making it interactive.

Instead of sending a fixed prompt, the application now asks the user for input directly from the terminal.

I also learned how asynchronous user input works, how to validate data before sending it to an API, and how to understand error messages returned by JavaScript and external libraries.

---

# What I learned

## readline

`readline` is a built-in Node.js module that allows a program to communicate with the terminal.

It can:

- Ask questions.
- Read user input.
- Close the terminal interface when it is no longer needed.

Example:

```javascript
import readline from "node:readline/promises";
```

---

## readline Interface (rl)

The interface created with `readline.createInterface()` connects our application with the terminal.

```javascript
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
```

After creating the interface we can ask questions using:

```javascript
await rl.question(...)
```

When we finish using it we should close it:

```javascript
rl.close();
```

---

## stdin (Standard Input)

`stdin` is the standard input stream.

It receives information from the user.

Usually:

Keyboard
↓

stdin
↓

Application

---

## stdout (Standard Output)

`stdout` is the standard output stream.

Everything printed with:

```javascript
console.log()
```

is sent to stdout.

Application
↓

stdout
↓

Terminal

---

## User Input

Instead of writing the prompt inside the code, the application now asks the user.

Example:

```text
Enter your prompt:
```

The returned value is stored inside a variable.

```javascript
const prompt = await rl.question(...);
```

---

## Input Validation

Never trust user input.

Before processing any data we should validate it.

Example:

```javascript
if (!prompt.trim())
```

This prevents:

- Empty strings
- Strings containing only spaces

Good applications always validate data before sending requests to an API.

---

## trim()

`trim()` removes spaces at the beginning and end of a string.

Example:

```text
"     Hello     "
```

becomes

```text
"Hello"
```

If the user enters only spaces:

```text
"     "
```

after using `trim()` it becomes:

```text
""
```

which is considered empty.

---

## do...while

The `do...while` loop always executes at least once.

This makes it perfect when we need to ask the user for information before validating it.

Flow:

```
Ask the user

↓

Is the prompt empty?

↓

Yes → Ask again

↓

No → Continue
```

---

## const vs let

Use `const` when a variable should never be reassigned.

```javascript
const apiKey = "...";
```

Use `let` when the value changes during execution.

```javascript
let prompt;
```

---

## Stack Trace

A stack trace tells us:

- What error happened.
- Where it happened.
- Which file caused it.
- Which line contains the problem.

When debugging, always look for the first line that points to your own code.

Example:

```text
src/index.js:13
```

---

## Debugging

Debugging is the process of understanding and fixing errors.

Whenever an error appears, ask yourself:

1. What happened?
2. Where did it happen?
3. Why did it happen?
4. How can I prevent it?

---

## Code Review

A good developer doesn't only make code work.

They also write code that is:

- Readable
- Maintainable
- Organized
- Easy to understand

Today's improvements:

- Used meaningful variable names.
- Validated user input.
- Improved user experience.
- Structured the program into logical sections.

---

# Project Progress

Today my application can:

- Ask the user for a prompt.
- Validate the input.
- Reject empty prompts.
- Connect to Gemini.
- Display the AI response.
- Handle API errors.