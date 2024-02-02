const express = require("express");
require("dotenv").config();

const app = express();

const firebase = require("./firebase");
const db = firebase.firestore;

app.listen(4000, () => {
  console.log("Server running on port 4000");
});