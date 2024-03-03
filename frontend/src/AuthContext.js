import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'; 
import {auth} from './firebaseConfig'; 

//Creating a context for authentication
const AuthContext = createContext();

//Custom hook to use authentication context
export const useAuth = () => {
    return useContext(AuthContext);
}

//Authentication provider component
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate(); //Hook for navigating to different routes
    const [currentUser, setCurrentUser] = useState(null); //State to hold current user
    const [loading, setLoading] = useState(true); //State to indicate loading state

    //Function to handle Google sign-in
    const handleGoogleSignIn = async (e) => {
      try {
        //Create Google authentication provider
        const provider = await new GoogleAuthProvider();
        //Sign-in with Google and handle result asynchronously
        signInWithPopup(auth, provider).then(async (result) => {
          console.log(result);
          //Retrieve user's ID token
          const idToken = await result.user.getIdToken();
          console.log(idToken); 
          
          //Extract domain from user's email
          const userEmail = result.user.email;
          const domainName = userEmail.split("@")[1]; 

          //Check if the domain is utexas.edu
          if(domainName === "utexas.edu") {
            console.log("Good Sign-In"); 
            setCurrentUser(result.user); //Set current user
            navigate('/profile'); //Navigate to home page
          } else {
            handleSignOut(); //Sign out user if not utexas.edu domain
            throw new Error("Invalid email domain. Please sign in with a @utexas.edu email."); //Throw error for invalid domain
          }
        })
      } catch (error) {
        console.log("Error signing in with Google:", error);
        throw error;
      }
    };
    
    //Function to handle sign-out
    const handleSignOut = async () => {
      try {
        await signOut(auth); //Sign out from Firebase authentication
        setCurrentUser(null); //Reset current user
      } catch (error) {
        console.log("Error signing out:", error);
        throw error;
      }
    };
    
    //Effect hook to handle authentication state changes
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user); //Update current user based on authentication state
        setLoading(false); //Set loading state to false
      });
  
      return unsubscribe; //Clean up subscription
    }, []);
  
    //Value object containing authentication-related data and functions
    const value = {
      currentUser,
      loading,
      handleGoogleSignIn,
      handleSignOut
    };
  
    //Provide authentication context to child components
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };