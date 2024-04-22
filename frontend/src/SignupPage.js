import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from './firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Typography from '@mui/material/Typography';
import { Box, Grid, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import phoneIcon from './components/SignUp_Icons/phone_icon.png';
import snapchatIcon from './components/SignUp_Icons/snapchat_icon.png';
import instagramIcon from './components/SignUp_Icons/instagram_icon.png';
import uploadImageIcon from './components/SignUp_Icons/upload_image_icon.png'
import locationIcon from './components/SignUp_Icons/location_icon.png';
import { useAuth } from './AuthContext';
import NavBar from './components/NavBar';
import axios from 'axios';
import './App.css';

function SignupPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [profilePicture, setProfilePicture] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [instagram, setInstagram] = useState('');
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [location3, setLocation3] = useState('');

  const backendURL = process.env.REACT_APP_BACKEND;

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    console.log("current step is " + currentStep);

    // Check if it's the last step
    if (currentStep === 3) {
      handleSubmit(); 
      navigate('/manage-listings');
    } 
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const url = await uploadSpecificImage(file);
    setProfilePicture(url);
  };

  const handleSubmit = async () => {
  //   try {
  //     // Upload profile picture
  //     let profilePictureUrl = '';
  //     if (profilePicture) {
  //       const formData = new FormData();
  //       formData.append('image', profilePicture);

  //       const url = `${backendURL}/user/upload_image`
  //       const response = await fetch(url, {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': 'Bearer ' + currentUser,
  //         },
  //         body: formData
  //       });
  //       const data = await response.json();
  //       profilePictureUrl = response.data.url;
  //     }

  //     // Submit form data
  //     const userData = {
  //       userEmail: currentUser.email,
  //       userPhoneNumber: phoneNumber,
  //       userSnapchat: snapchat,
  //       userInstagram: instagram,
  //       userLocation1: location1,
  //       userLocation2: location2,
  //       userLocation3: location3,
  //       userProfilePicture: profilePictureUrl,
  //     };

  //     const url = `${backendURL}/user/create_user`
  //     await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': 'Bearer ' + currentUser.idToken,
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(userData)
  //     });

  //   } catch (error) {
  //     // Handle error
  //     console.error('Error submitting form:', error);
  //   }
  // };
  try {
    const backendURL = process.env.REACT_APP_BACKEND;
    const idToken = await currentUser.getIdToken(); 

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const token = "Bearer " +  idToken; 
    myHeaders.append("Authorization", token);

    // Upload profile picture
    // let profilePictureUrl = '';
    // if (profilePicture) {
    //   const formData = new FormData();
    //   formData.append('image', profilePicture);

    //   const url = `${backendURL}/user/upload_image`
    //     const response = await fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'Authorization': 'Bearer ' + currentUser,
    //       },
    //       body: formData
    //     });
    //     const data = await response.json();
    //     profilePictureUrl = response.data.url;
    // }

    const raw = JSON.stringify({
            userEmail: currentUser.email,
            userPhoneNumber: phoneNumber,
            userSnapchat: snapchat,
            userInstagram: instagram,
            userLocation1: location1,
            userLocation2: location2,
            userLocation3: location3,
            userProfilePicture: profilePicture,
            userName: currentUser.displayName, 
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    const url = `${backendURL}/item/upload_item_test`
    const response = await fetch(url, requestOptions);
    const result = await response.text(); 
    } catch(e) {
    // ERROR 
    console.log(e); 
    }
  }

  const uploadSpecificImage = async (imageToUpload) => {
    const imageRef = ref(storage, `images/${imageToUpload.name + v4()}`);
    try {
        const imageRef = ref(storage, `images/${imageToUpload.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, imageToUpload);
        const url = await getDownloadURL(snapshot.ref);
        return url; 
    } catch (error) {
        console.error("Error uploading image:", error);
        return null; 
    }
};




  return (
    <div>
      {/* NavBar component */}
      <NavBar/>

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
                <TextField id="phone" label="Phone Number" variant="outlined" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <img src={snapchatIcon} width="8%" alt="snapchat icon" style={{ marginRight: '1rem' }} />
                <TextField id="snapchat" label="Snapchat" variant="outlined" value={snapchat} onChange={(e) => setSnapchat(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <img src={instagramIcon} width="8%" alt="instagram icon" style={{ marginRight: '1rem' }} />
                <TextField id="instagram" label="Instagram" variant="outlined" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
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

            {/* Conditionally render the uploaded image */}
            {profilePicture ? (
              <img src={profilePicture} alt="profile" style={{ width: '70%', borderRadius: '2vw 2vw 2vw 2vw', margin: '2vw auto' }} />
            ) : (
              // <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                <Box
                  width="70%"
                  height="30%"
                  bgcolor="#9B9B9B"
                  marginLeft="8.5vw"
                  marginTop="2vw"
                  borderRadius="2vw 2vw 2vw 2vw"
                  flexDirection="column"
                  alignItems="center"
                  textAlign="center"
                  onClick={() => document.getElementById('image-upload').click()} // Open file dialog on click
                  style={{ cursor: 'pointer' }}
                >
                  {/* Upload image icon */}
                  <img src={uploadImageIcon} width="30%" alt="upload image icon" style={{ marginTop: '2vw' }} />
                  <Typography variant="h5" sx={{ fontSize: '2vw', fontWeight: 500, marginTop: '1vw', marginBottom: '1vw' }}>Drop your image here or{' '}
                    <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>browse</span>
                  </Typography>
                </Box>
              // </label>
            )}
            
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
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
                <TextField id="location1" label="Location 1" variant="outlined" value={location1} onChange={(e) => setLocation1(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <img src={locationIcon} width="8%" alt="location icon" style={{ marginRight: '1rem' }} />
                <TextField id="location2" label="Location 2" variant="outlined" value={location2} onChange={(e) => setLocation2(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <img src={locationIcon} width="8%" alt="location icon" style={{ marginRight: '1rem' }} />
                <TextField id="location3" label="Location 3" variant="outlined" value={location3} onChange={(e) => setLocation3(e.target.value)} />
              </Grid>
            </Grid>
            <Box position="absolute" top="50%" transform="translateY(-50%)" left="2vw">
              <ArrowBackIcon fontSize="large" color="black" onClick={prevStep} />
            </Box>
            <Box position="absolute" top="50%" transform="translateY(-50%)" right="2vw">
              <ArrowForwardIcon fontSize="large" color="black" onClick={nextStep} />
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default SignupPage;
