import React, { useState } from "react";
import styled from "styled-components";
import { Button, Box, Stack, TextField, Paper} from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import NavBarButtons from './components/NavBarButtons';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ClothingCard from './components/ClothingCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

// Clean this up later 
import Shirt from "./components/ClothingArticlesImages/Shirt.png"
import ActiveWear from "./components/ClothingArticlesImages/Activewear.png"
import Dresses from "./components/ClothingArticlesImages/Dresses.png"
import Hoodies from "./components/ClothingArticlesImages/Hoodies.png"
import Pants from "./components/ClothingArticlesImages/Pants.png"
import Shoes from "./components/ClothingArticlesImages/Shoes.png"
import Suits from "./components/ClothingArticlesImages/Suits.png"
import Swimwear from "./components/ClothingArticlesImages/Swimwear.png"

// Formgroup stuff 
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import ImageCarousel from './components/ImageCarousel'
import Modal from "./components/ChildModal"

import PortraitShirt from "./components/PortraitShirt.jpg"
import DropDownMenu from "./components/DropDownMenu"


function AddClothingItem() {
    const [imageView, setImageView] = useState(false); 
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState('');

    const handleBoxClick = () => {
        document.getElementById('hidden-file-input').click();
      };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        setImageView(true);  
      }
    };
  
    return (
      <Box>
        <Box>
            <Stack direction="column" p={2} gap="20px">
                <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                    Add an Item 
                </Typography>
                <Stack direction="row" gap="20px">
                    {!imageView && 
                        <Box display="flex" alignItems="center" justifyContent="center" width="100px" height="100px" sx={{cursor: "pointer", backgroundColor: "orange"}} onClick={handleBoxClick}> 
                            <input type="file" id="hidden-file-input" hidden accept="image/*" onChange={handleFileChange} style={{ display: 'none' }}/>
                            <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000' }}>
                                Add Photo
                            </Typography>
                         </Box>
                    }
                    {imageView && 
                        <Box sx={{position: "relative", height: "100px", width: '100px', backgroundColor: "red", overflow: 'hidden'}}>
                            <Box component="img" sx={{height: "100px", display: 'block', overflow: 'hidden', width: '100px'}} src={PortraitShirt}/>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", right: 0, top: 0, width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%' }}>
                                <IconButton onClick={() => setImageView(false)}>
                                    <CloseIcon sx={{fontSize: "15px"}}/>
                                </IconButton> 
                            </Box>
                        </Box>
                    }
                    {!imageView && 
                        <Box display="flex" alignItems="center" justifyContent="center" width="100px" height="100px" sx={{cursor: "pointer", backgroundColor: "orange"}} onClick={handleBoxClick}> 
                            <input type="file" id="hidden-file-input" hidden accept="image/*" onChange={handleFileChange} style={{ display: 'none' }}/>
                            <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000' }}>
                                Add Photo
                            </Typography>
                         </Box>
                    }
                    {imageView && 
                        <Box sx={{position: "relative", height: "100px", width: '100px', backgroundColor: "red", overflow: 'hidden'}}>
                            <Box component="img" sx={{height: "100px", display: 'block', overflow: 'hidden', width: '100px'}} src={PortraitShirt}/>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", right: 0, top: 0, width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%' }}>
                                <IconButton onClick={() => setImageView(false)}>
                                    <CloseIcon sx={{fontSize: "15px"}}/>
                                </IconButton> 
                            </Box>
                        </Box>
                    }
                    {!imageView && 
                        <Box display="flex" alignItems="center" justifyContent="center" width="100px" height="100px" sx={{cursor: "pointer", backgroundColor: "orange"}} onClick={handleBoxClick}> 
                            <input type="file" id="hidden-file-input" hidden accept="image/*" onChange={handleFileChange} style={{ display: 'none' }}/>
                            <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000' }}>
                                Add Photo
                            </Typography>
                         </Box>
                    }
                    {imageView && 
                        <Box sx={{position: "relative", height: "100px", width: '100px', backgroundColor: "red", overflow: 'hidden'}}>
                            <Box component="img" sx={{height: "100px", display: 'block', overflow: 'hidden', width: '100px'}} src={PortraitShirt}/>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", right: 0, top: 0, width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%' }}>
                                <IconButton onClick={() => setImageView(false)}>
                                    <CloseIcon sx={{fontSize: "15px"}}/>
                                </IconButton> 
                            </Box>
                        </Box>
                    }
                </Stack>
                <TextField id="outlined-basic" label="Title" variant="outlined" />
                <Stack direction="row" justifyContent="space-between">
                    <TextField id="outlined-basic" label="Estimated Price" variant="outlined" />
                    <DropDownMenu text="Article of Clothing"/>
                </Stack>    
                <DropDownMenu text="Size"/>
                <TextField
                    placeholder="Description"
                    multiline
                    rows={2}
                    maxRows={4}
                />
            </Stack> 
        </Box>
        {/* <Box src={imageView ? imagePreviewUrl : undefined} component={imageView ? "img" : "div"} display="flex" alignItems="center" justifyContent="center" width="100px" height="100px" sx={{cursor: "pointer",  backgroundColor: "orange" }} onClick={handleBoxClick}> 
            {!imageView && 
                <Box> 
                    <input type="file" id="hidden-file-input" hidden accept="image/*" onChange={handleFileChange} style={{ display: 'none' }}/>
                    <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Add Photo
                    </Typography>
                </Box> 
            }
        </Box> */}
    </Box> 
    );
  }

export default AddClothingItem

// <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />


{/* <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleFileChange}/>
        </Button>
        {imagePreviewUrl && (
          <Box mt={2} display="flex" justifyContent="center">
            <Box component="img" sx={{height: "100px", width: "100px", display: 'block', overflow: 'hidden'}} src={imagePreviewUrl}/>
          </Box>
        )} */}