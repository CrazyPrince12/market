const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    // Find/create user async
    const User = require('../models/User');
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
        user = new User({ googleId: profile.id, nom: profile.displayName, email: profile.emails[0].value, role: 'client' });
        await user.save();
    }
    done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const User = require('../models/User');
    const user = await User.findById(id);
    done(null, user);
});

module.exports = passport;