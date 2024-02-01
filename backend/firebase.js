const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    require("./path/to/serviceAccountKey.json")
  ),
  databaseURL: "https://tpeo-new-fellow-project.firebaseio.com",
});

const db = admin.firestore();