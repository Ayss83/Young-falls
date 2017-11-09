const express = require('express');
require('./services/passport');

const app = express();

//auto exécution de la fonction retournée
require('./routes/authRoutes')(app);

//choix dynamique du port d'écoute selon l'environnement d'execution
const PORT = process.env.PORT || 5000;
app.listen(PORT);