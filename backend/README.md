# DevQuest Backend

Express.js REST API for the DevQuest gamified developer productivity app.

## Stack

- **Runtime**: Node.js
- **Framework**: Express 4
- **Database**: NeDB (embedded, file-backed, no install required)
- **Auth**: JWT (jsonwebtoken) + bcrypt password hashing
- **Rate limiting**: express-rate-limit

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy the example env file and fill in your values
cp .env.example .env

# 3. Start the server
npm start          # production
npm run dev        # development (auto-reload with nodemon)
```

The server starts on `http://localhost:3001` by default.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default: 3001) |
| `JWT_SECRET` | **Yes** | Secret for signing JWTs — use a long random string in production |
| `CLIENT_ORIGIN` | No | Frontend origin for CORS (default: `http://localhost:5173`) |
| `GITHUB_TOKEN` | No | GitHub personal access token — raises rate limit from 60 to 5000 req/hr |
| `OPENAI_API_KEY` | No | OpenAI API key — enables real AI chatbot (uses `gpt-4o-mini`) |

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
| GET | `/api/projects` | List all projects for the current user |
| POST | `/api/projects` | Create a project |
| PATCH | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

### Tasks

| Method | Path | Description |
|---|---|---|
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update / toggle completion (awards XP on completion) |
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

## XP System

| Action | XP |
|---|---|
| Complete easy task | 10 |
| Complete medium task | 25 |
| Complete hard task | 50 |
| Daily reward | 50 |

Level-up formula: `next_level_xp = floor(current_next_level_xp × 1.2)`

## Data Storage

Data is stored in `./data/*.db` files (NeDB format). These are plain text files — back them up or swap to a real database (MongoDB, PostgreSQL) for production.
