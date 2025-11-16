// Auth guard 2025: Passport session check, trash unauthorized
const passport = require('passport'); // Assume initialized in server.js

function requireAuth(req, res, next) {
  if (req.isAuthenticated()) { // From passport.session()
    return next();
  }
  res.status(401).json({ error: "Accès refusé, connecte-toi d'abord, boss ! 🔒" });
}

module.exports = requireAuth;
