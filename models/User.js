const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional if Google
    googleId: String,
    role: { type: String, enum: ['marchand', 'client'], default: 'client' }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.index({ email: 1 }); // Perf

module.exports = mongoose.model('User', userSchema);