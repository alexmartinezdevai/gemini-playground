# Gemini Playground

A learning project created to understand how to interact with Google's Gemini API using JavaScript and Node.js.

This project is part of my AI Automation roadmap, where I build small applications to learn the fundamentals of AI, APIs, automation, CLI applications, and software engineering.

---

## Objectives

The purpose of this project is to learn:

- Node.js fundamentals
- JavaScript for backend development
- Working with APIs
- Prompt Engineering basics
- Environment variables
- Error handling
- Terminal applications (CLI)
- Input validation
- Conversational loops
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

---

## Technologies

- JavaScript
- Node.js
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
│   ├── session-summary-day-01.md
│   └── session-summary-day-02.md
├── src/
│   └── index.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
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

Create Gemini client

↓

Create readline interface

↓

Show CLI instructions

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
    send prompt to Gemini

↓

Print Gemini response

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

You: What is Docker?

Gemini:
Docker is a platform that allows developers to package applications and their dependencies into containers.

You: Explain it with a football example.

Gemini:
Imagine each football team travels with everything it needs...

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
- readline
- stdin
- stdout
- Input Validation
- trim()
- do...while
- while loop
- continue
- Exit Commands
- Stack Trace
- Debugging
- CLI UX
- Code Review

---

## Future Improvements

- Add real conversation history
- Add memory between messages
- Improve project architecture
- Split logic into multiple files
- Add streaming responses
- Add Markdown output
- Add multiple AI model support
- Add configuration options
- Export conversations to a file

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