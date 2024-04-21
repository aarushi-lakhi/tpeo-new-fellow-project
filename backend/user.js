const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./firebase');
const admin = require('firebase-admin');
const productCollection = db.collection('Product');
const userCollection = db.collection('Users');

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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
        }, { merge: true });

        res.status(200).send({ success: "User information updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ errorMessage: "Internal server error" });
    }
});

// Fetch profile information endpoint
router.get('/profile_information/:email', async (req, res) => {
    try {
        const email = req.params.email;

        // Fetch user information from Firestore
        const userDoc = await firestore.collection('users').doc(email).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = userDoc.data();
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST endpoint to upload image
router.post("/upload_image", async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const image = req.files.image;
        const fileName = `${uuidv4()}_${image.name}`;

        const filePath = path.join(__dirname, '../public/uploads/', fileName);

        image.mv(filePath, async (err) => {
            if (err) {
                return res.status(500).send(err);
            }

            // Need to store the file path or URL in the database
            // Below sends back the URL
            const url = `http://localhost:4000/uploads/${fileName}`;
            res.status(200).json({ url });
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).send({ error: "Failed to upload image." });
    }
});


module.exports = router 