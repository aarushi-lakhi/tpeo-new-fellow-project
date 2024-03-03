var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

//Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore(); 
module.exports = db;  