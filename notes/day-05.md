# Day 05 - Split into Multiple Files

## Objectives

Today I split the Gemini Playground source code into multiple files.

Before this session, all the source code was inside one file:

```text
src/index.js
```

The goal was to improve the project architecture by separating responsibilities into different modules.

---

## What I Built

The project now has this structure:

```text
src/
├── index.js
├── cli.js
├── history.js
└── geminiClient.js
```

Each file has a clear responsibility.

---

## Why Split Code into Multiple Files?

As a project grows, a single file can become too large and difficult to maintain.

Before splitting the code, `index.js` handled:

```text
CLI output
Input normalization
Exit commands
Conversation history formatting
Gemini API client
Gemini response generation
Main application flow
```

After splitting the code, each file has a specific role.

This improves:

- Readability
- Maintainability
- Reusability
- Separation of concerns
- Project architecture

---

## New File: cli.js

The `cli.js` file contains helper functions related to the command-line interface.

```javascript
const exitCommands = ["exit", "quit", "q"];

export function printWelcomeMessage() {
  console.log("========================");
  console.log("   Gemini Playground");
  console.log("========================");
  console.log('Type your prompt or "exit" to quit.\n');
}

export function normalizeInput(input) {
  return input.trim().toLowerCase();
}

export function isExitCommand(input) {
  return exitCommands.includes(input);
}
```

Responsibilities:

- Print the welcome message.
- Normalize user input.
- Check if the user typed an exit command.

---

## Internal Detail Hidden in cli.js

The `exitCommands` array is kept inside `cli.js`.

```javascript
const exitCommands = ["exit", "quit", "q"];
```

This is useful because `index.js` does not need to know how exit commands are stored.

It only needs to use:

```javascript
isExitCommand(normalizedPrompt)
```

This hides implementation details and keeps the main file cleaner.

---

## New File: history.js

The `history.js` file contains logic related to conversation history formatting.

```javascript
export function formatHistoryForGemini(history) {
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

Responsibilities:

- Receive internal conversation history.
- Convert it into Gemini's expected format.
- Return the formatted history.

---

## Internal Format vs Gemini Format

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

The `history.js` module handles this transformation.

---

## New File: geminiClient.js

The `geminiClient.js` file contains all Gemini API-related logic.

```javascript
import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = "gemini-2.5-flash";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateGeminiResponse(contents) {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents,
  });

  return response.text;
}
```

Responsibilities:

- Import the Google GenAI SDK.
- Define the Gemini model.
- Create the Gemini client.
- Send contents to Gemini.
- Return only the response text.

---

## Updated File: index.js

The `index.js` file is now focused on the main application flow.

It imports functionality from other modules:

```javascript
import {
  printWelcomeMessage,
  normalizeInput,
  isExitCommand,
} from "./cli.js";

import { formatHistoryForGemini } from "./history.js";
import { generateGeminiResponse } from "./geminiClient.js";
```

Responsibilities:

- Load environment variables.
- Create the readline interface.
- Run the main loop.
- Coordinate the helper functions.
- Store the conversation history.
- Handle errors.
- Close the application.

---

## export

The `export` keyword allows a function, variable, or constant to be used by another file.

Example:

```javascript
export function normalizeInput(input) {
  return input.trim().toLowerCase();
}
```

This means another file can import and use `normalizeInput`.

---

## import

The `import` keyword allows a file to use code exported from another file.

Example:

```javascript
import { normalizeInput } from "./cli.js";
```

In Node.js ES Modules, the `.js` file extension is required.

Correct:

```javascript
import { normalizeInput } from "./cli.js";
```

Incorrect:

```javascript
import { normalizeInput } from "./cli";
```

---

## Named Exports

This project uses named exports.

Example:

```javascript
export function isExitCommand(input) {
  return exitCommands.includes(input);
}
```

And named imports:

```javascript
import { isExitCommand } from "./cli.js";
```

The names must match exactly.

---

## Separation of Concerns

Separation of Concerns means each part of the program should have a clear responsibility.

Current separation:

```text
cli.js
→ terminal and user input helpers

history.js
→ conversation history formatting

geminiClient.js
→ Gemini API logic

index.js
→ main application flow
```

This makes the project easier to understand and extend.

---

## Testing Without Spending API Quota

Because the Gemini API returned a quota error during the session, the application was tested without calling Gemini.

To test imports and exit logic:

```bash
node src/index.js
```

Then type:

```text
exit
```

Expected result:

```text
Goodbye! 👋
```

This confirms that:

- `index.js` runs.
- `cli.js` imports work.
- `readline` works.
- Exit commands work.

---

## API Quota Error

During this session, Gemini returned an API quota error:

```text
429 RESOURCE_EXHAUSTED
Quota exceeded
```

This means the application reached the free-tier request limit.

This was not a code error.

The stack trace showed that the request reached Gemini, which confirms that the new `geminiClient.js` module was working.

---

## What I Learned

- How to split code into multiple files.
- How to use `export`.
- How to use `import`.
- Why `.js` extension is needed in Node.js ES Modules.
- What named exports are.
- How to separate responsibilities by file.
- How to hide implementation details inside modules.
- How to keep `index.js` focused on the main flow.
- How to validate a refactor even when an API quota error happens.