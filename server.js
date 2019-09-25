express = require("express");
app = express();
app.use(express.json());

//Définition du port
const PORT = process.env.PORT || 3000

//Définition du root du serveur
app.get('/', function (req, res) {
    res.send('Hello World!');
  });

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
  });

/*
  Définition du chemin chat
  En fonction du message reçu, nous donne notre localisation
  ou bien le temps qu'il fait
  Nous demande ce que l'on veut si la variable msg est vide ou inexistante
*/
app.post('/chat', function (req, res) {
  var message = 'Que veux tu?';
  switch(req.body.msg){
    case 'ville':
      message = 'Nous sommes à Paris';
      break;
    case 'meteo':
      message = 'Il fait beau';
      break;
  }
  res.send(message);
  });

//Lancement du serveur node
app.listen(PORT, () => console.log("Listening on port http://localhost:" + PORT));