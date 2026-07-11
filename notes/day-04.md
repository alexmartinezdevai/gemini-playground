# Day 04 - Refactor into Functions

## Objectives

Today I refactored the Gemini Playground CLI into helper functions.

Before this session, most of the logic was inside the main `while` loop.

The goal was to improve the structure of the code without changing the behavior of the application.

---

## What I Built

The application still works the same way, but the code is now cleaner and easier to understand.

Today I extracted logic into helper functions:

- `printWelcomeMessage()`
- `normalizeInput(input)`
- `isExitCommand(input)`
- `formatHistoryForGemini(history)`
- `generateGeminiResponse(contents)`

I also created a constant for the Gemini model:

```javascript
const GEMINI_MODEL = "gemini-2.5-flash";
```

---

## What Refactoring Means

Refactoring means improving the internal structure of the code without changing what the program does.

The behavior stays the same, but the code becomes:

- Easier to read
- Easier to maintain
- Easier to test
- Easier to extend
- Less repetitive

---

## Why Refactor?

Before refactoring, the `while` loop was responsible for too many things:

```text
Ask user for input
Normalize input
Validate input
Check exit commands
Save user message
Format history for Gemini
Call Gemini
Print response
Save Gemini response
```

After refactoring, some of those details were moved into functions.

This makes the main loop easier to read as a high-level flow.

---

## Function: printWelcomeMessage()

This function prints the welcome message for the CLI.

```javascript
function printWelcomeMessage() {
  console.log("========================");
  console.log("   Gemini Playground");
  console.log("========================");
  console.log('Type your prompt or "exit" to quit.\n');
}
```

Instead of having multiple `console.log()` calls at the top of the file, the logic is grouped inside a named function.

This makes the purpose clearer.

---

## Function: normalizeInput(input)

This function normalizes user input.

```javascript
function normalizeInput(input) {
  return input.trim().toLowerCase();
}
```

It does two things:

1. Removes spaces from the beginning and end of the text.
2. Converts the text to lowercase.

Example:

```javascript
normalizeInput("   EXIT   ");
```

Returns:

```text
"exit"
```

This helps the program detect exit commands even if the user writes:

```text
EXIT
 Quit
 q
```

---

## Function: isExitCommand(input)

This function checks if the user typed an exit command.

```javascript
function isExitCommand(input) {
  return exitCommands.includes(input);
}
```

It returns a boolean:

```javascript
isExitCommand("exit");
// true

isExitCommand("hello");
// false

isExitCommand("q");
// true
```

This makes the main loop easier to read.

Before:

```javascript
if (exitCommands.includes(normalizedPrompt)) {
```

After:

```javascript
if (isExitCommand(normalizedPrompt)) {
```

---

## Function: formatHistoryForGemini(history)

This function converts the internal conversation history format into Gemini's expected format.

Internal format:

```javascript
{
  role: "user",
  text: "My name is Alex"
}
```

Gemini format:

```javascript
{
  role: "user",
  parts: [
    {
      text: "My name is Alex"
    }
  ]
}
```

Function:

```javascript
function formatHistoryForGemini(history) {
  return history.map((message) => ({
    role: message.role,
    parts: [
      {
        text: message.text,
      },
    ],
  }));
}
```

This keeps Gemini-specific formatting logic outside of the main loop.

---

## Function: generateGeminiResponse(contents)

This function calls the Gemini API.

```javascript
async function generateGeminiResponse(contents) {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents,
  });

  return response.text;
}
```

It receives formatted contents and returns only the response text.

This is better than returning the full API response because the application currently only needs the generated text.

---

## Constant: GEMINI_MODEL

Before, the model name was written directly inside the API call.

```javascript
model: "gemini-2.5-flash"
```

Now, it is stored in a constant:

```javascript
const GEMINI_MODEL = "gemini-2.5-flash";
```

And used like this:

```javascript
model: GEMINI_MODEL
```

This makes the code easier to update later.

If the model changes in the future, only one line needs to be changed.

---

## Main Loop After Refactor

The main loop is now easier to read.

```javascript
while (isRunning) {
  const prompt = await rl.question("You: ");
  const normalizedPrompt = normalizeInput(prompt);

  if (!normalizedPrompt) {
    console.log("❌ Prompt cannot be empty. Please try again.\n");
    continue;
  }

  if (isExitCommand(normalizedPrompt)) {
    console.log("\nGoodbye! 👋");
    isRunning = false;
    continue;
  }

  conversationHistory.push({
    role: "user",
    text: prompt,
  });

  const contents = formatHistoryForGemini(conversationHistory);

  console.log("\nGenerating response...\n");

  try {
    const geminiResponse = await generateGeminiResponse(contents);

    console.log("Gemini:");
    console.log(geminiResponse);
    console.log("");

    conversationHistory.push({
      role: "model",
      text: geminiResponse,
    });
  } catch (error) {
    console.error("Failed to generate response:");
    console.error(error);
  }
}
```

The loop now focuses on the application flow instead of implementation details.

---

## Important Lesson

A working program is not always a clean program.

Refactoring helps turn working code into maintainable code.

The goal is not to make the code more complicated.

The goal is to make each part of the code responsible for one clear task.

---

## What I Learned

- What refactoring means.
- Why functions improve readability.
- How to extract repeated or detailed logic into functions.
- How to return values from functions.
- How to use a boolean helper function.
- How to use an async function to call an API.
- Why constants are useful.
- How to make the main loop easier to read.
- Why separating responsibilities matters.