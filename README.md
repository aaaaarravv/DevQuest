# DevQuest — Gamified Developer Productivity App

> Turn your dev workflow into an RPG. Manage projects, crush tasks, take notes, and explore GitHub repos — all while leveling up your character.

![DevQuest](frontend/src/assets/hero.png)

---

## Overview

DevQuest is a full-stack productivity app with a game-inspired UI. You earn XP for completing tasks, level up your character, claim daily rewards, and track your projects as "quests." An AI assistant (powered by OpenAI) is always a click away, and a built-in GitHub explorer lets you browse any user's repositories without leaving the app.

---

## Features

- **XP & Leveling System** — Earn XP by completing tasks (10 / 25 / 50 XP based on difficulty) and claiming a daily reward (50 XP). Level-up thresholds scale automatically.
- **Quest Board (Projects)** — Create and track projects with title, description, tech stack, theme, time limit, and progress percentage.
- **Task Board** — Add tasks with easy / medium / hard difficulty, toggle completion, and watch your XP climb.
- **Grimoire (Notes)** — A full-page markdown-style notepad that persists your notes to the backend.
- **Armory (GitHub Explorer)** — Search any GitHub username to view their profile, public repos, stars, forks, and last-updated timestamps.
- **Guild Assistant (AI Chatbot)** — Floating chat widget backed by OpenAI `gpt-4o-mini`. Falls back to a mock response when no API key is set.
- **Settings** — Switch between 6 visual themes (Midnight, Cyberpunk, Nord Frost, Emerald, Crimson, Onyx), toggle animations / particles / sounds, and manage profile & security.
- **JWT Authentication** — Register, log in, and stay authenticated with secure JWT tokens and bcrypt-hashed passwords.

---

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| React Router 7 | Client-side routing |
| Tailwind CSS 4 | Utility-first styling |
| Lucide React | Icon library |
| Vite 8 | Build tool & dev server |

### Backend
| Tool | Purpose |
|---|---|
| Node.js + Express 4 | REST API server |
| NeDB (nedb-promises) | Embedded file-backed database |
| JSON Web Tokens | Stateless authentication |
| bcryptjs | Password hashing |
| express-rate-limit | Brute-force protection |

---

## Project Structure

```
devquest/
├── backend/
│   ├── src/
│   │   ├── index.js          # Express app entry point
│   │   ├── db/database.js    # NeDB database setup
│   │   ├── middleware/auth.js # JWT middleware
│   │   └── routes/           # auth, projects, tasks, notes, github, chat
│   ├── data/                 # NeDB flat-file databases (auto-created)
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── pages/            # Dashboard, Projects, Tasks, Notes, GitHub, Settings, Login, Signup
    │   ├── components/       # Layout, Navbar, Sidebar, Chatbot, etc.
    │   ├── context/          # AppContext (global state)
    │   └── lib/api.js        # Axios API client
    └── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### 1. Clone the repo

```bash
git clone https://github.com/your-username/devquest.git
cd devquest
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and fill in your values (see below)
npm run dev
```

The API starts on `http://localhost:3001`.

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

The app starts on `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `JWT_SECRET` | **Yes** | Secret for signing JWTs — use a long random string in production |
| `PORT` | No | Server port (default: `3001`) |
| `CLIENT_ORIGIN` | No | Frontend origin for CORS (default: `http://localhost:5173`) |
| `GITHUB_TOKEN` | No | GitHub personal access token — raises rate limit from 60 to 5,000 req/hr |
| `OPENAI_API_KEY` | No | OpenAI API key — enables real AI responses (uses `gpt-4o-mini`); falls back to mock mode if unset |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend base URL (e.g. `http://localhost:3001`) |

---

## API Reference

### Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Register a new user |
| POST | `/api/auth/login` | — | Login, returns JWT |
| GET | `/api/auth/me` | ✓ | Get current user profile |
| POST | `/api/auth/daily` | ✓ | Claim daily XP reward (50 XP, once per day) |

### Projects
| Method | Path | Description |
|---|---|---|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create a project |
| PATCH | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

### Tasks
| Method | Path | Description |
|---|---|---|
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update / toggle completion |
| DELETE | `/api/tasks/:id` | Delete a task |

### Notes
| Method | Path | Description |
|---|---|---|
| GET | `/api/notes` | Get the user's notes |
| PUT | `/api/notes` | Save notes |

### GitHub
| Method | Path | Description |
|---|---|---|
| GET | `/api/github/user/:username` | Fetch a GitHub user profile |
| GET | `/api/github/repos/:username` | Fetch a user's public repos |

### Chat
| Method | Path | Description |
|---|---|---|
| POST | `/api/chat` | Send a message to the AI assistant |

---

## XP System

| Action | XP Reward |
|---|---|
| Complete easy task | 10 XP |
| Complete medium task | 25 XP |
| Complete hard task | 50 XP |
| Daily login reward | 50 XP |

Level-up formula: `next_level_xp = floor(current_next_level_xp × 1.2)`

---

## Data Storage

The backend uses [NeDB](https://github.com/louischatriot/nedb) — an embedded, file-backed database that requires no external setup. Data is stored in `backend/data/*.db` as plain text files.

For production, consider migrating to MongoDB or PostgreSQL.

---

## Deployment

### Frontend (Vercel)

The frontend includes a `vercel.json` and `public/_redirects` for SPA routing. Deploy directly from the `frontend/` directory.

### Backend

Deploy to any Node.js host (Railway, Render, Fly.io, etc.). Set all required environment variables and ensure the `data/` directory is writable.

---

## License

MIT
