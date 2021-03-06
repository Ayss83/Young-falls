const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        //Recherche d'un googleId dans la db correspondant à l'id du profil envoyé par la requête
        const existingUser = await User.findOne({ googleId: profile.id })
        
        if(existingUser) {
            //la correspondance a été trouvé, l'utilisateur est déjà en db et retourné
            done(null, existingUser);
        }
        else
        {
            //pas de correspondance, c'est un nouvel utilisateur, on le sauvegarde en db
            const user = await new User({googleId: profile.id}).save()
            
            done(null, user);
        }
    })
);

//transposition de la méthode d'identification google pour facebook
passport.use(new FacebookStrategy(
    {
        clientID: keys.FacebookClientID,
        clientSecret: keys.FacebookClientSecret,
        callbackURL: '/auth/facebook/callback',
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ facebookId: profile.id })
        
        if(existingUser) {
            done(null, existingUser);
        }
        else
        {
            const user = await new User({facebookId: profile.id}).save();

            done(null, user);
        }
    })
)
