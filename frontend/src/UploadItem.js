import React, { useState, useEffect } from 'react';
import {storage} from './firebaseConfig';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';
import {useAuth} from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material'; 

const NewItemPage = () => {
  const backendURL = process.env.REACT_APP_BACKEND;

  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [clothingArticle, setClothingArticle] = useState('');
  const [estimatedMonetaryValue, setEstimatedMonetaryValue] = useState(0);
  const [images, setImages] = useState([]);
  
  const {currentUser} = useAuth();
  const [imageUpload, setImageUpload] =  useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Construct the item object
      const newItem = {
        userEmail: currentUser.email,
        description,
        size,
        clothingArticle,
        estimatedMonetaryValue,
        images // Array of image references
      };

      // Send a POST request to the backend to upload the item
      const url = `${backendURL}/upload_item`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        alert('Item uploaded successfully!');
      } else {
        alert('Failed to upload item.');
      }
    } catch (error) {
      console.error('Error uploading item:', error);
      alert('An error occurred while uploading the item.');
    }
  };


  //Upload Images of Item
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
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormControl variant="outlined">
        <InputLabel id="size-label">Size</InputLabel>
        <Select
          labelId="size-label"
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          label="Size"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="S">Small</MenuItem>
          <MenuItem value="M">Medium</MenuItem>
          <MenuItem value="L">Large</MenuItem>
          <MenuItem value="XL">Extra Large</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel id="clothing-article-label">Clothing Article</InputLabel>
        <Select
          labelId="clothing-article-label"
          id="clothing-article"
          value={clothingArticle}
          onChange={(e) => setClothingArticle(e.target.value)}
          label="Clothing Article"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Shirt">Shirt</MenuItem>
          <MenuItem value="Pants">Pants</MenuItem>
          <MenuItem value="Dress">Dress</MenuItem>
          <MenuItem value="Jacket">Jacket</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="Estimated Monetary Value"
        variant="outlined"
        value={estimatedMonetaryValue}
        onChange={(e) => setEstimatedMonetaryValue(e.target.value)}
      />
      {/* <input
        type="file"
        multiple
        onChange={(e) => setImages([...images, ...Array.from(e.target.files)])}
      /> */}
      <Button
        variant="contained"
        component="label"
        >
            Select Item Image
            <input
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                    alert("Successfully chose image - Click upload image")
                }}
                hidden
            />
        </Button>

      <Button onClick={uploadImage} variant="outlined">Upload Item Image</Button>
      
      <Button onClick={handleSubmit} variant="outlined">Update Item information</Button>
    </Box>
  );
};

export default NewItemPage;
