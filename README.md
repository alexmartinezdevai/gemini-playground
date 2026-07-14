# Gemini Playground

A learning project created to understand how to interact with Google's Gemini API using JavaScript and Node.js.

This project is part of my AI Automation roadmap, where I build small applications to learn the fundamentals of AI, APIs, automation, CLI applications, memory, refactoring, modules, error handling, and software engineering.

---

## Objectives

The purpose of this project is to learn:

- Node.js fundamentals
- JavaScript for backend development
- Working with APIs
- Prompt Engineering basics
- Environment variables
- Error handling
- API error handling
- Terminal applications (CLI)
- Input validation
- Conversational loops
- Conversation memory
- Message history
- Refactoring
- Functions
- ES Modules
- Import and export
- Project architecture
- Writing clean and maintainable code

---

## Features

Current features:

- Connect to the Gemini API
- Send prompts to Gemini
- Read prompts from the terminal
- Validate user input
- Reject empty prompts
- Handle API errors
- Keep the application running in a conversation loop
- Exit the application using `exit`, `quit`, or `q`
- Store conversation history during the session
- Send previous messages to Gemini as context
- Allow Gemini to remember previous user messages during the same execution
- Use helper functions to separate responsibilities
- Use a constant for the Gemini model name
- Split source code into multiple modules
- Detect Gemini quota errors
- Show clean user-facing error messages
- Hide large stack traces from normal CLI output

---

## Technologies

- JavaScript
- Node.js
- ES Modules
- Google GenAI SDK
- dotenv
- Node.js readline module

---

## Project Structure

```text
gemini-playground/

├── assets/
├── docs/
│   └── troubleshooting.md
├── examples/
│   └── first-prompt.md
├── notes/
│   ├── day-01.md
│   ├── day-02.md
│   ├── day-03.md
│   ├── day-04.md
│   ├── day-05.md
│   ├── day-06.md
│   ├── session-summary-day-01.md
│   ├── session-summary-day-02.md
│   ├── session-summary-day-03.md
│   ├── session-summary-day-04.md
│   ├── session-summary-day-05.md
│   └── session-summary-day-06.md
├── src/
│   ├── index.js
│   ├── cli.js
│   ├── history.js
│   └── geminiClient.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

## Source Code Architecture

### `src/index.js`

Main application flow.

Responsibilities:

- Load environment variables
- Create the readline interface
- Run the main conversation loop
- Validate user input
- Save messages in conversation history
- Call helper modules
- Handle application flow errors
- Close the CLI when the user exits

---

### `src/cli.js`

CLI-related helper functions.

Responsibilities:

- Print the welcome message
- Normalize user input
- Detect exit commands
- Print clean Gemini error messages

Exports:

```javascript
printWelcomeMessage
normalizeInput
isExitCommand
printGeminiError
```

---

### `src/history.js`

Conversation history utilities.

Responsibilities:

- Convert internal conversation history into Gemini's expected format

Exports:

```javascript
formatHistoryForGemini
```

---

### `src/geminiClient.js`

Gemini API logic.

Responsibilities:

- Create the Gemini client
- Store the Gemini model name
- Send formatted conversation contents to Gemini
- Return Gemini's response text
- Detect quota errors from Gemini

Exports:

```javascript
generateGeminiResponse
isQuotaError
```

---

## Installation

Clone the repository.

```bash
git clone https://github.com/alexmartinezdevai/gemini-playground.git
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
GEMINI_API_KEY=your_api_key
```

Run the project.

```bash
node src/index.js
```

---

## How It Works

Application flow:

```text
Start

↓

Load environment variables

↓

Import helper modules

↓

Create readline interface

↓

Print welcome message

↓

Ask the user for a prompt

↓

Normalize and validate input

↓

If input is empty:
    show error and ask again

If input is exit / quit / q:
    close the program

Otherwise:
    save user message in conversation history

↓

Convert conversation history into Gemini format

↓

Send full conversation context to Gemini

↓

If Gemini succeeds:
    print Gemini response
    save Gemini response in conversation history

If Gemini fails:
    detect the error type
    print a clean user-facing error message

↓

Repeat until user exits
```

---

## Error Handling

The application now handles Gemini errors more cleanly.

For quota errors:

```text
⚠️ Gemini quota limit reached. Please wait and try again later.
```

For unknown errors:

```text
❌ Failed to generate response. Please try again.
```

This prevents large stack traces from being shown during normal CLI usage.

---

## Example

```text
========================
   Gemini Playground
========================
Type your prompt or "exit" to quit.

You: My name is Alex

Generating response...

Gemini:
Nice to meet you, Alex! How can I help you today?

You: What is my name?

Generating response...

Gemini:
Your name is Alex!

You: exit

Goodbye! 👋
```

---

## Concepts Learned

During this project I learned:

- npm
- package.json
- Environment Variables
- dotenv
- Google GenAI SDK
- async / await
- try...catch
- API error handling
- HTTP status codes
- Quota errors
- readline
- stdin
- stdout
- Input Validation
- trim()
- toLowerCase()
- do...while
- while loop
- continue
- Exit Commands
- Arrays
- Objects
- push()
- map()
- Conversation History
- Conversation State
- Gemini contents format
- Role-based messages
- Refactoring
- Functions
- Return values
- Constants
- ES Modules
- export
- import
- Separation of Concerns
- Project Architecture
- User-facing error messages
- Debugging
- CLI UX
- Code Review

---

## Future Improvements

- Add persistent memory using files
- Add system instructions
- Add streaming responses
- Add Markdown output
- Add multiple AI model support
- Add configuration options
- Export conversations to a file
- Limit conversation history size
- Summarize old conversation history
- Add retry logic for temporary API errors
- Add debug mode for developers
- Add a `config.js` module

---

## Learning Goals

This repository is not only about building software.

It is also about documenting the learning process.

Every study session includes:

- Technical notes
- Troubleshooting documentation
- Session summaries
- Updated glossary
- Code reviews

The goal is to build strong software engineering foundations before moving into AI automation, n8n, and intelligent agents.

---

## Author

Alex Martinez

GitHub:  
https://github.com/alexmartinezdevai

---

## License

This project is licensed under the MIT License.