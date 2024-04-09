// Existing imports
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, TextField } from '@mui/material';
import './App.css';

function SignupPage() {
  const { handleGoogleSignup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleGoogleSignupClick = async () => {
    try {
      await handleGoogleSignup(setError);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      {/* Nav Bar */}
      <Box
        width="100%"
        height="12%"
        bgcolor="#A5B9E0"
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
          bgcolor="#D9D9D9"
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

        {/* User Profile */}
        <Box
          width="4%"
          height="100%"
          bgcolor="#1B1A1A"
          border="2px solid #000000"
          borderRadius="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <div
            width="42px"
            height="42px"
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
        height="90%"
        bgcolor="#D9D9D9"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        {/* Carousel Step 1 */}
        {currentStep === 1 && (
          <Box
            width="60%"
            height="75%"
            bgcolor="#D9D9D9"
            border="4px solid rgba(0, 0, 0, 0.5)"
            borderRadius="6vw 6vw 6vw 6vw"
            padding="2vw"
            display="flex"
            flexDirection="column"
            marginBottom="7vw"
            marginTop="7vw"
          >
            {/* Step 1 content */}
            <Typography variant="h3" sx={{ fontSize: '3vw', fontWeight: 500, marginBottom: '2vw' }}>Sign up</Typography>
            <hr style={{ width: '100%', border: '0.4vw solid rgba(0, 0, 0, 0.2)', marginBottom: '2vw' }} />
            <Typography variant="h4" sx={{ fontSize: '2.5vw', fontWeight: 500, marginBottom: '1vw', textAlign: 'left' }}>Additional contact information</Typography>
            <Typography variant="h4" sx={{ fontSize: '2vw', fontWeight: 500, marginBottom: '1vw', textAlign: 'left', color: '#0000008A' }}>Optional</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField id="phone" label="Phone Number" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="snapchat" label="Snapchat" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="instagram" label="Instagram" variant="outlined" />
              </Grid>
            </Grid>
            <Box marginTop="2vw">
              <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>
            </Box>
          </Box>
        )}

        {/* Carousel Step 2 */}
        {currentStep === 2 && (
          <Box
            width="60%"
            height="75%"
            bgcolor="#D9D9D9"
            border="4px solid rgba(0, 0, 0, 0.5)"
            borderRadius="6vw 6vw 6vw 6vw"
            padding="2vw"
            display="flex"
            flexDirection="column"
            marginBottom="7vw"
            marginTop="7vw"
          >
            <Typography variant="h3" sx={{ fontSize: '3vw', fontWeight: 500, marginBottom: '2vw' }}>Sign up</Typography>
            <hr style={{ width: '100%', border: '0.4vw solid rgba(0, 0, 0, 0.2)', marginBottom: '2vw' }} />
            <Typography variant="h4" sx={{ fontSize: '2.5vw', fontWeight: 500, marginBottom: '1vw', textAlign: 'left' }}>Add your profile picture</Typography>
            <Typography variant="h4" sx={{ fontSize: '2vw', fontWeight: 500, marginBottom: '1vw', textAlign: 'left', color: '#0000008A' }}>Optional</Typography>
              <Box
                width="498px"
                height="207px"
                top="264px"
                left="75px"
                bgcolor="#9B9B9B"
                marginTop="2vw"
                borderRadius="2vw 2vw 2vw 2vw"

                //TODO: not sure why this isn't centering my box
                flexDirection="column"
                alignItems="center"
                >
                {/* Upload image icon goes here */}
                <Typography variant="h5" sx={{ fontSize: '2vw', fontWeight: 500, marginTop: '13vw' }}>Drop your image here or browse</Typography>
              </Box>
            <Box marginTop="2vw">
              <Button variant="outlined" onClick={prevStep}>Back</Button>
              <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>
            </Box>
          </Box>
        )}


        {/* Carousel Step 3 */}
        {currentStep === 3 && (
          <Box
            width="60%"
            height="75%"
            bgcolor="#D9D9D9"
            border="4px solid rgba(0, 0, 0, 0.5)"
            borderRadius="6vw 6vw 6vw 6vw"
            padding="2vw"
            display="flex"
            flexDirection="column"
            marginBottom="7vw"
            marginTop="7vw"
          >
            {/* Step 3 content */}
            <Typography variant="h3" sx={{ fontSize: '3vw', fontWeight: 500, marginBottom: '2vw' }}>Sign up</Typography>
            <hr style={{ width: '100%', border: '0.4vw solid rgba(0, 0, 0, 0.2)', marginBottom: '2vw' }} />
            <Typography variant="h4" sx={{ fontSize: '2.5vw', fontWeight: 500, marginBottom: '1vw', textAlign: 'left' }}>Enter Preferred Locations</Typography>
            <Typography variant="h4" sx={{ fontSize: '2vw', fontWeight: 500, marginBottom: '1vw', textAlign: 'left', color: '#0000008A' }}>Optional</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField id="location1" label="Location 1" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="location2" label="Location 2" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="location3" label="Location 3" variant="outlined" />
              </Grid>
            </Grid>
            <Box marginTop="2vw">
              <Button variant="outlined" onClick={prevStep}>Back</Button>
              <Button variant="contained" color="primary">Submit</Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Ellipses */}
      <Box
        width="100%"
        height="128px"
        bgcolor="#A5B9E0"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          {currentStep > 1 && <Button onClick={prevStep}>Previous</Button>}
          {currentStep < 3 && <Button onClick={nextStep}>Next</Button>}
          <Box display="flex">
            <Box
              width="28px"
              height="24px"
              bgcolor={currentStep === 1 ? "#A5B9E0" : "#9B9B9B"}
              border="1px solid #9B9B9B"
              borderRadius="50%"
              marginX="5px"
            />
            <Box
              width="28px"
              height="24px"
              bgcolor={currentStep === 2 ? "#A5B9E0" : "#9B9B9B"}
              border="1px solid #9B9B9B"
              borderRadius="50%"
              marginX="5px"
            />
            <Box
              width="28px"
              height="24px"
              bgcolor={currentStep === 3 ? "#A5B9E0" : "#9B9B9B"}
              border="1px solid #9B9B9B"
              borderRadius="50%"
              marginX="5px"
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default SignupPage;
