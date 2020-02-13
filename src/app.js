const express = require("express");
const app = express();
const apiEndpoints = require("./apiEndpoints.js");
const companyRouter = require("./routes/companies.route.js");

app.use(express.json());
app.use("/companies", companyRouter);

//0: GET API endpoints
app.get("/", (req, res) => {
  res.send(apiEndpoints);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  console.log(err);
  if (err.statusCode) {
    res.send({ error: err.message });
  } else {
    res.send({ error: "internal server error" });
  }
});

module.exports = app;
