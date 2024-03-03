import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const { handleGoogleSignIn } = useAuth();
  const navigate = useNavigate(); //Hook for navigating to different routes


  const handleGoogleLogin = async () => {
    try {
      await handleGoogleSignIn();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
}

export default LoginPage;
