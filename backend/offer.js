const express = require("express")
const router = express.Router() 

const db = require('./firebase')
const admin = require('firebase-admin')
const productCollection = db.collection('Product');
const userCollection = db.collection('Users'); 

// POST endpoint to place an offer/bid endpoint
router.post('/place_offer', async (req, res) => {
    console.log("in the palce offer"); 
    try {
        // Extract data from request body
        const { userOneProductDocument, userTwoProductDocument } = req.body;

        // Update userOneProductDocument's "offering" array
        await productCollection.doc(userOneProductDocument).update({
            offering: admin.firestore.FieldValue.arrayUnion(productCollection.doc(userTwoProductDocument))
        });

        // Update userTwoProductDocument's "offered" array
        await productCollection.doc(userTwoProductDocument).update({
            offered: admin.firestore.FieldValue.arrayUnion(productCollection.doc(userOneProductDocument))
        });

        // Sample response
        res.status(200).json({ message: 'Offer placed successfully' });
    } catch (error) {
        console.error('Error placing offer:', error);
        res.status(500).json({ error: 'Internally server error' });
    }
});
  
// POST endpoint to accept an offer
router.post('/accept_offer', async (req, res) => {
    try {
        const { userOneEmail, userTwoEmail, userOneProductDocument, userTwoProductDocument } = req.body;

        // Set both documents' visibility status to false
        userOneProductDocument.visibilityStatus = false;
        userTwoProductDocument.visibilityStatus = false;

        // Create a transaction document
        const transactionRef = await firestore.collection('Transactions').doc(); 

        await transactionRef.set({
            date: new Date(),
            user1Ref: firestore.collection('Users').doc(userOneEmail),
            user2Ref: firestore.collection('Users').doc(userTwoEmail),
            product1Ref: firestore.collection('Products').doc(userOneProductDocument),
            product2Ref: firestore.collection('Products').doc(userTwoProductDocument),
        });

        await firestore.collection('Users').doc(userOneEmail).update({
            successfulTransactions: Firestore.FieldValue.arrayUnion(transactionRef)
        });

        await firestore.collection('Users').doc(userTwoEmail).update({
            successfulTransactions: Firestore.FieldValue.arrayUnion(transactionRef)
        });

        // Respond with the ID of the created transaction document
        res.status(200).json({ transactionId: transactionRef.id });
    } catch (error) {
        console.error('Error accepting offer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 