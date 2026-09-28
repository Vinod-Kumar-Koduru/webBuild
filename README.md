# Main Problem

a portfolio site, a dashboard, a landing page. You can picture exactly how it should look and work. But between the idea and a working app, there's a wall: hours of setup, styling, debugging, and wiring things together.

# AI Web Builder

An AI-powered web app generator built with React, Express, MongoDB, and Google Gemini. Users can sign up, create projects, describe the type of website they want in natural language, and generate a working front-end in HTML/CSS/JavaScript. The app also supports previewing, editing, downloading the generated code, and managing previous project versions.

## Overview

This project turns plain English prompts into complete web pages. Instead of writing frontend code manually, users describe the app idea and the backend uses Gemini AI to generate a full, self-contained HTML file. The generated result is displayed in a live preview, can be edited in a browser code editor, and can be downloaded as a standalone `.html` file.

The application is organized into two main parts:

- Client: React + Vite front-end for the dashboard, authentication flow, builder UI, and live preview
- Server: Express API for auth, project management, and AI code generation

## Features

- User registration and login with JWT authentication
- Project dashboard with create/delete actions
- AI-generated website generation from text prompts
- Conversation-based project history for iterative refinement
- Live preview of generated HTML output
- Editable generated code inside the app
- Download generated page as an HTML file
- MongoDB persistence for users and projects
- Version tracking for generated code snapshots

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- js-cookie

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- Google Gemini API via `@google/genai`
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```bash
AI web builder/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       ├── index.css
│       └── main.jsx
├── server/
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/
│       ├── constants/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── utils/
├── .gitignore
├── README.md
└── package.json (if added later)
```

## How It Works

### 1. User Authentication

Users register or log in through the client app. The backend validates credentials, hashes password data, and issues a JWT token. The token is stored in a cookie and used to protect restricted routes.

### 2. Project Management

Users can create and manage multiple projects. Each project stores:

- title
- description
- generated code
- conversation messages
- version history
- user ownership

### 3. Prompt-to-Code Generation

When a user submits a prompt, the backend:

1. fetches the project record and current conversation context
2. combines it with a system prompt for the AI model
3. sends it to Gemini
4. parses the response and extracts the generated HTML code
5. stores the new message history and updates the project

### 4. Preview and Editing

The generated HTML is rendered in a live preview in the builder page. Users can switch between preview and code tabs, edit the code, and download the result.

## API Overview

The backend exposes the following API routes under `/api`.

### Authentication

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login user
- `GET /api/auth/me` — get authenticated user profile
- `POST /api/auth/logout` — logout

### Projects

- `GET /api/projects` — fetch all projects for the authenticated user
- `POST /api/projects` — create a new project
- `GET /api/projects/:id` — get one project
- `PUT /api/projects/:id` — update project details
- `DELETE /api/projects/:id` — delete a project

### AI Generation

- `POST /api/generate/:projectId` — generate or refine code for a project based on a prompt

## Environment Variables

Create a `.env` file inside the `server` folder with the following values:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/ai-web-builder
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
```

### Notes

- `MONGODB_URI` should point to your MongoDB instance.
- `GEMINI_API_KEY` is required for the AI generation feature.
- `JWT_SECRET` should be a strong random value in production.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "AI web builder"
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

### 4. Start the Backend

```bash
cd server
npm run dev
```

### 5. Start the Frontend

```bash
cd client
npm run dev
```

The client usually runs at:

```text
http://localhost:5173
```

The backend runs at:

```text
http://localhost:5000
```

## Typical User Flow

1. Open the app and create an account.
2. Log in to the dashboard.
3. Click “New Project”.
4. Describe the app you want to build in plain English.
5. Wait for Gemini to generate the first version.
6. Review the live preview and edit the code if needed.
7. Download the final HTML file for deployment or reuse.

## Generated Code Behavior

The AI is configured to generate a single HTML file containing:

- embedded CSS in a `<style>` block
- embedded JavaScript in a `<script>` block
- a complete, self-contained page that works in a browser
- modern UI design and responsive layout patterns

The backend parses the Markdown code block from Gemini’s response and stores it as the project’s generated code.

## Important Notes

- This app is designed for front-end generation and project management, not a full production deployment system.
- The generated output is a standalone HTML page, which is ideal for fast prototyping.
- The app uses local development URLs by default; update environment values for production deployment.
- If the Gemini model fails, the backend retries with fallback model names defined in the configuration.

## Future Improvements

Potential enhancements include:

- multi-page app generation
- React/Next.js code generation instead of single-file HTML output
- export as ZIP project structure
- drag-and-drop layouts
- real-time collaborative editing
- deployment integration with hosting providers

## Summary

This project is a practical AI-powered app builder that helps users move from a simple idea to a working website. It combines modern frontend UX with a backend AI generation pipeline and database persistence, making it a strong foundation for an AI product prototype or MVP.

# VINOD KUMAR
