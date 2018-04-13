const express = require("express");
const path = require("path");
const autocomplete = require("./lib/autocomplete");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.get("/autocomplete", (req, res) => {
  res.json(autocomplete(req.query.q));
});

app.get("/search", (req, res) => {
  res.json(autocomplete(req.query.q));
});

module.exports = app;
