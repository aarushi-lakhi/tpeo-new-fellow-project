const express = require("express")
const router = express.Router()

const db = require('./firebase')
const productCollection = db.collection('Product');
const userCollection = db.collection('Users'); 

router.get("/view_complete_inventory/:userEmail", async (req, res) => {
    const userEmail = req.params.userEmail; 

    const userDocReference = await userCollection.doc(userEmail).get()
    const userData = userDocReference.data() 

    const allUserProductReferences = [] 
    const allUserProductDocumentData = [] 
    userData.clothingItems.forEach((ref) => {
        allUserProductReferences.push(ref)
    })

    for(ref of allUserProductReferences) {
        const productDocumentReference = await ref.get(); 
        const productDocumentData = productDocumentReference.data(); 
        if(productDocumentData.visibilityStatus) {
            allUserProductDocumentData.push(productDocumentData)
        }
    }
    
    // Go through all product documents
    for(doc of allUserProductDocumentData) {
        const offeredDocumentData = []
        const offeringDocumentData = []

        for(offeredReference of doc.offered) {
            const offeredReferenceGet = await offeredReference.get()
            const offeredData = offeredReferenceGet.data() 

            const offeredDataUserDocument = await offeredData.userDocumentReference.get(); 
            const offeredDataUserDocumentData = offeredDataUserDocument.data(); 

            if(offeredData.visibilityStatus) {
                delete offeredData["userDocumentReference"]; 
                offeredData["userDocumentReference"] = offeredDataUserDocumentData; 
                offeredDocumentData.push(offeredData)
            }
        }

        for(offeringReferece of doc.offering) {
            const offeringReferenceGet = await offeringReferece.get()
            const offeringData = offeringReferenceGet.data() 

            const offeringDataUserDocument = await offeringData.userDocumentReference.get(); 
            const offeringDataUserDocumentData = offeringDataUserDocument.data(); 

            if(offeringData.visibilityStatus) {
                delete offeringData["userDocumentReference"]; 
                offeringData["userDocumentReference"] = offeringDataUserDocumentData; 
                offeringDocumentData.push(offeringData)
            }
        }
        
        const userDocument = await doc.userDocumentReference.get(); 
        const userDocuementData = userDocument.data(); 

        delete doc["offered"]
        delete doc["offering"]
        delete doc["userDocumentReference"]; 
        doc["offered"] = offeredDocumentData
        doc["offering"] = offeringDocumentData
        doc["userDocumentReference"] = userDocuementData; 
    }
    res.status(200).json(allUserProductDocumentData)
})

router.get("/view_inventory/:userEmail", async (req, res) => {
    const userEmail = req.params.userEmail;

    const userDocReference = await userCollection.doc(userEmail).get()
    const userData = userDocReference.data() 

    const allUserProductReferences = [] 
    const allUserProductDocumentData = [] 
    userData.clothingItems.forEach((ref) => {
        allUserProductReferences.push(ref)
    })

    for(ref of allUserProductReferences) {
        const productDocumentReference = await ref.get(); 
        const productDocumentData = productDocumentReference.data(); 
        if(productDocumentData.visibilityStatus) {
            allUserProductDocumentData.push(productDocumentData)
        }
    }

    res.status(200).json(allUserProductDocumentData)
})

router.get("/successful_trades/:userEmail", async (req, res) => {
    const userEmail = req.params.userEmail;

    const userDocReference = await userCollection.doc(userEmail).get()
    const userData = userDocReference.data();

    const transactions = []; 
    const returnTransactions = []; 
    userData.successfulTransactions.forEach((ref) => {
        transactions.push(ref)
    })

    for(ref of transactions) {
        const transactionDocumentReference = await ref.get(); 
        const transactionDocumentData = transactionDocumentReference.data(); 


        const productDocumentOneReference = await transactionDocumentData.product1Ref.get(); 
        const productDocumentTwoReference = await transactionDocumentData.product2Ref.get(); 

        const productDocumentOneData = productDocumentOneReference.data(); 
        const productDocumentTwoData = productDocumentTwoReference.data(); 

        const userOneDocumentReference = await productDocumentOneData.userDocumentReference.get(); 
        const userOneDocumentData = userOneDocumentReference.data(); 
        delete productDocumentOneData["userDocumentReference"]; 
        productDocumentOneData["userDocumentReference"] = userOneDocumentData; 

        const userTwoDocumentReference = await productDocumentTwoData.userDocumentReference.get(); 
        const userTwoDocumentData = userTwoDocumentReference.data(); 
        delete productDocumentTwoData["userDocumentReference"]; 
        productDocumentTwoData["userDocumentReference"] = userTwoDocumentData; 

        delete transactionDocumentData["product1Ref"];
        delete transactionDocumentData["product2Ref"];
        transactionDocumentData["product1Ref"] = productDocumentOneData;
        transactionDocumentData["product2Ref"] = productDocumentTwoData; 

        returnTransactions.push(transactionDocumentData); 
    }

    res.status(200).json(returnTransactions);
})

module.exports = router; 