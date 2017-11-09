const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//auto exécution de la fonction retournée
require('./routes/authRoutes')(app);

//choix dynamique du port d'écoute selon l'environnement d'execution
const PORT = process.env.PORT || 5000;
app.listen(PORT);