//@ts-nocheck

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});
const urlDatabase = {};
let nextShortUrlId = 1;
// Your first API endpoint
app.post("/api/shorturl", function (req, res) {
  const originalUrl = req.body.url;
  console.log(req.body);
  const shortUrl = nextShortUrlId.toString();
  urlDatabase[shortUrl] = originalUrl;

  nextShortUrlId++;

  res.json({ original_url: req.body.url, short_url: shortUrl });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
