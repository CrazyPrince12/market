const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.post('/messages', async (req, res) => {
    try {
        const { fromId, toId, text } = req.body;
        const msg = new Message({ fromId, toId, text, timestamp: new Date() });
        await msg.save();
        res.status(201).json(msg);
    } catch (err) { res.status(500).json(err); }
});

module.exports = router;