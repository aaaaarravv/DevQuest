const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

// ─── GET /api/notes ───────────────────────────────────────────────────────────

router.get('/', async (req, res) => {
  try {
    let row = await db.notes.findOne({ user_id: req.user.id });
    if (!row) {
      row = await db.notes.insert({
        user_id: req.user.id,
        content: '## Welcome to DevQuest\n\nWrite your thoughts here...',
        updated_at: new Date().toISOString(),
      });
    }
    res.json({ content: row.content, updated_at: row.updated_at });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// ─── PUT /api/notes ───────────────────────────────────────────────────────────

router.put('/', async (req, res) => {
  try {
    const { content } = req.body;
    if (content === undefined) {
      return res.status(400).json({ error: 'content is required' });
    }

    const now = new Date().toISOString();
    const existing = await db.notes.findOne({ user_id: req.user.id });

    if (existing) {
      await db.notes.update({ user_id: req.user.id }, { $set: { content, updated_at: now } });
    } else {
      await db.notes.insert({ user_id: req.user.id, content, updated_at: now });
    }

    res.json({ message: 'Notes saved', updated_at: now });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save notes' });
  }
});

module.exports = router;
