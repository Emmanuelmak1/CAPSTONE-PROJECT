const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user'); // Ensure this path is correct
const cors = require('cors');




mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET, // Ensure you have SESSION_SECRET in your .env
    resave: false,
    saveUninitialized: true,
}));

// Use it before all route definitions
app.use(cors({
  origin: 'http://localhost:3001', // Allow the frontend to make requests
  credentials: true, // Allow cookies to be sent across origins
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
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        // If the user doesn't exist, create a new one
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
          // Add other profile fields as necessary
          method: 'google'
        });
      }
      return cb(null, user);
    } catch (err) {
      return cb(err, null);
    }
  }
));

passport.use(new LocalStrategy(
    { usernameField: 'email' }, // Assuming you use email to log in
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));


passport.serializeUser((user, done) => {
  done(null, user._id); // Serialize user by MongoDB _id
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user); // Successfully deserialized user
    } catch (err) {
      done(err, null); // Error occurred
    }
  });
  


// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route to start the OAuth flow
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { // Passport adds isAuthenticated() to the request object
      return next();
    }
    res.redirect('/login'); // Redirect unauthenticated requests to the login page
  }
  
  // Then use the middleware on routes that require authentication
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.send(`Welcome to your dashboard, ${req.user.displayName}!`);
});
  
// Handle GET requests to /signup
app.get('/signup', (req, res) => {
  res.send('Signup page'); // Placeholder: replace with actual signup page rendering
});

// Route for user signup
app.post('/signup', async (req, res) => {
    try {
      const { username, email, password, method = 'local' } = req.body; // Default method to 'local'
      const user = await User.create({ username, email, password, method });
      res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(400).json({ message: 'Error creating user', error: err });
    }
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get('/login', (req, res) => {
    // Render your login page here
    res.send('Login page'); // Placeholder: replace with actual page rendering
  });
  

app.get('/logout', (req, res) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.session.destroy(() => {
        res.redirect('/'); // Ensure the session is destroyed before redirecting
      });
    });
  });

app.get('/profile', ensureAuthenticated, (req, res) => {
  res.json(req.user); // Send back user details
});

  
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
