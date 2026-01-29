const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(cors())
    .use('/', require('./routes/index.js'));


passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


app.get('/', (req, res) => {
    res.send(
        req.session.user
            ? `Logged in as ${req.session.user.displayName}`
            : 'Logged Out'
    );
});

app.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/'
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`App started on port ${port}`);
        });
    }
});
