const express = require("express");
require("dotenv").config();

const app = express();

const db = require('./firebase')
const admin = require('firebase-admin');
const cors = require('cors'); 


const tasksCollection = db.collection('Product');

app.use(cors()); 

// Authenticaton middelware
app.use((req, res, next) => {
  const fullToken = req.headers.authorization; 
  const splitToken = fullToken.split(' '); 
  console.log("LOGGGED"); 
  if(fullToken && splitToken[0] === 'Bearer') {
      admin.auth()
      .verifyIdToken(splitToken[1])
      .then(() => {
        console.log("Verification Successful"); 
        next();
      })
      .catch(() => {
        console.log("There was an error"); 
        res.status(403).send({ msg: "Could not authorize" });
      });
  }
})

app.get("/tasks", async (req, res) => {
  console.log("Endpoint was called"); 
  const snapshot = await tasksCollection.get();
  snapshot.forEach(doc => {
    const data = doc.data(); 
    console.log(data); 
});
})

app.post("/post", async (req, res) => {
  console.log("WE are in post"); 
  const result = await tasksCollection.add({
    "Image": 2, 
    "Monetary_Value": 1000000,
    "Product": "Whiteboard", 
    "User": "Shiv"
  });
  const returnJSON = {result}; 
  res.send(returnJSON); 
})

app.listen(4000, () => {
  console.log("Server running on port 4000");
});