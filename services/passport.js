const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

//génération de données d'identification à placer dans un token
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//récupération des informations d'un token pour retrouver un utilisateur en base de données
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => 
        done(null, user)
    );
});

//Méthode d'authentification en utilisant le module passport js et google+ api
passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if(existingUser) {
                done(null, existingUser);
            }
            else
            {
                new User({googleId: profile.id})
                .save()
                .then(user => done(null, user));
            }
        });
    })
);