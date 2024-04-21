var admin = require("firebase-admin");
require('dotenv').config();
var serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
//Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
module.exports = db;