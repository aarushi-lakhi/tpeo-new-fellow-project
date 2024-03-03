import React, {useState} from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function LoginPage() {
  const { handleGoogleSignIn } = useAuth();
  const navigate = useNavigate(); //Hook for navigating to different routes
  const [error, setError] = useState(null); 


  const handleGoogleLogin = async () => {
    try {
      await handleGoogleSignIn(setError);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <GoogleButton onClick={handleGoogleLogin}/>
      {error !== null && (
        <Alert severity="error">
          <AlertTitle>{error.errorHeader}</AlertTitle>
          {error.errorMessage}
        </Alert>
      )}
    </div>
  );
}

export default LoginPage;
