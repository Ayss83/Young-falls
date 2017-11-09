const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

//choix dynamique du port d'écoute selon l'environnement d'execution
const PORT = process.env.PORT || 5000;
app.listen(PORT);