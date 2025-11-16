const express = require('express');
const multer = require('multer');
const Produit = require('../models/Produit');
const auth = require('./auth-middleware'); // Assume simple auth
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Get all
router.get('/', async (req, res) => {
    try {
        const produits = await Produit.find().populate('userId', 'nom');
        res.json(produits);
    } catch (err) { res.status(500).json(err); }
});

// Post – Auth protected
router.post('/', auth, upload.single('photo'), async (req, res) => {
    try {
        const { titre, desc, prix } = req.body;
        const produit = new Produit({
            titre, desc, prix, imageUrl: `/uploads/${req.file.filename}`,
            userId: req.user.id
        });
        await produit.save();
        res.status(201).json(produit);
    } catch (err) { res.status(500).json(err); }
});

module.exports = router;