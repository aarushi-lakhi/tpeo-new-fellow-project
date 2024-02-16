const express = require("express");
require("dotenv").config();

const app = express();

const firebase = require("./firebase");
const db = require('./firebase')


const tasksCollection = db.collection('Product');


app.get("/tasks", async (req, res) => {
  console.log("Endpoint was called"); 
  const snapshot = await tasksCollection.get();
  snapshot.forEach(doc => {
    const data = doc.data(); 
    console.log(data); 
});
})

app.listen(4000, () => {
  console.log("Server running on port 4000");
});