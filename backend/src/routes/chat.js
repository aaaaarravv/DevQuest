const express = require('express');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

// ─── POST /api/chat ───────────────────────────────────────────────────────────
// If OPENAI_API_KEY is set, proxies to OpenAI chat completions.
// Otherwise returns a themed fallback response.

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  // ── Real AI path ────────────────────────────────────────────────────────────
  if (process.env.OPENAI_API_KEY) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are the Guild Assistant inside DevQuest, a gamified developer productivity app. ' +
                'You help developers with coding questions, project planning, and task management. ' +
                'Keep responses concise and use light RPG/quest-themed language when appropriate.',
            },
            { role: 'user', content: message },
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `OpenAI error ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'The oracle is silent...';
      return res.json({ reply });
    } catch (err) {
      console.error('OpenAI error:', err.message);
      // Fall through to mock response on error
    }
  }

  // ── Mock / fallback path ────────────────────────────────────────────────────
  const mockReplies = [
    "I am the Guild Assistant! Your quest for knowledge is admirable. Complete your tasks and gain XP!",
    "A wise developer once said: commit early, commit often. Your quests await!",
    "The path to mastery is paved with completed tasks. Keep pushing forward, hero!",
    "I sense great potential in you. Focus on your current quest and level up!",
    "Every bug you squash earns you XP. The realm grows stronger with your efforts!",
  ];

  const reply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
  res.json({ reply, mock: true });
});

module.exports = router;
