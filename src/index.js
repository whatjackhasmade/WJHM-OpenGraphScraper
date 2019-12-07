// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const ogs = require("open-graph-scraper");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());

app.get("/", (req, res) => {
  res.send("This is a basic express app to return Open Graph meta information");
});

app.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.sendStatus(400);
    throw Error("No URL provided");
  }

  const options = {
    url,
    timeout: 20000
  };

  ogs(options, (err, res) => {
    console.log("error:", err); // This is returns true or false. True if there was a error. The error it self is inside the results object.
    console.log("results:", res);

    if (!err) {
      res.sendStatus(400);
      throw Error(err);
    }

    if (!err && res) {
      res.sendStatus(200);
      res.send(res);
    }
  });
});

app.listen(port, () => {
  console.log("Our app is running on http://localhost:" + port);
});
