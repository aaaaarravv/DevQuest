const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

// ─── GET /api/projects ────────────────────────────────────────────────────────

router.get('/', async (req, res) => {
  try {
    const projects = await db.projects.find({ user_id: req.user.id }).sort({ created_at: -1 });
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// ─── POST /api/projects ───────────────────────────────────────────────────────

router.post('/', async (req, res) => {
  try {
    const { title, description = '', theme = 'space', tech_stack = '', days = 7 } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'title is required' });
    }

    const project = await db.projects.insert({
      user_id: req.user.id,
      title: title.trim(),
      description,
      theme,
      tech_stack,
      days,
      progress: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    res.status(201).json({ project });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// ─── PATCH /api/projects/:id ──────────────────────────────────────────────────

router.patch('/:id', async (req, res) => {
  try {
    const project = await db.projects.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const { title, description, theme, tech_stack, days, progress } = req.body;
    const updates = { updated_at: new Date().toISOString() };

    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (theme !== undefined) updates.theme = theme;
    if (tech_stack !== undefined) updates.tech_stack = tech_stack;
    if (days !== undefined) updates.days = days;
    if (progress !== undefined) updates.progress = progress;

    await db.projects.update({ _id: req.params.id }, { $set: updates });
    const updated = await db.projects.findOne({ _id: req.params.id });
    res.json({ project: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// ─── DELETE /api/projects/:id ─────────────────────────────────────────────────

router.delete('/:id', async (req, res) => {
  try {
    const project = await db.projects.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    await db.projects.remove({ _id: req.params.id });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
