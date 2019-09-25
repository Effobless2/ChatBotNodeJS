express = require("express");
app = express();

//Définition du port
const PORT = process.env.PORT || 3000

//Définition du root du serveur
app.get('/', function (req, res) {
    res.send('Hello World!');
  })

/* 
  Définition du chemin hello
  Nous dit bonjour si on a spécifié notre <nom>
  nous le demande sinon
*/
app.get('/hello', function (req, res) {
    if (!req.query.nom)
      res.send('Quel est votre nom ?');
    else
      res.send('Bonjour, ' + req.query.nom);
  })

//Lancement du serveur node
app.listen(PORT, () => console.log("Listening on port http://localhost:" + PORT));