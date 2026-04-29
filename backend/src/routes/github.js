const express = require('express');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function githubHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'DevQuest-App',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function githubFetch(url) {
  const res = await fetch(url, { headers: githubHeaders() });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.message || `GitHub API error ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

// ─── GET /api/github/user/:username ──────────────────────────────────────────

router.get('/user/:username', async (req, res) => {
  try {
    const data = await githubFetch(`https://api.github.com/users/${encodeURIComponent(req.params.username)}`);
    res.json({
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      html_url: data.html_url,
    });
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

// ─── GET /api/github/repos/:username ─────────────────────────────────────────
// Returns the user's public repos sorted by last push, max 30

router.get('/repos/:username', async (req, res) => {
  try {
    const data = await githubFetch(
      `https://api.github.com/users/${encodeURIComponent(req.params.username)}/repos?sort=pushed&per_page=30`
    );

    const repos = data.map(r => ({
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      description: r.description,
      html_url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      updated_at: r.pushed_at,
      private: r.private,
    }));

    res.json({ repos });
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

module.exports = router;
