

module.exports = {
    connectToMongoDB : async function (connectionUrl, databaseName) {
        const MongoClient = require('mongodb').MongoClient;
        // Connection URL
        const url = connectionUrl;
        // Database Name
        const dbName = databaseName;
        const client = new MongoClient(url);
      
        try {
          // Use connect method to connect to the Server
          await client.connect();
          const db = client.db(dbName);
          return db;
        } catch (err) {
          console.log(err.stack);
        }
      
        client.close();
        console.log("pasbien");
      },
    insertMessage : (database, sender, message) => {
        var col = database.collection("messages");
        col.insertOne({from: sender, msg: message});
    },
    listAllmessages : async (database) => {
      var col = database.collection("messages");
      return col.find().toArray();
    },
    suppressLastMessage: async (database) => {
      var element = database.collection("messages").find().toArray();
      myList = await element;
      if(myList.length > 0){
        await database.collection("messages").deleteOne({"_id" : myList[myList.length - 1]._id});
      }
    }
}