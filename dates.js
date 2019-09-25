const MongoClient = require('mongodb').MongoClient;

var connectionString = 'mongodb://localhost:27017/';
var database = "test";
connectoToMongoDB = async function(connectionUrl, databaseName) {
  // Connection URL
  const url = connectionUrl;
  // Database Name
  const dbName = databaseName;
  const client = new MongoClient(url);

  try {
    // Use connect method to connect to the Server
    await client.connect();
    const db = client.db(dbName);

    var col = db.collection("dates");
    col.insertOne({ date : new Date() });
    var cursor = col.find();
    while (await cursor.hasNext()){
        console.log(await cursor.next());
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

connectoToMongoDB(connectionString, database);