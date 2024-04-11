import React from 'react';
import {useState, useEffect, ChangeEvent} from 'react';
import {storage} from './firebaseConfig';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';
import { useNavigate } from 'react-router-dom';
import { InputLabel, Button, Box, TextField, Grid, Item} from '@mui/material'; // Import Box and TextField
import Typography from '@mui/material/Typography';
import {useAuth} from './AuthContext';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import phoneIcon from './components/phone_icon.jpg';
import snapchatIcon from './components/snapchat_icon.png';
import instagramIcon from './components/instagram_icon.png';
import locationIcon from './components/location_icon.jpg';


const Profile = () => {
  const {currentUser} = useAuth();
  const [imageUpload, setImageUpload] =  useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const [name,setName] = useState(""); 
  const [email,setEmail] = useState(""); 
  const [snap, setSnap] = useState(""); 
  const [instagram, setInstagram] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState("")
  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");
  const [location3, setLocation3] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName);
      setEmail(currentUser.email);
      fetchProfileInformation();
    }
  }, [currentUser]);

  const fetchProfileInformation = async () => {
    try {
      const myHeaders = new Headers();

      const idToken = await currentUser.getIdToken(); 
      myHeaders.append("Authorization", `Bearer ${idToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const fetchUrl = `http://localhost:4000/profile_information/${currentUser.email}`; 
      const response = await fetch(fetchUrl, requestOptions); 
      const data = await response.json(); 
      setSnap(data.Snapchat); 
      setInstagram(data.Instagram); 
      setPhoneNumber(data.PhoneNumber)
      setLocation1(data.Location1);
      setLocation2(data.Location2);
      setLocation3(data.Location3);
    } catch(e) {
      console.log(e); 
    }
  }

  const uploadImage = () => {
    if (imageUpload == null) {
      return;
    }

  const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      alert("Image Uploaded");
      getDownloadURL(snapshot.ref).then((url) => {
        // Update profile picture URL state
        setProfilePictureUrl(url);
        console.log(url);
      });
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });
  };

  // Function to update profile information
  const updateProfileInformation = async (profilePictureUrl, idToken) => {
    try {
      // Create request body with updated profile picture URL
      const requestBody = JSON.stringify({
        userEmail: email,
        userSnapchat: snap,
        userInstagram: instagram,
        userPhoneNumber: phoneNumber,
        userProfilePicture: profilePictureUrl, // Updated profile picture URL
        location1: location1,
        location2: location2,
        location3: location3,
      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: requestBody,
      };

      const fetchUrl = "http://localhost:4000/update_user_information";
      const response = await fetch(fetchUrl, requestOptions);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }; 

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      console.log(response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        })
      })
    })
  }, [])

  useEffect(() => {
    if(currentUser) {
        setName(currentUser.displayName); 
        setEmail(currentUser.email);
        fetchProfileInformation();
    }
  }, [currentUser]);
  
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
        <Box
          width="100%"
          height="100%"
          bgcolor="#A5B9E0"
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="2vw"
          flexDirection="column"
          marginTop="40vw"
        >
          <Box
            width="85%"
            height="80%"
            bgcolor="#D9D9D9"
            borderRadius="4vw 4vw 4vw 4vw"
            border="4px solid #0000007A"
            position="relative"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {/* Profile Picture */}
            <Box
              width="23%"
              height="50%"
              bgcolor="#757575E8"
              borderRadius="50%"
              position="absolute"
              top="15%"
              left="5%"
            >
              {/* Profile picture content here */}
            </Box>

            {/* Edit profile picture text */}
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Poppins',
                fontSize: '1.75vw',
                fontWeight: 500,
                lineHeight: '1',
                textAlign: 'center',
                color: '#1A3F7D',
                position: 'absolute',
                top: '70%',
                left: '3%',
              }}
            >
              Add/update profile picture
            </Typography>

            {/* Edit information button */}
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Poppins',
                fontSize: '1.75vw',
                fontWeight: 500,
                lineHeight: '1',
                textAlign: 'center',
                color: '#1A3F7D',
                position: 'absolute',
                top: '86%',
                left: '6%',
              }}
            >
              EDIT INFORMATION
            </Typography>

            {/* Right boxes */}
            <Box
              width="55%"
              height="10%"
              bgcolor="#D9D9D9"
              position="absolute"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              top="10%"
              left="35%"
            >
              {/* Name box */}
              <Typography
                variant="h6"
                border="3px solid #757575E8"
                borderRadius="1vw 1vw 1vw 1vw"
                padding="1vw"
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '1.5vw',
                  fontWeight: 600,
                  lineHeight: '1',
                  textAlign: 'left',
                  width: '100%',
                  height: '50%',
                  color: '#000000',
                  position: 'absolute',
                  top: '10%',
                  left: '0%',
                }}
              >
                Name: {name}
              </Typography>

              {/* Email box */}
              <Typography
                variant="h6"
                border="3px solid #757575E8"
                borderRadius="1vw 1vw 1vw 1vw"
                padding="1vw"
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '1.5vw',
                  fontWeight: 600,
                  lineHeight: '1',
                  textAlign: 'left',
                  width: '100%',
                  height: '50%',
                  color: '#000000',
                  position: 'absolute',
                  top: '160%',
                  left: '0%',
                }}
              >
                Email: {email}
              </Typography>
            </Box>

            {/* 6 Boxes at the bottom */}
            <Grid
              container spacing={2}
              width="65%"
              height="55%"
              bgcolor="#D9D9D9"
              position="absolute"
              top="45%"
              left="35%"
            >
              {/* Left column */}
              <Grid item xs={4}>
                {/* Phone Number box */}
                <Box
                  width="150%"
                  height="20%"
                  bgcolor="#D9D9D9"
                  marginRight="1%"
                  marginTop="2%"
                  display="flex"
                  alignItems="center"
                  paddingLeft="5%"
                >
                  <img src={phoneIcon} width="15%" alt="Phone Icon" style={{ marginRight: '0.5rem' }} />
                  <TextField
                    id="phone"
                    label="Phone Number"
                    variant="outlined"
                    value={phoneNumber}
                    disabled
                  />
                </Box>
                {/* Snapchat box */}
                <Box
                  width="150%"
                  height="20%"
                  bgcolor="#D9D9D9"
                  marginRight="1%"
                  marginTop="13%"
                  display="flex"
                  alignItems="center"
                  paddingLeft="5%"
                >
                  <img src={snapchatIcon} width="15%" alt="Snapchat Icon" style={{ marginRight: '0.5rem' }} />
                  <TextField
                    id="snapchat"
                    label="Snapchat"
                    variant="outlined"
                    value={snap}
                    disabled
                  />
                </Box>
                {/* Instagram box */}
                <Box
                  width="150%"
                  height="20%"
                  bgcolor="#D9D9D9"
                  marginTop="13%"
                  display="flex"
                  alignItems="center"
                  paddingLeft="5%"
                >
                  <img src={instagramIcon} width="15%" alt="Instagram Icon" style={{ marginRight: '0.5rem' }} />
                  <TextField
                    id="instagram"
                    label="Instagram"
                    variant="outlined"
                    value={instagram}
                    disabled
                  />
                </Box>
              </Grid>
              {/* Right column */}
              <Grid item xs={4}>
                {/* Location 1 box */}
                <Box
                  width="150%"
                  height="20%"
                  bgcolor="#D9D9D9"
                  marginRight="1%"
                  marginTop="2%"
                  display="flex"
                  alignItems="center"
                  paddingLeft="50%"
                >
                  <img src={locationIcon} width="10%" alt="Location Icon" style={{ marginRight: '0.5rem' }} />
                  <TextField
                    id="location1"
                    label="Location 1"
                    variant="outlined"
                    value={location1}
                    disabled
                  />
                </Box>
                {/* Location 2 box */}
                <Box
                  width="150%"
                  height="20%"
                  bgcolor="#D9D9D9"
                  marginRight="1%"
                  marginTop="13%"
                  display="flex"
                  alignItems="center"
                  paddingLeft="50%"
                >
                  <img src={locationIcon} width="10%" alt="Location Icon" style={{ marginRight: '0.5rem' }} />
                  <TextField
                    id="location2"
                    label="Location 2"
                    variant="outlined"
                    value={location2}
                    disabled
                  />
                </Box>
                {/* Location 3 box */}
                <Box
                  width="150%"
                  height="20%"
                  bgcolor="#D9D9D9"
                  marginTop="13%"
                  display="flex"
                  alignItems="center"
                  paddingLeft="50%"
                >
                  <img src={locationIcon} width="10%" alt="Location Icon" style={{ marginRight: '0.5rem' }} />
                  <TextField
                    id="location3"
                    label="Location 3"
                    variant="outlined"
                    value={location3}
                    disabled
                  />
                </Box>
              </Grid>


            </Grid>

          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;