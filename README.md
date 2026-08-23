# Clear

Clear is a focused, full-stack todo application built with Node.js, Express, MongoDB, and EJS. It follows the MVC pattern and includes local account authentication so every user has a private task list.

The interface uses a responsive, minimal design across the landing page, authentication screens, and task dashboard.

## Features

- Create an account and log in with email and password
- Store sessions in MongoDB
- Create, complete, reopen, and delete personal tasks
- Restrict task routes and mutations to authenticated users
- Ensure users can only modify their own tasks
- Validate account details and hash passwords with bcrypt
- Limit repeated login and signup attempts
- Add common security headers with Helmet
- Log HTTP requests with Morgan
- Support mobile, reduced-motion, and accessible form interactions
- Use modern ECMAScript module (`import`/`export`) syntax
- Keep source files consistently formatted with Prettier

## Technology

- Node.js and Express
- MongoDB and Mongoose
- EJS templates
- Passport local authentication
- bcrypt password hashing
- MongoDB-backed Express sessions
- Helmet, Express Rate Limit, and Morgan
- Vanilla CSS and browser JavaScript
- Prettier for automated code formatting

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the environment

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your settings:

```dotenv
PORT=2121
DB_STRING=mongodb://127.0.0.1:27017/todos
SESSION_SECRET=replace-with-a-long-random-value
```

`DB_STRING` may be a local MongoDB address or a MongoDB Atlas connection string. Use a long, random `SESSION_SECRET` outside local development. The `.env` file is ignored by Git and should not be committed.

### 3. Start the application

For development with automatic restarts:

```bash
npm run dev
```

For a standard production-style start:

```bash
npm start
```

Then open `http://localhost:2121`, or the port selected in `.env`.

## Available scripts

| Command                | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Run the server with Nodemon and restart after file changes |
| `npm run format`       | Format the codebase with Prettier                          |
| `npm run format:check` | Check formatting without changing files                    |
| `npm start`            | Run the server with Node.js                                |
| `npm test`             | Check the server entry point for JavaScript syntax errors  |

## Code formatting

Formatting rules are defined in `.prettierrc`. Run the formatter before committing changes:

```bash
npm run format
```

To verify formatting in CI or without modifying files, run `npm run format:check`.

## Project structure

```text
config/       Database and Passport configuration
controllers/  Authentication, home, and todo request handlers
middleware/   Authentication guards
models/       Mongoose user and todo models
public/       Browser JavaScript and shared styles
routes/       Express route definitions
views/        EJS page templates
server.js     Application entry point and middleware setup
```

## Security notes

Login and signup requests are limited to 10 attempts per IP address during each 15-minute window. Helmet adds standard HTTP security headers, and all todo-changing endpoints require an authenticated session and filter records by the current user.

For production, run the app over HTTPS, set `NODE_ENV=production`, provide a strong session secret, and keep database credentials outside source control.

## License

MIT
