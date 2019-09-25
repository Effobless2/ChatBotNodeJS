express = require("express");
app = express();

const PORT = process.env.PORT || 3000
app.get('/', function (req, res) {
    res.send('Hello World!')
  })
app.listen(PORT, () => console.log("Listening on port http://localhost:" + PORT));