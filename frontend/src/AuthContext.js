import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'; 
import {auth} from './firebaseConfig'; 

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate(); 
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const handleGoogleSignIn = async (e) => {
      try {
        const provider = await new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async (result) => {
          console.log(result);
          const idToken = await result.user.getIdToken();
          console.log(idToken); 

          const userEmail = result.user.email;
          const domainName = userEmail.split("@")[1]; 

          if(domainName === "utexas.edu") {
            console.log("Good Sign-In"); 
            setCurrentUser(result.user);
            navigate('/');
          } else {
            handleSignOut(); 
            throw new Error("Invalid email domain. Please sign in with a @utexas.edu email."); 
          }
        })
        /* const result = await signInWithPopup(auth, provider);
        const userEmail = result.user.email;
        const domainName = userEmail.split("@")[1]; 
  
        if (domainName === "utexas.edu") {
          setCurrentUser(result.user);
        } else {
          await signOut(auth);
          throw new Error("Invalid email domain. Please sign in with a @utexas.edu email.");
        } */
      } catch (error) {
        console.log("Error signing in with Google:", error);
        throw error;
      }
    };
  
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        setCurrentUser(null);
      } catch (error) {
        console.log("Error signing out:", error);
        throw error;
      }
    };
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        setLoading(false);
      });
  
      return unsubscribe;
    }, []);
  
    const value = {
      currentUser,
      loading,
      handleGoogleSignIn,
      handleSignOut
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };