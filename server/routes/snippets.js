// server/routes/snippets.js
const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/snippets
// @desc    Create a new snippet
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, code, language, tags } = req.body;
    const newSnippet = new Snippet({
      title,
      code,
      language,
      tags,
      user: req.user.id,
    });
    const snippet = await newSnippet.save();
    res.json(snippet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/snippets
// @desc    Get all snippets for a user
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/snippets/:id
// @desc    Update a snippet
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { title, code, language, tags } = req.body;
        let snippet = await Snippet.findById(req.params.id);

        if (!snippet) return res.status(404).json({ msg: 'Snippet not found' });

        // Make sure user owns the snippet
        if (snippet.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        snippet = await Snippet.findByIdAndUpdate(
            req.params.id,
            { $set: { title, code, language, tags } },
            { new: true }
        );

        res.json(snippet);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/snippets/:id
// @desc    Delete a snippet
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        let snippet = await Snippet.findById(req.params.id);

        if (!snippet) return res.status(404).json({ msg: 'Snippet not found' });

        // Make sure user owns the snippet
        if (snippet.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Snippet.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Snippet removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;