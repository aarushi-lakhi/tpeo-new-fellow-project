import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from './firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { InputLabel, Button, Box, TextField, Grid, Item } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAuth } from './AuthContext';
import phoneIcon from './components/SignUp_Icons/phone_icon.png';
import snapchatIcon from './components/SignUp_Icons/snapchat_icon.png';
import instagramIcon from './components/SignUp_Icons/instagram_icon.png';
import locationIcon from './components/SignUp_Icons/location_icon.png';
import NavBar from './components/NavBar';

const Profile = () => {
    const backendURL = process.env.REACT_APP_BACKEND;

    const { currentUser } = useAuth();
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storage, "images/");
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
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
        console.log("fetch pf");
              if(currentUser) {
                try {
                  const idToken = await currentUser.getIdToken();
                  const myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  const token = "Bearer " +  idToken;
                  myHeaders.append("Authorization", token);
                  const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                  };
                  const url = `${backendURL}/user/profile_information/${currentUser.email}`;
                  const response = await fetch(url, requestOptions);
                  const data = await response.json();
                  setSnap(data.snapchat);
                  setInstagram(data.instagram);
                  setPhoneNumber(data.phoneNumber)
                  setLocation1(data.Location1);
                  setLocation2(data.Location2);
                  setLocation3(data.Location3);
              } catch (error) {
                  console.log('Error fetching profile information:', error);
              }
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
    const updateProfileInformation = async (profilePictureUrl) => {
        try {
          const idToken = await currentUser.getIdToken();
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          const token = "Bearer " +  idToken;
          myHeaders.append("Authorization", token);
          const raw = JSON.stringify({
            "userEmail": email,
            "userSnapchat": snap,
            "userInstagram": instagram,
            "userPhoneNumber": phoneNumber,
            "userProfilePicture": profilePictureUrl,
            "location1": location1,
            "location2": location2,
            "location3": location3,
        });
          const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow"
          };
          const fetchUrl = `${backendURL}/user/update_user_information`;
          const response = await fetch(fetchUrl, requestOptions);
          const data = await response.text();
          console.log(data);
      } catch(e) {
          // ERROR
          console.log(e);
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageUpload(file);
    };

    const handleSave = async () => {
        try {
            // const idToken = await currentUser.getIdToken();
            if (imageUpload) {
                await uploadImage();
            }
            await updateProfileInformation(profilePictureUrl);
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    return (
        <div>
            {/* NavBar component */}
            <NavBar isProfilePage />

            {/* Main content */}
            <Box
                width="100%"
                height="100%"
                top="10%"
                bgcolor="#A5B9E0"
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                marginTop="5vw"
            >
                <Box
                    width="100%"
                    height="100%"
                    bgcolor="#A5B9E0"
                    position="absolute"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    marginTop="37vw"
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
                            {/* Conditionally render the profile picture */}
                            {profilePictureUrl ? (
                                <img src={profilePictureUrl} alt="Profile Picture" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                            ) : (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                        id="imageUploadInput"
                                    />
                                    <label htmlFor="imageUploadInput" style={{ cursor: 'pointer' }}>
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
                                                top: '50%',
                                            }}
                                        >
                                            Add/update profile picture
                                        </Typography>
                                    </label>
                                </>

                            )}
                        </Box>

                        <Button 
                            sx={{
                                fontFamily: 'Poppins',
                                fontSize: '1.75vw',
                                fontWeight: 500,
                                lineHeight: '1',
                                textAlign: 'center',
                                color: '#1A3F7D',
                                position: 'absolute',
                                top: '80%',
                                left: '8%',
                            }}
                            onClick={handleSave}
                        >
                            Save Changes
                        </Button>

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
                                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
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
                                        value={snap} onChange={(e) => setSnap(e.target.value)}
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
                                        value={instagram} onChange={(e) => setInstagram(e.target.value)}
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
                                    <img src={locationIcon} width="15%" alt="Location Icon" style={{ marginRight: '0.5rem' }} />
                                    <TextField
                                        id="location1"
                                        label="Location 1"
                                        variant="outlined"
                                        value={location1} onChange={(e) => setLocation1(e.target.value)}
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
                                    <img src={locationIcon} width="15%" alt="Location Icon" style={{ marginRight: '0.5rem' }} />
                                    <TextField
                                        id="location2"
                                        label="Location 2"
                                        variant="outlined"
                                        value={location2} onChange={(e) => setLocation2(e.target.value)}
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
                                    <img src={locationIcon} width="15%" alt="Location Icon" style={{ marginRight: '0.5rem' }} />
                                    <TextField
                                        id="location3"
                                        label="Location 3"
                                        variant="outlined"
                                        value={location3} onChange={(e) => setLocation3(e.target.value)}
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
