const express = require('express');
const mongoose = require('mongoose'); //middleware base de données mongoDB
const cookieSession = require('cookie-session'); //gestion de token de session
const passport = require('passport'); //package de gestion d'authentification
const keys = require('./config/keys'); //centralisation des infos

require('./models/User'); //modèle d'objet pour le middleware
require('./services/passport'); //configuration de la méthode d'authentification

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());

app.use(passport.session());

//auto exécution de la fonction retournée par routes/authRoutes.js
require('./routes/authRoutes')(app);

//choix dynamique du port d'écoute selon l'environnement d'execution
const PORT = process.env.PORT || 5000;
app.listen(PORT);