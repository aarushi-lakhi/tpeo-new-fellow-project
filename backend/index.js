const cors = require('cors'); 

const express = require("express");
const app = express();

app.use(cors({origin: '*'}));
app.options('*', cors()); // include before other routes

const filterRouter = require("./filter"); 
const inventoryRouter = require("./inventory")
const uploadItemTestRouter = require("./upload_item_test")
const userRouter = require("./user")
const offerRouter = require("./offer.js")
require("dotenv").config();



const db = require('./firebase')
const admin = require('firebase-admin');
// const cors = require('cors'); 

const productCollection = db.collection('Product');
const userCollection = db.collection('Users'); 

// app.use(cors()); 
// app.use(function(req, res, next) { 
//   res.header("Access-Control-Allow-Origin", "https://barter-buddies-frontend.vercel.app"); 
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
//   next(); 
// });
app.use(express.json());
app.use("/filter", filterRouter);
app.use("/inventory", inventoryRouter); 
app.use("/item", uploadItemTestRouter); 
app.use("/user", userRouter); 
app.use("/offer", offerRouter)

// Authenticaton middleware - Not Curently active because all app.use(router) are above this function
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

app.listen(4000, () => {
  console.log("Server running on port 4000");
});




/* 

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
*/ 


/*
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


*/

/* 

// POST endpoint to upload an item
app.post("/upload_item", async (req, res) => {
  try {
    const { userEmail, description, size, clothingArticle, estimatedMonetaryValue, images } = req.body;

    // Create a new item document in the database
    const newItemRef = await productCollection.add({
      userDocumentReference: userEmail,
      description: description,
      size: size,
      clothingArticle: clothingArticle,
      estimatedMonetaryValue: estimatedMonetaryValue,
      clothingImages: images, // Store image URLs in the database
      visibilityStatus: true,
      offering: [],
      offered: []
    });

    // Get the ID of the newly created item
    const newItemId = newItemRef.id;

    // Update the user's clothingItems field
    await userCollection.doc(userEmail).update({
      clothingItems: admin.firestore.FieldValue.arrayUnion(newItemRef) // Push the product ID
    });

    console.log("Item uploaded!! ", newItemId);

    res.status(200).send({ success: "Item uploaded successfully." });
  } catch (error) {
    console.error("Error uploading item:", error);
    res.status(500).send({ error: "Failed to upload item." });
  }
});

*/