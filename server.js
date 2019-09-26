express = require("express");
mongo = require("./dbConnect");
app = express();
app.use(express.json());

//Définition du port
const PORT = process.env.PORT || 3000

var database = mongo.connectToMongoDB("mongodb://localhost:27017/", "chat-bot");

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
  if (req.body.msg)
    mongo.insertMessage(database, "user", req.body.msg);
  var message = 'Que veux tu?';
  switch(req.body.msg){
    case 'ville':
      message = 'Nous sommes à Paris';
      break;
    case 'meteo':
      message = 'Il fait beau';
      break;
    case 'demain':
      message = 'Demain: Mercredi';
      break;
  }
  mongo.insertMessage(database, "bot", message);
  res.send(message);
  });

app.get('/messages/all', async (req, res) => {
    result = await mongo.listAllmessages(database);
    res.send(result);
});

app.delete('/messages/last', (req, res) => {
  mongo.suppressLastMessage(database);
  res.send('supprimé');
})

//Lancement du serveur node
database.then(
  (res) => {
    database = res
    app.listen(PORT, () => console.log("Listening on port http://localhost:" + PORT));
  });
