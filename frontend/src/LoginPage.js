import React, {useState} from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';

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
      <div>
        <Typography variant="h3" component="h2">
            Login Page
        </Typography>
      </div>
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
