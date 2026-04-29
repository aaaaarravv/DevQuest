const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const XP_MAP = { easy: 10, medium: 25, hard: 50 };

router.use(requireAuth);

// ─── GET /api/tasks ───────────────────────────────────────────────────────────

router.get('/', async (req, res) => {
  try {
    const tasks = await db.tasks.find({ user_id: req.user.id }).sort({ created_at: -1 });
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// ─── POST /api/tasks ──────────────────────────────────────────────────────────

router.post('/', async (req, res) => {
  try {
    const { title, difficulty = 'medium', project_id = null } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'title is required' });
    }
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(400).json({ error: 'difficulty must be easy, medium, or hard' });
    }

    const task = await db.tasks.insert({
      user_id: req.user.id,
      project_id,
      title: title.trim(),
      difficulty,
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// ─── PATCH /api/tasks/:id ─────────────────────────────────────────────────────

router.patch('/:id', async (req, res) => {
  try {
    const task = await db.tasks.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { title, difficulty, completed } = req.body;
    const updates = { updated_at: new Date().toISOString() };

    if (title !== undefined) updates.title = title;
    if (difficulty !== undefined) updates.difficulty = difficulty;
    if (completed !== undefined) updates.completed = Boolean(completed);

    // Award XP when task transitions from incomplete → complete
    const justCompleted = !task.completed && completed === true;
    let xpGained = 0;

    if (justCompleted) {
      xpGained = XP_MAP[task.difficulty] || 25;
      const user = await db.users.findOne({ _id: req.user.id });
      if (user) {
        let newXp = user.xp + xpGained;
        let newLevel = user.level;
        let nextLevelXp = user.next_level_xp;

        if (newXp >= nextLevelXp) {
          newLevel += 1;
          newXp -= nextLevelXp;
          nextLevelXp = Math.floor(nextLevelXp * 1.2);
        }

        await db.users.update(
          { _id: user._id },
          { $set: { xp: newXp, level: newLevel, next_level_xp: nextLevelXp } }
        );
      }
    }

    await db.tasks.update({ _id: req.params.id }, { $set: updates });
    const updated = await db.tasks.findOne({ _id: req.params.id });
    res.json({ task: updated, xpGained });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// ─── DELETE /api/tasks/:id ────────────────────────────────────────────────────

router.delete('/:id', async (req, res) => {
  try {
    const task = await db.tasks.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await db.tasks.remove({ _id: req.params.id });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
