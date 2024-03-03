import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"; 
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCCjggorCpuYOYMkS27zvE2ruBpzwDd3YU",  
  authDomain: "tpeo-new-fellow-project.firebaseapp.com",
  projectId: "tpeo-new-fellow-project",
  storageBucket: "tpeo-new-fellow-project.appspot.com",
  messagingSenderId: "251928203570",
  appId: "1:251928203570:web:155e6b88cd0b4cf608872b",
  measurementId: "G-FJ9F4KGDW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const storage = getStorage(app);
export default app; 