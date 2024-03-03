import React from 'react';
import {useState, useEffect} from 'react';
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

  const [name,setName] = useState("default"); 
  const [email,setEmail] = useState("default"); 


  const uploadImage = () => {
    if (imageUpload == null) {
      return;
    }

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      alert("Image Uploaded");
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      })
    })
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
            <Button variant="outlined">Update Profile</Button>
          </Grid>
        </Grid>
        </div>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={name} disabled />
        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} disabled />
        <TextField id="outlined-basic" label="Snapchat (Optional)" variant="outlined" />
        <TextField id="outlined-basic" label="Instagram (Optional)" variant="outlined" />
        <TextField id="outlined-basic" label="Phone-Number (Optional)" variant="outlined" />

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
