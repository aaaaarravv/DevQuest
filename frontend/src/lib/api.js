/**
 * DevQuest API client
 * Wraps all calls to the Express backend.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ─── Token storage ────────────────────────────────────────────────────────────

export function getToken() {
  return localStorage.getItem('devquest-token');
}

export function setToken(token) {
  localStorage.setItem('devquest-token', token);
}

export function clearToken() {
  localStorage.removeItem('devquest-token');
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

async function request(method, path, body) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.error || `Request failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }

  return data;
}

const get  = (path)        => request('GET',    path);
const post = (path, body)  => request('POST',   path, body);
const put  = (path, body)  => request('PUT',    path, body);
const patch = (path, body) => request('PATCH',  path, body);
const del  = (path)        => request('DELETE', path);

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const auth = {
  register: (name, email, password, character_class) =>
    post('/api/auth/register', { name, email, password, character_class }),

  login: (email, password) =>
    post('/api/auth/login', { email, password }),

  me: () => get('/api/auth/me'),

  claimDaily: () => post('/api/auth/daily'),
};

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects = {
  list: ()         => get('/api/projects'),
  create: (data)   => post('/api/projects', data),
  update: (id, data) => patch(`/api/projects/${id}`, data),
  remove: (id)     => del(`/api/projects/${id}`),
};

// ─── Tasks ────────────────────────────────────────────────────────────────────

export const tasks = {
  list: ()         => get('/api/tasks'),
  create: (data)   => post('/api/tasks', data),
  update: (id, data) => patch(`/api/tasks/${id}`, data),
  remove: (id)     => del(`/api/tasks/${id}`),
};

// ─── Notes ────────────────────────────────────────────────────────────────────

export const notes = {
  get:  ()        => get('/api/notes'),
  save: (content) => put('/api/notes', { content }),
};

// ─── GitHub ───────────────────────────────────────────────────────────────────

export const github = {
  user:  (username) => get(`/api/github/user/${username}`),
  repos: (username) => get(`/api/github/repos/${username}`),
};

// ─── Chat ─────────────────────────────────────────────────────────────────────

export const chat = {
  send: (message) => post('/api/chat', { message }),
};
