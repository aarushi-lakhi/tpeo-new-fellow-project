const express = require("express")
const router = express.Router() 

const db = require('./firebase')
const admin = require('firebase-admin')
const productCollection = db.collection('Product');
const userCollection = db.collection('Users'); 

router.post("/upload_item_test", async (req, res) => {
    const {userEmail, description, size, clothingArticle, estimatedMonetaryValue, images} = req.body; 
    const newItemRef = productCollection.doc(); 
    const newItemId = newItemRef.id;

    const userEmailDoc = userCollection.doc(userEmail); 
    await newItemRef.set({
        userDocumentReference: userEmailDoc,
        description: description,
        size: size,
        clothingArticle: clothingArticle,
        estimatedMonetaryValue: estimatedMonetaryValue,
        clothingImages: images, 
        visibilityStatus: true,
        offering: [],
        offered: [], 
        id: newItemId, 
    })
    userEmailDoc.update({
        clothingImages: admin.firestore.FieldValue.arrayUnion(newItemRef)
    })
    res.status(200).send({success: "User signed up successfully."});
})

module.exports = router; 


/* 
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
*/ 