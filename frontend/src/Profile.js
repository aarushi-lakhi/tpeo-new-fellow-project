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
        console.log("hello");
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
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h3" component="h2">
                Profile Page
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={updateProfileInformation} variant="outlined">Update Profile</Button>
          </Grid>
        </Grid>
        </div>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={name} disabled />
        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} disabled />
        <TextField id="outlined-controlled" label="Snapchat (optional)" variant="outlined" value={snap}
          onChange={(event) => {
            setSnap(event.target.value); 
          }}
        />
        <TextField id="outlined-controlled" label="Instagram (optional)" variant="outlined" value={instagram}
          onChange={(event) => {
            setInstagram(event.target.value); 
          }}
        />
        <TextField id="outlined-controlled" label="Phone-Number (optional)" variant="outlined" value={phoneNumber}
          onChange={(event) => {
            setPhoneNumber(event.target.value); 
          }}
        />
        {/* <TextField id="outlined-basic" label="Snapchat (Optional)" variant="outlined" inputProps={{ defaultValue: {snap}}}/>
        <TextField id="outlined-basic" label="Instagram (Optional)" variant="outlined" defaultValue={userInfo ? userInfo.Instagram : "King"} />
        <TextField id="outlined-basic" label="Phone-Number (Optional)" variant="outlined" defaultValue={userInfo ? userInfo.PhoneNumber : "King"} /> */}

        {/* <input
            type="file"
            onChange={(event) => {
                setImageUpload(event.target.files[0]);
            }}
        /> */}
        <Button
        variant="contained"
        component="label"
        >
            Upload Profile Picture
            <input
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                    alert("Successfully chose image - Click upload image")
                }}
                hidden
            />
        </Button>
        
        <Button onClick={uploadImage} variant="outlined">Upload Image</Button>

        {imageList.map((url) => {
          return <img key={url} src={url} alt="Uploaded" />;
        })}
      </Box>
    </div>
  );
};

export default Profile;