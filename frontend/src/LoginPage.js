import React from 'react';
import { useAuth } from './AuthContext';

function LoginPage() {
  const { handleGoogleSignIn } = useAuth();

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
