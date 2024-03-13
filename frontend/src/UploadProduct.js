import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material'; 

const NewItemPage = () => {
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [clothingArticle, setClothingArticle] = useState('');
  const [estimatedMonetaryValue, setEstimatedMonetaryValue] = useState(0);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Construct the item object
      const newItem = {
        description,
        size,
        clothingArticle,
        estimatedMonetaryValue,
        images // Array of image references
      };

      // Send a POST request to the backend to upload the item
      const response = await fetch('http://localhost:4000/upload_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        alert('Item uploaded successfully!');
        navigate('/profile'); // Redirect to profile page after successful upload
      } else {
        alert('Failed to upload item.');
      }
    } catch (error) {
      console.error('Error uploading item:', error);
      alert('An error occurred while uploading the item.');
    }
  };

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
      <input
        type="file"
        multiple
        onChange={(e) => setImages([...images, ...Array.from(e.target.files)])}
      />
      <Button onClick={handleSubmit} variant="outlined">Upload Item</Button>
    </Box>
  );
};

export default NewItemPage;
