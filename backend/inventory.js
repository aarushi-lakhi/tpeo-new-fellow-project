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
    
    console.log(userEmail); 

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

module.exports = router; 