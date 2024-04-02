const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user'); // Ensure this path is correct
const cors = require('cors');
const axios = require('axios'); // Import axios library

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Use it before all route definitions
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
async (accessToken, refreshToken, profile, cb) => {
  console.log("Google strategy executed...");
  try {
    let user = await User.findOne({ googleId: profile.id });
    console.log('Google profile received', profile);
    if (!user) {
      // If the user doesn't exist, create a new one
      console.log("New user is being created...");
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        username: profile.displayName,
        method: 'google'
      });
      console.log("New user created:", user);
    }
    return cb(null, user);
  } catch (err) {
    return cb(err, null);
  }
}
));

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user._id); // Add logging
  done(null, user._id); // Serialize user by MongoDB _id
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('Deserializing user:', id); // Add logging
    const user = await User.findById(id);
    done(null, user); // Successfully deserialized user
  } catch (err) {
    done(err, null); // Error occurred
  }
});


// Route to start the OAuth flow
app.get('/login',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {

  req.session.user = req.user;

  console.log("OAuth callback successful, redirecting to dashboard...");
  
  res.redirect('http://localhost:3001/dashboard');
});


// Logout route
app.get('/logout', (req, res) => {
  console.log("Logging out user...");
  req.logout((err) => {
      if (err) {
          console.error('Error logging out:', err);
          return res.status(500).send('Error logging out');
      }
      // Redirect to the homepage after logout
      res.redirect('http://localhost:3001/');
  });
});

// Node.js (Express) - Example endpoint to check user session
app.get('/api/auth/session', (req, res) => {
  if (req.user) { // Assuming req.user is set upon successful authentication
    res.json({ isAuthenticated: true, user: req.session.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
