const express = require("express")
const router = express.Router()

const db = require('./firebase')
const productCollection = db.collection('Product');
const userCollection = db.collection('Users'); 

router.get("/view_complete_inventory", async (req, res) => {
    const {userEmail} = req.body

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
            if(offeredData.visibilityStatus) {
                offeredDocumentData.push(offeredData)
            }
        }

        for(offeringReferece of doc.offering) {
            const offeringReferenceGet = await offeringReferece.get()
            const offeringData = offeringReferenceGet.data() 
            if(offeringData.visibilityStatus) {
                offeringDocumentData.push(offeringData)
            }
        }
    
        delete doc["offered"]
        delete doc["offering"]
        doc["offered"] = offeredDocumentData
        doc["offering"] = offeringDocumentData
    }
    res.status(200).json(allUserProductDocumentData)
})

router.get("/view_inventory", async (req, res) => {
    const {userEmail} = req.body

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