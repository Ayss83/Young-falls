//décide du set de clé à retourner selon le type d'environnement

if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
}
else
{
    module.exports = require('./dev');
}




//userprod
//youngfallsprodaccess