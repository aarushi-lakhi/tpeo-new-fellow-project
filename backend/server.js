const express = require("express");
require("dotenv").config();

const app = express();

const db = require('./firebase')
const admin = require('firebase-admin');
const cors = require('cors'); 

const productCollection = db.collection('Product');
const userCollection = db.collection('Users'); 

app.use(cors()); 
app.use(express.json());



// Authenticaton middelware
app.use((req, res, next) => {
  const fullToken = req.headers.authorization; 
  const splitToken = fullToken.split(' '); 
  // console.log("LOGGGED"); 
  if(fullToken && splitToken[0] === 'Bearer') {
      admin.auth()
      .verifyIdToken(splitToken[1])
      .then(() => {
        // console.log("Verification Successful"); 
        next();
      })
      .catch(() => {
        // console.log("There was an error"); 
        res.status(403).send({ msg: "Could not authorize" });
      });
  }
})

app.get("/tasks", async (req, res) => {
  // console.log("Endpoint was called"); 
  const snapshot = await productCollection.get();
  snapshot.forEach(doc => {
    const data = doc.data(); 
    console.log(data); 
  });
  res.send({success: "Success"}); 
})

app.post("/post", async (req, res) => {
  // console.log("WE are in post"); 
  const result = await productCollection.add({
    "Image": 2, 
    "Monetary_Value": 1000000,
    "Product": "Whiteboard", 
    "User": "Shiv"
  });
  const returnJSON = {result}; 
  res.send(returnJSON); 
})

app.post("/update_profile_information", async(req, res) => {
  try {
    const reqBody = req.body; 
    // console.log(reqBody.Email); 
    const docRef = userCollection.doc(reqBody.Email); 
    const res = await docRef.update({Snapchat: reqBody.Snapchat, Instagram: reqBody.Instagram, PhoneNumber: reqBody.PhoneNumber}); 
  } catch(error) {
    // console.log(error.errorMessage);
  }
})

app.get("/profile_information/:id", async (req, res) => {
  const documentRef = userCollection.doc(req.params.id);
  const doc = await documentRef.get();
  if (!doc.exists) {
    res.status(403).send({errorMessage: "Invalid ID"});
  } else {
    res.status(200).send(doc.data());
  }
})

// POST endpoint to upload an item
app.post("/upload_item", async (req, res) => {
  try {
    const { description, size, clothingArticle, estimatedMonetaryValue, images } = req.body;

    // Upload images to storage and get their URLs
    const imageUrls = [];
    for (const image of images) {
      const imageRef = storage.ref().child(`images/${image.name}`);
      await imageRef.put(image);
      const imageUrl = await imageRef.getDownloadURL();
      imageUrls.push(imageUrl);
    }

    // Create a new item document in the database
    await productCollection.add({
      description,
      size,
      clothingArticle,
      estimatedMonetaryValue,
      images: imageUrls, // Store image URLs in the database
      visibilityStatus: 1,
      offering: [],
      offered: []
    });

    res.status(200).send({ success: "Item uploaded successfully." });
  } catch (error) {
    console.error("Error uploading item:", error);
    res.status(500).send({ error: "Failed to upload item." });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});