const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    desc: String,
    prix: { type: Number, required: true },
    imageUrl: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Produit', produitSchema);