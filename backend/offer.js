const express = require("express")
const router = express.Router() 

const db = require('./firebase')
const admin = require('firebase-admin')
const productCollection = db.collection('Product');
const userCollection = db.collection('Users'); 
const transactionsCollection = db.collection('Transactions'); 


// POST endpoint to place an offer/bid endpoint
router.post('/place_offer', async (req, res) => {
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
        var { userOneEmail, userTwoEmail, userOneProductDocument, userTwoProductDocument} = req.body;
        userOneProductDocument = productCollection.doc(userOneProductDocument); 
        userTwoProductDocument = productCollection.doc(userTwoProductDocument); 

        // Set both documents' visibility status to false
        await userOneProductDocument.update({
            visibilityStatus: false 
        })
        await userTwoProductDocument.update({
            visibilityStatus: false 
        })

        // Create a transaction document
        const transactionRef = await transactionsCollection.doc(); 

        await transactionRef.set({
            date: new Date(),
            user1Ref: userCollection.doc(userOneEmail),
            user2Ref: userCollection.doc(userTwoEmail),
            product1Ref: userOneProductDocument,
            product2Ref: userTwoProductDocument,
        });

        await userCollection.doc(userOneEmail).update({
            successfulTransactions: admin.firestore.FieldValue.arrayUnion(transactionRef)
        });

        await userCollection.doc(userTwoEmail).update({
            successfulTransactions: admin.firestore.FieldValue.arrayUnion(transactionRef)
        });

        // Respond with the ID of the created transaction document
        res.status(200).json({ transactionId: transactionRef.id });
    } catch (error) {
        console.error('Error accepting offer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/reverse_offer", async (req, res) => {
    try {
        const {theirItemProductID, yourItemProductID} = req.body;

        const theirReference = await productCollection.doc(theirItemProductID); 
        const yourReference = await productCollection.doc(yourItemProductID); 

        // Update userOneProductDocument's "offering" array
        await yourReference.update({
            offering: admin.firestore.FieldValue.arrayRemove(theirReference) 
        });

        // Update userTwoProductDocument's "offered" array
        await theirReference.update({
            offered: admin.firestore.FieldValue.arrayRemove(yourReference)
        });

        // Sample response
        res.status(200).json({ message: 'Offer Removed placed successfully' });
    } catch (error) {
        console.error('Error placing offer:', error);
        res.status(500).json({ error: 'Internally server error' });
    }

}); 

module.exports = router; 