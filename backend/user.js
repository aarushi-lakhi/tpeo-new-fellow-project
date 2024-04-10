const express = require("express")
const router = express.Router() 

const db = require('./firebase')
const admin = require('firebase-admin')
const productCollection = db.collection('Product');
const userCollection = db.collection('Users'); 

// POST endpoint to create a new user
router.post("/create_user", async (req, res) => {
    try {
        const { userEmail, userName } = req.body;

        // Create a new user document in the Users collection
        await userCollection.doc(userEmail).set({
            email: userEmail,
            name: userName,
            instagram: "",
            snapchat: "",
            phoneNumber: "",
            clothingItems: [],
            successfulTransactions: [],
            profilePicture: "",
            location1: "",
            location2: "",
            location3: ""
        });
        res.status(200).send({ success: "User created successfully." });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ error: "Failed to create user." });
    }
});
  
// POST endpoint to update user information in profile
router.post("/update_user_information", async (req, res) => {
    try {
        const { userEmail, userInstagram, userPhoneNumber, userSnapchat, userProfilePicture, userLocation1, userLocation2, userLocation3 } = req.body;
        
        // Update the user document with the provided information
        await userCollection.doc(userEmail).update({
            instagram: userInstagram,
            snapchat: userSnapchat,
            phoneNumber: userPhoneNumber,
            profilePicture: userProfilePicture,
            location1: userLocation1,
            location2: userLocation2,
            location3: userLocation3
        });

        res.status(200).send({ success: "User information updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ errorMessage: "Internal server error" });
    }
});

module.exports = router 