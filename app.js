const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});

app.post("/register", (req, res) => {
  console.log(req.body);
});

app.post("/login", (req, res) => {
  console.log(req.body);
});
