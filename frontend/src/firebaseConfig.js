import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCCjggorCpuYOYMkS27zvE2ruBpzwDd3YU", // Make sure this is not exposed!
  authDomain: "tpeo-new-fellow-project.firebaseapp.com",
  projectId: "tpeo-new-fellow-project",
  storageBucket: "tpeo-new-fellow-project.appspot.com",
  messagingSenderId: "251928203570",
  appId: "1:251928203570:web:155e6b88cd0b4cf608872b",
  measurementId: "G-FJ9F4KGDW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
module.exports = auth;
// export const auth = getAuth(app); 
// export default app; 