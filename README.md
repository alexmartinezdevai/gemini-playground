# Gemini Playground

A learning project created to understand how to interact with Google's Gemini API using JavaScript and Node.js.

This project is part of my AI Automation roadmap, where I build small applications to learn the fundamentals of AI, APIs, automation, CLI applications, memory, refactoring, modules, error handling, persistent storage, and software engineering.

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
- Persistent memory
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
- Retry temporary Gemini quota errors
- Keep the application running in a conversation loop
- Exit the application using `exit`, `quit`, or `q`
- Store conversation history during the session
- Save conversation history to a JSON file
- Load conversation history when the app starts
- Clear memory using `clear` or `reset`
- Send previous messages to Gemini as context
- Use system instructions to control Gemini's behavior
- Use helper functions to separate responsibilities
- Use a central configuration file
- Split source code into multiple modules
- Hide large stack traces from normal CLI output
- Support debug mode for technical error details

---

## Technologies

- JavaScript
- Node.js
- ES Modules
- Google GenAI SDK
- dotenv
- Node.js readline module
- Node.js fs/promises module
- JSON file storage

---

## Project Structure

```text
gemini-playground/

├── data/
│   └── conversation-history.json
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
│   ├── day-07.md
│   ├── session-summary-day-01.md
│   ├── session-summary-day-02.md
│   ├── session-summary-day-03.md
│   ├── session-summary-day-04.md
│   ├── session-summary-day-05.md
│   ├── session-summary-day-06.md
│   └── session-summary-day-07.md
├── src/
│   ├── index.js
│   ├── cli.js
│   ├── config.js
│   ├── geminiClient.js
│   ├── history.js
│   ├── storage.js
│   └── utils.js
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
- Load conversation history
- Save messages in conversation history
- Handle clear/reset commands
- Call helper modules
- Close the CLI when the user exits

---

### `src/cli.js`

CLI-related helper functions.

Responsibilities:

- Print the welcome message
- Normalize user input
- Detect exit commands
- Detect clear/reset commands
- Print clean Gemini error messages

Exports:

```javascript
printWelcomeMessage
normalizeInput
isExitCommand
isClearCommand
printGeminiError
```

---

### `src/config.js`

Central configuration file.

Responsibilities:

- Store the Gemini model name
- Store debug mode configuration
- Store retry configuration
- Store CLI commands
- Store system instruction
- Store conversation history file path

Exports:

```javascript
GEMINI_MODEL
DEBUG_MODE
MAX_RETRIES
RETRY_DELAY_MS
EXIT_COMMANDS
CLEAR_COMMANDS
SYSTEM_INSTRUCTION
CONVERSATION_HISTORY_FILE
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
- Send formatted conversation contents to Gemini
- Use system instructions
- Retry quota errors
- Return Gemini's response text
- Detect quota errors

Exports:

```javascript
generateGeminiResponse
isQuotaError
```

---

### `src/storage.js`

Persistent storage logic.

Responsibilities:

- Load conversation history from a JSON file
- Save conversation history to a JSON file

Exports:

```javascript
loadConversationHistory
saveConversationHistory
```

---

### `src/utils.js`

Generic utility functions.

Exports:

```javascript
sleep
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

Load conversation history from JSON file

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

If input is clear / reset:
    clear memory and save empty history

Otherwise:
    save user message in conversation history

↓

Save conversation history to JSON file

↓

Convert conversation history into Gemini format

↓

Send full conversation context to Gemini

↓

If Gemini succeeds:
    print Gemini response
    save Gemini response in conversation history
    update JSON file

If Gemini fails temporarily:
    retry request

If Gemini fails finally:
    print clean user-facing error message

↓

Repeat until user exits
```

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

You: exit

Goodbye! 👋
```

Open the app again:

```text
You: What is my name?

Gemini:
Your name is Alex.
```

Clear memory:

```text
You: clear

🧹 Conversation history cleared.
```

---

## Current Commands

| Command | Purpose |
|---|---|
| `exit` | Close the application |
| `quit` | Close the application |
| `q` | Close the application |
| `clear` | Clear conversation memory |
| `reset` | Clear conversation memory |

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
- Retry logic
- HTTP status codes
- Quota errors
- Persistent memory
- JSON file storage
- Node.js `fs/promises`
- System instructions
- Debug mode
- Configuration files
- CLI commands
- ES Modules
- export
- import
- Separation of Concerns
- Project Architecture

---

## Future Improvements

- Add a debug command
- Add a memory status command
- Add conversation export
- Limit conversation history size
- Summarize old conversation history
- Add better retry messages
- Move retry messages into `cli.js`
- Add multiple AI model support
- Add a configuration menu
- Add tests

---

## Author

Alex Martinez

GitHub:  
https://github.com/alexmartinezdevai

---

## License

This project is licensed under the MIT License.