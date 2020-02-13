const express = require("express");
const app = express();
const apiEndpoints = require("./apiEndpoints.js");

app.use(express.json());

//0: GET API endpoints
app.get("/", (req, res) => {
  res.send(apiEndpoints);
});

module.exports = app;
