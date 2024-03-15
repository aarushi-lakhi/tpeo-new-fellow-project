import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

function SignupPage() {
  const { handleGoogleSignup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleGoogleSignupClick = async () => {
    try {
      await handleGoogleSignup(setError);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        component="form"
        flexDirection="column"
        sx={{
          '& > :not(style)': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <Typography align="center" variant="h3" component="h2">
            Signup Page
          </Typography>
        </div>
        <GoogleButton onClick={handleGoogleSignupClick} />
        {error !== null && (
          <Alert severity="error">
            <AlertTitle>{error.errorHeader}</AlertTitle>
            {error.errorMessage}
          </Alert>
        )}
      </Box>
    </div>
  );
}

export default SignupPage;
