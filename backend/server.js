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

// Authenticaton middleware
app.use((req, res, next) => {
  const fullToken = req.headers.authorization; 
  if (fullToken) {
    const splitToken = fullToken.split(' '); 
    if (splitToken[0] === 'Bearer') {
      admin.auth()
        .verifyIdToken(splitToken[1])
        .then(() => {
          next();
        })
        .catch(() => {
          res.status(403).send({ msg: "Could not authorize" });
        });
    } else {
      res.status(403).send({ msg: "Invalid token format" });
    }
  } else {
    res.status(403).send({ msg: "Authorization token missing" });
  }
});


// Endpoint to handle user signup requests
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Use Firebase Authentication to create a new user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Store additional user information in Firestore
    await userCollection.doc(email).set({
      email: email,
      // Add additional fields as needed (e.g., Snapchat, Instagram, phone number)
    });
    res.status(200).send({ success: "User signed up successfully." });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).send({ error: "Failed to sign up user." });
  }
});


app.get("/tasks", async (req, res) => {
  const snapshot = await productCollection.get();
  snapshot.forEach(doc => {
    const data = doc.data(); 
    console.log(data); 
  });
  res.send({success: "Success"}); 
});

app.post("/post", async (req, res) => {
  const result = await productCollection.add({
    "Image": 2, 
    "Monetary_Value": 1000000,
    "Product": "Whiteboard", 
    "User": "Shiv"
  });
  const returnJSON = {result}; 
  res.send(returnJSON); 
});

app.post("/update_profile_information", async(req, res) => {
  try {
    const reqBody = req.body; 
    const docRef = userCollection.doc(reqBody.Email); 
    const res = await docRef.update({Snapchat: reqBody.Snapchat, Instagram: reqBody.Instagram, PhoneNumber: reqBody.PhoneNumber}); 
  } catch(error) {
    console.error(error);
    res.status(500).send({ errorMessage: "Internal server error" });
  }
});

app.get("/profile_information/:id", async (req, res) => {
  const documentRef = userCollection.doc(req.params.id);
  const doc = await documentRef.get();
  if (!doc.exists) {
    res.status(404).send({ errorMessage: "User not found" });
  } else {
    res.status(200).send(doc.data());
  }
});

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
