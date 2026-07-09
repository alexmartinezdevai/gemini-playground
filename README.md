# Gemini Playground

A learning project created to understand how to interact with Google's Gemini API using JavaScript and Node.js.

This project is part of my AI Automation roadmap, where I build small applications to learn the fundamentals of AI, APIs, automation, and software engineering.

---

# Objectives

The purpose of this project is to learn:

- Node.js fundamentals
- JavaScript for backend development
- Working with APIs
- Prompt Engineering
- Environment variables
- Error handling
- Terminal applications (CLI)
- Writing clean and maintainable code

---

# Features

Current features:

- Connect to the Gemini API
- Send prompts to Gemini
- Read prompts from the terminal
- Validate user input
- Handle API errors
- Interactive command-line interface (CLI)

---

# Technologies

- JavaScript (ES Modules)
- Node.js
- Google GenAI SDK
- dotenv

---

# Project Structure

```
gemini-playground/

├── docs/
│   └── troubleshooting.md
│
├── notes/
│   └── day-02.md
│
├── resources/
│   └── glossary/
│       └── glossary.md
│
├── src/
│   └── index.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# Installation

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

# How It Works

Application flow:

```
Start

↓

Load environment variables

↓

Create Gemini client

↓

Create readline interface

↓

Ask the user for a prompt

↓

Validate input

↓

Generate AI response

↓

Print response

↓

Close application
```

---

# Example

```
========================
   Gemini Playground
========================

Enter your prompt:

> Explain what Docker is.

Generating response...

Docker is a platform that allows developers to package...
```

---

# Concepts Learned

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
- Stack Trace
- Debugging

---

# Future Improvements

- Multi-turn conversations
- Chat history
- Streaming responses
- Markdown output
- Multiple AI models
- Configuration menu
- Better project architecture

---

# Learning Goals

This repository is not only about building software.

It is also about documenting the learning process.

Every study session includes:

- Technical notes
- Troubleshooting documentation
- Session summaries
- Updated glossary
- Code reviews

The goal is to build strong software engineering foundations before moving into AI automation and intelligent agents.

---

# Author

Alex Martinez

GitHub:
https://github.com/alexmartinezdevai

---

# License

This project is licensed under the MIT License.