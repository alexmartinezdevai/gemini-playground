# Day 03 - Conversation Memory

## Objectives

Today I added conversation memory to the Gemini Playground CLI.

Before this session, the application worked like a chat, but it did not truly remember previous messages.

The goal was to store the conversation history and send it to Gemini so the model could answer using previous context.

---

## What I Built

The application now:

- Stores user messages in memory.
- Stores Gemini responses in memory.
- Keeps a conversation history during the current session.
- Converts the internal history format into Gemini's expected format.
- Sends the full conversation history to Gemini.
- Allows Gemini to answer using previous messages as context.

---

## The Problem

Before adding memory, the application sent only the latest prompt to Gemini.

Example:

```javascript
contents: prompt
```

This meant that if the user wrote:

```text
You: My name is Alex
Gemini: Nice to meet you, Alex

You: What is my name?
```

Gemini could answer:

```text
I do not know your name.
```

This happened because the second request only contained:

```text
What is my name?
```

It did not include the previous message:

```text
My name is Alex
```

---

## The Solution

The solution was to create a conversation history array.

```javascript
const conversationHistory = [];
```

This array stores every valid user message and every successful Gemini response.

Example:

```javascript
[
  {
    role: "user",
    text: "My name is Alex"
  },
  {
    role: "model",
    text: "Nice to meet you, Alex!"
  }
]
```

---

## Saving the User Message

The user message is saved after validation.

This is important because the program should not save:

- Empty prompts
- Spaces
- Exit commands like `exit`, `quit`, or `q`

Code:

```javascript
conversationHistory.push({
  role: "user",
  text: prompt,
});
```

---

## Saving the Gemini Response

Gemini's response is saved only after the API call succeeds.

Code:

```javascript
conversationHistory.push({
  role: "model",
  text: response.text,
});
```

This prevents the program from saving invalid or missing responses if the API call fails.

---

## Internal History Format

The project uses a simple internal format:

```javascript
{
  role: "user",
  text: "My name is Alex"
}
```

This is easy to understand and easy to work with.

The `role` tells us who wrote the message.

The `text` contains the message content.

---

## Gemini Contents Format

Gemini expects a different structure.

Instead of this:

```javascript
{
  role: "user",
  text: "My name is Alex"
}
```

Gemini expects this:

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

So the application needs to transform the internal format before sending it to Gemini.

---

## Transforming the History with map()

The `.map()` method creates a new array by transforming each item from another array.

Code:

```javascript
const contents = conversationHistory.map((message) => ({
  role: message.role,
  parts: [
    {
      text: message.text,
    },
  ],
}));
```

This transforms:

```javascript
{
  role: "user",
  text: "My name is Alex"
}
```

Into:

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

---

## Sending Memory to Gemini

Before, the application sent only the latest prompt.

```javascript
contents: prompt
```

Now, the application sends the full conversation context.

```javascript
contents,
```

This allows Gemini to answer based on previous messages.

---

## Current Application Flow

```text
1. Start application.
2. Ask user for a prompt.
3. Normalize input.
4. Validate input.
5. Check exit commands.
6. Save user message in conversation history.
7. Convert conversation history into Gemini format.
8. Send full history to Gemini.
9. Print Gemini response.
10. Save Gemini response in conversation history.
11. Repeat until user exits.
```

---

## Example Test

Input:

```text
You: My name is Alex
```

Response:

```text
Gemini:
Nice to meet you, Alex!
```

Next input:

```text
You: What is my name?
```

Response:

```text
Gemini:
Your name is Alex!
```

This confirms that conversation memory is working.

---

## Important Lesson

Storing memory is not enough.

The program must also send that memory back to Gemini.

There are two phases:

```text
Phase 1: Store memory
Phase 2: Send memory
```

Both are required for a chatbot to remember context.

---

## What I Learned

- What conversation memory is.
- What conversation state is.
- How to store messages in an array.
- How to use `push()`.
- How to use objects with `role` and `text`.
- Why role-based messages are important.
- How to transform arrays with `.map()`.
- How to convert internal data into API-compatible data.
- How to send full conversation context to Gemini.
- Why a chatbot needs both stored context and reused context.

---

## Future Improvements

The current memory only exists while the program is running.

If the application closes, the memory is lost.

Future improvements:

- Save conversation history to a file.
- Load previous conversations from a file.
- Add a limit to conversation history.
- Summarize old messages.
- Add system instructions.
- Refactor the code into functions.