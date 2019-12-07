// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const ogs = require("open-graph-scraper");

app.use(cors());

app.get("/", (req, res) => {
  const url = req.param("url");

  if (!url) {
    res.status(400).send("No URL provided");
  }

  const options = {
    url,
    timeout: process.env.TIMEOUT || 20000
  };

  ogs(options, (err, res) => {
    console.log("error:", err); // This is returns true or false. True if there was a error. The error it self is inside the results object.
    console.log("results:", res);

    if (err) res.status(400).send(err);
    if (!err && res) res.status(200).send(res);
  });
});

app.listen(port, () => {
  console.log("Our app is running on http://localhost:" + port);
});
