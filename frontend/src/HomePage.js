import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './App.css';

const HomePage = () => {
  const { handleGoogleSignup } = useAuth();
  const { handleGoogleSignIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleGoogleSigninClick = async () => {
    try {
      await handleGoogleSignIn(setError);
    } catch (error) {
      console.log("Error:", error);
    }
  };


  const handleGoogleSignupClick = async () => {
    try {
      await handleGoogleSignup(setError);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const CustomErrorMessage = ({ error, onClose }) => (
    <Box
      width="40%"
      height="50%"
      top="27%"
      left="30%"
      position="absolute"
      bgcolor="#9B9B9B"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h3" sx={{ fontSize: '100px', fontWeight: 500, textAlign: 'center', color: '#000000', marginBottom: '1rem'}}>Error!</Typography>
      <Typography variant="body1" sx={{ fontSize: '30px', fontWeight: 400, textAlign: 'center', color: '#000000', marginBottom: '1rem', marginLeft: '2rem', marginRight: '2rem'}}>Please use your utexas.edu email to log in</Typography>
    </Box>
  );

  const handleCloseError = () => {
    setError(null); // Clear the error state to hide the modal
  };
  

  return (
    <div>
      {/* Main content */}
      <Box
        bgcolor="#A5B9E0"
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        {/* Left Box */}
        <Box
          width="35%"
          height="35%"
          bgcolor="#D9D9D9"
          textAlign="left"
          padding="4vw"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          marginTop="9vw"
          marginBottom="9vw"
          marginLeft="2vw"
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '8vw',
              fontWeight: 500,
              lineHeight: '1',
              textAlign: 'left',
              color: '#000000',
              marginBottom: '3vw',
            }}
          >
            Barter Buddies
          </Typography>
          <Typography
            variant="h2"
            width="70%"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '2vw',
              fontStyle: 'italic',
              fontWeight: 600,
              lineHeight: '1',
              textAlign: 'left',
              color: '#000000',
            }}
          >
            Revamp your closet, swap your style!
          </Typography>
        </Box>

        {/* Right Box */}
        <Box
          width="40%"
          height="100%"
          bgcolor="#D9D9D9"
          border="4px solid rgba(0, 0, 0, 0.5)"
          borderRadius="4vw 4vw 4vw 4vw"
          marginLeft="4vw" 
          marginRight="4vw"
          marginBottom="2vw"
          marginTop="2vw"
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding="3vw"
        >
          {/* Log in or sign up text */}
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '1.75vw',
              fontWeight: 600,
              lineHeight: '1',
              textAlign: 'center',
              color: '#000000',
              marginBottom: '1vw',
            }}
          >
            Log in or sign up
          </Typography>
          {/* Line after log in or sign up text */}
          <hr
            style={{
              border: '4px solid rgba(0, 0, 0, 0.2)',
              width: '100%',
              marginBottom: '2vw',
            }}
          />
          {/* Text after the line */}
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '2.5vw',
              fontWeight: 600,
              lineHeight: '1',
              textAlign: 'center',
              color: '#000000',
              marginBottom: '2vw',
            }}
          >
            Welcome to Barter Buddies!
          </Typography>

          {/* Text before continue with google button */}
          <Typography
            variant="h6"
            marginBottom = "1.5vw"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '1vw',
              fontWeight: 500,
              lineHeight: '1',
              textAlign: 'center',
            }}
          >
            Please sign in with your school/edu account
          </Typography>

          {/* Continue with Google button */}
          <GoogleButton onClick={handleGoogleSigninClick} />
          {error !== null && (
            <CustomErrorMessage error={error} onClose={handleCloseError} />
          )}

          {/* Text under continue with google button */}
          <Typography
            variant="h6"
            marginTop = "1.5vw"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '1.5vw',
              fontWeight: 600,
              lineHeight: '1',
              textAlign: 'center',
              color: '#000000',
            }}
          >
            Don’t have an account yet?{' '}
            <span
              style={{
                cursor: 'pointer',
                color: '#06304E',
              }}
              onClick={handleGoogleSignupClick} // TODO: modify once backend endpoint to check if user already exists is made.
            >
              Sign up
            </span>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
