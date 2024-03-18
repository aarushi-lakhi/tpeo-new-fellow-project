const express = require("express");
const router = require("./filter"); 
const inventoryRouter = require("./inventory")
require("dotenv").config();

const app = express();

const db = require('./firebase')
const admin = require('firebase-admin');
const cors = require('cors'); 

const productCollection = db.collection('Product');
const userCollection = db.collection('Users'); 

app.use(cors()); 
app.use(express.json());
app.use("/", router);
app.use("/", inventoryRouter); 


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

app.get("/profile_information/:id", async (req, res) => {
  const documentRef = userCollection.doc(req.params.id);
  const doc = await documentRef.get();
  if (!doc.exists) {
    res.status(404).send({ errorMessage: "User not found" });
  } else {
    res.status(200).send(doc.data());
  }
});

// POST endpoint to update user information in profile
app.post("/update_user_information", async (req, res) => {
  try {
    const { userEmail, userInstagram, userPhoneNumber, userSnapchat, userProfilePicture } = req.body;
    
    // TODO: make sure userEmail is the identifier for the user document
    const docRef = userCollection.doc(userEmail);

    // Update the user document with the provided information
    await docRef.update({
      Snapchat: userSnapchat,
      Instagram: userInstagram,
      PhoneNumber: userPhoneNumber,
      // UserProfilePicture: userProfilePicture
    });

    res.status(200).send({ success: "User information updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "Internal server error" });
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
      visibilityStatus: true,
      offering: [],
      offered: []
    });

    res.status(200).send({ success: "Item uploaded successfully." });
  } catch (error) {
    console.error("Error uploading item:", error);
    res.status(500).send({ error: "Failed to upload item." });
  }
});

// Placing an offer/bid and Accepting an offer/bid

// TODO: remove sample datas and call product documents associated with a user
// Sample data to simulate database
// Sample userOneProductDocument
let userOneProductDocument = {
  id: 1,
  offering: []
};
// Sample userTwoProductDocument
let userTwoProductDocument = {
  id: 2,
  offered: []
};

// POST endpoint to place an offer/bid endpoint
app.post('/place_offer', async (req, res) => {
  try {
    // Extract data from request body
    const { userOneProductDocument, userTwoProductDocument } = req.body;

    // Update userOneProductDocument's "offering" array
    //userOneProductDocument.offering.push(userTwoProductDocument.id);
    await firestore.doc(userOneProductDocument).update({
      offering: Firestore.FieldValue.arrayUnion(userTwoProductDocument)
    });

    // Update userTwoProductDocument's "offered" array
    // userTwoProductDocument.offered.push(userOneProductDocument.id);
    await firestore.doc(userTwoProductDocument).update({
      offered: Firestore.FieldValue.arrayUnion(userOneProductDocument)
    });

    // Create a transaction document
    const transactionRef = await firestore.collection('transactions').add({
      date: new Date(),
      user1Ref: firestore.doc(userOneProductDocument),
      user2Ref: firestore.doc(userTwoProductDocument),
      product1Ref: firestore.doc(userOneProductDocument),
      product2Ref: firestore.doc(userTwoProductDocument),
    });

    // Sample response
    res.status(200).json({ message: 'Offer placed successfully' });
  } catch (error) {
    console.error('Error placing offer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST endpoint to accept an offer
app.post('/accept_offer', async (req, res) => {
  try {
    const { userOneEmail, userTwoEmail, userOneProductDocument, userTwoProductDocument } = req.body;

    // Set both documents' visibility status to false
    userOneProductDocument.visibilityStatus = false;
    userTwoProductDocument.visibilityStatus = false;

    // Create a transaction document
    const transactionRef = await firestore.collection('transactions').add({
      date: new Date(),
      user1Ref: firestore.collection('Users').doc(userOneEmail),
      user2Ref: firestore.collection('Users').doc(userTwoEmail),
      product1Ref: firestore.collection('Products').doc(userOneProductDocument),
      product2Ref: firestore.collection('Products').doc(userTwoProductDocument),
    });

    // Respond with the ID of the created transaction document
    res.status(200).json({ transactionId: transactionRef.id });
  } catch (error) {
    console.error('Error accepting offer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(4000, () => {
  console.log("Server running on port 4000");
});