// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const ogs = require("open-graph-scraper");

dotenv.config();
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const { url } = req.query;

  console.log(req.query)

  if (!url) {
    res.send("No URL provided");
  }

  const options = {
    url,
    timeout: process.env.TIMEOUT || 20000
  };

  ogs(options, (err, result) => {
    console.log("error:", err); // This is returns true or false. True if there was a error. The error it self is inside the results object.
    console.log("results:", result);

    if (err) res.send(result.error);
    if (!err && result) res.send(result);
  });
});

app.listen(port, () => {
  console.log("Our app is running on http://localhost:" + port);
});
