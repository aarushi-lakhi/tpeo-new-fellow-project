import logo from './logo.svg';
import './App.css';
import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'; 
import {auth} from './firebaseConfig'; 

function App() {
  const handleGoogle = async(e) => {
    const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result); 
      // This gives you a Google Access Token. You can use it to access the Google API.
      const idToken = await result.user.getIdToken(); 
      console.log(idToken); 

      const userEmail = result.user.email;
      const domainName = userEmail.split("@")[1]; 

      if(domainName === "utexas.edu") {
        console.log("Good Sign-In"); 
      } else {
        handleGoogleSignOut(); 
        console.log("Unsuccessful Sign-In"); 
      }
    }).catch((error) => {
      console.log("error"); 
      console.log(error);
    });
  }

  const handleGoogleSignOut = async(e) => {
    signOut(auth).then(() => {
      console.log("Successful Sign-Out")
    }).catch((error) => {
      console.log("Unsuccessful Sign-Out")
    });
  }

  return (
    <div className="App">
      <h1>HELLO</h1>
      <button onClick={handleGoogle}>Hello this is a SIGN IN button</button>
      <button onClick={handleGoogleSignOut}>Hello this is a LOGOUT button</button>
    </div>
  );
}

export default App;
