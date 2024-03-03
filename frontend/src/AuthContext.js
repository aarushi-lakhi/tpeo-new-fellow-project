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
    const handleGoogleSignIn = async (setError, e) => {
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
            console.log("TEST - GET RID OF THIS in AUTHContext"); 
            console.log(currentUser); 
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            navigate('/profile'); //Navigate to home page
          } else {
            handleSignOut(); //Sign out user if not utexas.edu domain
            setError({errorHeader: "Invalid Domain Name", errorMessage: "Please sign in with a @utexas.edu email."})
            // setError("Please sign in with a @utexas.edu email.")
            // throw new Error("Invalid email domain. Please sign in with a @utexas.edu email."); //Throw error for invalid domain
          }
        })
      } catch (error) {
        setError({errorHeader: "Google Error", errorMessage: "Error signing in with Google"})
        // console.log("Error signing in with Google:");
        // throw error;
      }
    };
    
    //Function to handle sign-out
    const handleSignOut = async () => {
      try {
        await signOut(auth); //Sign out from Firebase authentication
        setCurrentUser(null); //Reset current user
        localStorage.removeItem('currentUser');
      } catch (error) {
        console.log("Error signing out:", error);
        throw error;
      }
    };
    
    //Effect hook to handle authentication state changes
    useEffect(() => {
      const storedUser = localStorage.getItem('currentUser');

      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user); //Update current user based on authentication state
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          localStorage.removeItem('currentUser');
        }
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