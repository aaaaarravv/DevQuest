const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// ─── Helpers ──────────────────────────────────────────────────────────────────

function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function safeUser(user) {
  const { password, ...rest } = user;
  return rest;
}

// ─── POST /api/auth/register ──────────────────────────────────────────────────

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, character_class = 'warrior' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = await db.users.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'An account with that email already exists' });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await db.users.insert({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashed,
      character_class,
      level: 1,
      xp: 0,
      next_level_xp: 1000,
      has_claimed_daily: false,
      daily_claimed_at: null,
      created_at: new Date().toISOString(),
    });

    // Create default notes for this user
    await db.notes.insert({
      user_id: user._id,
      content: '## Welcome to DevQuest\n\nWrite your thoughts here...',
      updated_at: new Date().toISOString(),
    });

    const token = signToken(user);
    res.status(201).json({ token, user: safeUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await db.users.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Ensure notes row exists
    const notes = await db.notes.findOne({ user_id: user._id });
    if (!notes) {
      await db.notes.insert({
        user_id: user._id,
        content: '## Welcome to DevQuest\n\nWrite your thoughts here...',
        updated_at: new Date().toISOString(),
      });
    }

    const token = signToken(user);
    res.json({ token, user: safeUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────

router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await db.users.findOne({ _id: req.user.id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: safeUser(user) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ─── POST /api/auth/daily ─────────────────────────────────────────────────────
// Claim the daily XP reward (50 XP, once per calendar day)

router.post('/daily', requireAuth, async (req, res) => {
  try {
    const user = await db.users.findOne({ _id: req.user.id });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const today = new Date().toISOString().slice(0, 10);
    const lastClaimed = user.daily_claimed_at ? user.daily_claimed_at.slice(0, 10) : null;

    if (lastClaimed === today) {
      return res.status(409).json({ error: 'Daily reward already claimed today' });
    }

    const XP_REWARD = 50;
    let newXp = user.xp + XP_REWARD;
    let newLevel = user.level;
    let nextLevelXp = user.next_level_xp;

    if (newXp >= nextLevelXp) {
      newLevel += 1;
      newXp -= nextLevelXp;
      nextLevelXp = Math.floor(nextLevelXp * 1.2);
    }

    await db.users.update(
      { _id: user._id },
      { $set: { xp: newXp, level: newLevel, next_level_xp: nextLevelXp, has_claimed_daily: true, daily_claimed_at: new Date().toISOString() } }
    );

    const updated = await db.users.findOne({ _id: user._id });
    res.json({ user: safeUser(updated), xpGained: XP_REWARD });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to claim daily reward' });
  }
});

module.exports = router;
