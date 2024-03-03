import React from 'react';
import {useState, useEffect} from 'react';
import {storage} from './firebaseConfig';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material'; // Import Box and TextField
import Typography from '@mui/material/Typography';
import {useAuth} from './AuthContext';


const Profile = () => {
  const {handleGoogleSignIn} = useAuth();
  const [imageUpload, setImageUpload] =  useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null) {
      return;
    }

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      //alert("Image Uploaded");
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
  
  return (
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
        <Typography variant="h3" component="h2">
            Profile Picture
        </Typography>
        </div>
        <TextField id="outlined-basic" label="Name" variant="outlined" disabled />
        {/* <TextField id="outlined-basic" label="Email" variant={currentUser} disabled /> */}
        <TextField id="outlined-basic" label="Snapchat (Optional)" variant="outlined" />
        <TextField id="outlined-basic" label="Instagram (Optional)" variant="outlined" />
        <TextField id="outlined-basic" label="Phone-Number (Optional)" variant="outlined" />
        
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button onClick={uploadImage}>Upload Image</button>

        {imageList.map((url) => {
          return <img key={url} src={url} alt="Uploaded" />;
        })}
      </Box>
  );
};

export default Profile;
