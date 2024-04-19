import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box, Grid, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import phoneIcon from './components/SignUp_Icons/phone_icon.png';
import snapchatIcon from './components/SignUp_Icons/snapchat_icon.png';
import instagramIcon from './components/SignUp_Icons/instagram_icon.png';
import uploadImageIcon from './components/SignUp_Icons/upload_image_icon.png'
import locationIcon from './components/SignUp_Icons/location_icon.png';
import './App.css';

function SignupPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Add code to submit information to backend
    // Then navigate to a different page
    navigate('/success');
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
          top="-10%"
          gap="0px"
          opacity="0px"
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
            position="relative"
          >
            {/* Step 1 content */}
            <Typography variant="h3" sx={{ fontSize: '3vw', fontWeight: 500, marginBottom: '2vw' }}>Sign up</Typography>
            <hr style={{ width: '100%', border: '0.4vw solid rgba(0, 0, 0, 0.2)', marginBottom: '2vw' }} />
            <Typography variant="h4" sx={{ fontSize: '2.5vw', fontWeight: 500, marginBottom: '1vw', textAlign: 'left' }}>Additional contact information</Typography>
            <Typography variant="h4" sx={{ fontSize: '2vw', fontWeight: 500, marginBottom: '1vw', textAlign: 'left', color: '#0000008A' }}>Optional</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img src={phoneIcon} width="8%" alt="phone icon" style={{ marginRight: '1rem' }} />
                <TextField id="phone" label="Phone Number" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <img src={snapchatIcon} width="8%" alt="snapchat icon" style={{ marginRight: '1rem' }} />
                <TextField id="snapchat" label="Snapchat" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <img src={instagramIcon} width="8%" alt="instagram icon" style={{ marginRight: '1rem' }} />
                <TextField id="instagram" label="Instagram" variant="outlined" />
              </Grid>
            </Grid>
            {/* No back error on the first slide of sign up */}
            <Box position="absolute" top="50%" transform="translateY(-50%)" right="2vw">
              <ArrowForwardIcon fontSize="large" color="black" onClick={nextStep} />
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
            position="relative"
          >
            <Typography variant="h3" sx={{ fontSize: '3vw', fontWeight: 500, marginBottom: '2vw' }}>Sign up</Typography>
            <hr style={{ width: '100%', border: '0.4vw solid rgba(0, 0, 0, 0.2)', marginBottom: '2vw' }} />
            <Typography variant="h4" sx={{ fontSize: '2.5vw', fontWeight: 500, marginBottom: '1vw', textAlign: 'left' }}>Add your profile picture</Typography>
            <Typography variant="h4" sx={{ fontSize: '2vw', fontWeight: 500, marginBottom: '1vw', textAlign: 'left', color: '#0000008A' }}>Optional</Typography>
              <Box
                width="70%"
                height="30%"
                bgcolor="#9B9B9B"
                marginLeft="8.5vw"
                marginTop="2vw"
                borderRadius="2vw 2vw 2vw 2vw"

                //TODO: not sure why this isn't centering my box
                flexDirection="column"
                alignItems="center"
                // transform="translateX(50%)"
                textAlign="center"
                >

                {/* Upload image icon */}
                <img src={uploadImageIcon} width="40%" alt="upload image icon" style={{ marginTop: '2vw' }} />
                <Typography variant="h5" sx={{ fontSize: '2vw', fontWeight: 500, marginTop: '1vw', marginBottom: '1vw' }}>Drop your image here or browse</Typography>
              </Box>
            <Box position="absolute" top="50%" transform="translateY(-50%)" left="2vw">
              <ArrowBackIcon fontSize="large" color="black" onClick={prevStep} />
            </Box>
            <Box position="absolute" top="50%" transform="translateY(-50%)" right="2vw">
              <ArrowForwardIcon fontSize="large" color="black" onClick={nextStep} />
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
            position="relative"
          >
            {/* Step 3 content */}
            <Typography variant="h3" sx={{ fontSize: '3vw', fontWeight: 500, marginBottom: '2vw' }}>Sign up</Typography>
            <hr style={{ width: '100%', border: '0.4vw solid rgba(0, 0, 0, 0.2)', marginBottom: '2vw' }} />
            <Typography variant="h4" sx={{ fontSize: '2.5vw', fontWeight: 500, marginBottom: '1vw', textAlign: 'left' }}>Enter Preferred Locations</Typography>
            <Typography variant="h4" sx={{ fontSize: '2vw', fontWeight: 500, marginBottom: '1vw', textAlign: 'left', color: '#0000008A' }}>Optional</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img src={locationIcon} width="8%" alt="location icon" style={{ marginRight: '1rem' }} />
                <TextField id="location1" label="Location 1" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <img src={locationIcon} width="8%" alt="location icon" style={{ marginRight: '1rem' }} />
                <TextField id="location2" label="Location 2" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <img src={locationIcon} width="8%" alt="location icon" style={{ marginRight: '1rem' }} />
                <TextField id="location3" label="Location 3" variant="outlined" />
              </Grid>
            </Grid>
            <Box position="absolute" top="50%" transform="translateY(-50%)" left="2vw">
              <ArrowBackIcon fontSize="large" color="black" onClick={prevStep} />
            </Box>
            <Box position="absolute" top="50%" transform="translateY(-50%)" right="2vw">
              <ArrowForwardIcon fontSize="large" color="black" onClick={handleSubmit} />
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default SignupPage;
