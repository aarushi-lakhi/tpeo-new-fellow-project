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
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = () => {
    console.log("Handle Login"); 
    navigate('/login'); 
  }

  const handleSignup = () => {
    console.log("Handle Signup"); 
    navigate('/signup'); 
  }

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
      top="35%"
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
      <Typography variant="body1" sx={{ fontSize: '30px', fontWeight: 400, textAlign: 'center', color: '#000000', marginBottom: '1rem'}}>Please use your utexas.edu email to log in</Typography>
    </Box>
  );

  const handleCloseError = () => {
    setError(null); // Clear the error state to hide the modal
  };
  

  return (
    <div>
      {/* Nav Bar */}
      <Box
        width="100%"
        height="12%"
        bgcolor="#D9D9D9"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        textAlign="center"
        padding="1rem"
      >
        {/* Barter Buddies */}
        <Box
          width="17%"
          height="80%"
          top = "-10%"
          gap = "0px"
          opacity = "0px"
          bgcolor="#A5B9E0"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '2vw',
              fontWeight: 500,
              lineHeight: '1.5',
              textAlign: 'center',
              color: '#000000',
            }}
          >
            Barter Buddies
          </Typography>
        </Box>

        {/* User Circle Icon */}
        <Box
          width="10%"
          height="100%"
          bgcolor="#1B1A1A"
          border="2px solid #000000"
          borderRadius="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* User Icon */}
          <div
            width="70%"
            height="70%"
            style={{
              backgroundImage: 'url("user-icon.png")',
              backgroundSize: 'cover',
            }}
          />
        </Box>
      </Box>

      {/* Main content */}
      <Box
        width="100%"
        height="100%"
        top = "10%"
        bgcolor="#A5B9E0"
        display="flex"
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
          padding="2vw"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          marginTop="7vw"
          marginBottom="7vw"
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
          <GoogleButton onClick={handleGoogleSignupClick} />
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
              onClick={handleGoogleSignupClick} // TODO: include same google button error handling. also modify once backend endpoint to check if user already exists is made.
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
