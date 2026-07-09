# Day 1

## What I learned

- Installed Node.js.
- Installed npm.
- Created my first Node.js project.
- Learned what package.json is.

## Questions

- What is CommonJS?
- What are scripts?

## Concepts

### package.json

The file that defines the project configuration.

### node_modules

Contains installed libraries.

### package-lock.json

Locks dependency versions.

### dependencies

Libraries required by the project.

## Security

- Never store API keys in the code.
- Use environment variables.
- Ignore `.env` with `.gitignore`.

## dotenv

- Reads the .env file.
- Loads environment variables.
- Prevents API keys from being hardcoded.

## Environment Variables

Environment variables allow applications to access sensitive data without storing it in the source code.

Example:

process.env.GEMINI_API_KEYs