express = require("express");
app = express();
app.get('/', function (req, res) {
    res.send('Hello World!')
  })
app.listen(8080, () => console.log("Listening on port http://localhost:8080"));