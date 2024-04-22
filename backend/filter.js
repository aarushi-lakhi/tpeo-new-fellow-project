const express = require("express")
const router = express.Router() 
const {getDoc} = require('firebase/firestore');


const db = require('./firebase')
const productCollection = db.collection('Product');
const userCollection = db.collection('Users'); 
// const cors = require('cors'); 

// app.use(cors({origin: '*'}));


router.get("/find_items/:userEmail/:userSizes/:userClothingArticle/:gender", async (req, res) => {

    res.set('Access-Control-Allow-Origin', '*');

    // Extract Request Body 
    const userEmail = req.params.userEmail;
    const userSizes = ((req.params.userSizes) || "").split(',');
    if(userSizes.length === 0) {
        userSizes = ["XS", "S", "M", "L", "XL"]; 
    }
    const userClothingArticle = req.params.userClothingArticle; 
    const userGenders = ((req.params.gender) || "").split(','); 
    if(userGenders.length === 0) {
        userGenders = ["Male", "Female", "Unisex"]; 
    }

    const return_documents = [];
    const product_collection_all_documents = []; 

    // Get all documents in product collection
    const product_collection_documents = await productCollection.get(); 

    // Extract all the documents in product collection and save them in "product_collection_all_documents"
    product_collection_documents.forEach((doc) => {
        product_collection_all_documents.push(doc); 
    })

    // Find documents with matching tags and add json to "return_documents"
    for(doc of product_collection_all_documents) {
        // Get relevant fields from each document 
        const {userDocumentReference, size, clothingArticle, visibilityStatus, gender} = doc.data();  

        // Get Corresponding User Document
        const docSnapshot = await (userDocumentReference.get());
        const {Email} = docSnapshot.data(); 

        // const userReferenceDoc = await userDocumentReference.get(); 
        // const {Email} = userReferenceDoc.data(); 

        if(visibilityStatus && userEmail !== Email) {
            var sizeCheck = false; 
            var genderCheck = false; 
            
            for(let i = 0; i < userSizes.length; i++) {
                if(userSizes[i] === size) {
                    sizeCheck = true; 
                    break; 
                }
            }
            for(let i = 0; i < userGenders.length; i++) {
                if(userGenders[i] === gender) {
                    genderCheck = true; 
                    break; 
                }
            }
            if(sizeCheck && clothingArticle === userClothingArticle && genderCheck) {
                const docData = doc.data() 

                const userDocument = await docData.userDocumentReference.get(); 
                const userDocuementData = userDocument.data(); 

                delete docData["offered"] 
                delete docData["offering"] 
                delete docData["visibilityStatus"] 
                delete docData["userDocumentReference"] 
                docData["userDocumentReference"] = userDocuementData; 
                docData["user"] = Email 
                return_documents.push(docData) 
            }
        }
    } 
    res.status(200).json(return_documents)
})

module.exports = router; 


/*
1. user: (Reference to User Document)  
2. clothingImages: (Array of images) 
3. description: (String)
4. size: (String) 
5. clothingArticle: (String) 
6. estimatedMonetaryValue: (Double) 
7. offering: (Array of references to clothing documents) 
8. offered: (Array of references to clothing documents) 
9. visibilityStatus: (Boolean)
    1. false (not available product)
    2. true (available product)
10. id: (String?) - We need an ID field for the “placing a bid” endpoint
*/


/*
router.get("/find_items", async (req, res) => {
    // Extract Request Body 
    var {userEmail, userSize, userClothingArticle, userEstimatedMonetaryValue} = req.body;
    userEstimatedMonetaryValue = parseFloat(userEstimatedMonetaryValue);
    
    const return_documents = [];

    // Get all documents in product collection
    const product_collection_documents = await productCollection.get(); 

    product_collection_documents.forEach(async (doc) => {

        // Get relevant fields from each document 
        const {userDocumentReference, size, clothingArticle, estimatedMonetaryValue, visibilityStatus} = doc.data();  

        // Get Corresponding User Document
        const userReferenceDoc = await userDocumentReference.get(); 
        const {Email} = userReferenceDoc.data(); 

        if(userEmail !== Email && visibilityStatus) {
            if(size === userSize && clothingArticle === userClothingArticle && estimatedMonetaryValue === userEstimatedMonetaryValue) {
                const docData = doc.data() 
                delete docData["offered"] 
                delete docData["offering"] 
                delete docData["visibilityStatus"] 
                delete docData["userDocumentReference"] 
                docData["user"] = Email 
                // console.log("here")
                return_documents.push(docData) 
                // console.log(return_documents);
                // console.log("!@#!@#!@#")
            }
        }
    })
    res.json(return_documents)
})
*/