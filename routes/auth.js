const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('../config/googleAuth');
const User = require('../models/User');
const router = express.Router();

// Register async
router.post('/register', async (req, res) => {
    try {
        const { nom, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 12); // 2025 salt
        const user = new User({ nom, email, password: hashed, role: 'marchand' }); // Default marchand?
        await user.save();
        res.status(201).json({ msg: 'Compte créé – Welcome, boss!' });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ error: 'Email pris' });
        res.status(500).json({ error: 'Reg fail' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body; // username or email
        const user = await User.findOne({ $or: [{ nom: username }, { email: username }] });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Creds invalides' });
        }
        // JWT or session – Simple redirect for now
        req.login(user, (err) => { if (err) return res.status(500).json(err); });
        res.json({ msg: 'Logged in', redirect: user.role === 'marchand' ? '/espace-marchand.html' : '/espace-client.html' });
    } catch (err) { res.status(500).json({ error: 'Login fail' }); }
});

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect(req.user.role === 'marchand' ? '/espace-marchand.html' : '/espace-client.html');
});

module.exports = router;