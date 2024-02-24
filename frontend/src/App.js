import logo from './logo.svg';
import './App.css';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'; 
import {auth} from './firebaseConfig'; 

function App() {
  const handleGoogle = async(e) => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider); 
  }

  return (
    <div className="App">
      <h1>HELLO</h1>
      <button onClick={handleGoogle}>Hello this is a button</button>
    </div>
  );
}

export default App;
