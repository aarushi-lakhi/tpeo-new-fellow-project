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

import "./AddClothingItemCSS.css"

function AddClothingItem() {
    const [burgerStatus, setBurgerStatus] = useState(false);
    const [clothingCardStatus, setclothingCardStatus] = useState(false);
    const [imageView, setImageView] = useState(false); 
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState('');
    const [tradeStatus, setTradeStatus] = useState(false);
    const [modalTruthValue, setModalTruthValue] = useState(false); 

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
            <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" sx={{position: "sticky", backgroundColor: "#A5B9E0",  zIndex: "mobile stepper"}}>
                <Box p={1.5} sx={{backgroundColor: "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Barter Buddies
                    </Typography>
                </Box>
                <NavBarButtons/>
                <IconButton onClick={() => setclothingCardStatus(true)}>
                    <AccountCircleIcon sx={{fontSize: {xs: "65px"},  display: {xs: 'none', md: 'block'}}}/>
                </IconButton> 
                <IconButton onClick={() => setBurgerStatus(true)}>
                    <MenuIcon sx={{fontSize: {xs: "65px"},  display: {xs: 'block', md: 'none' }}}/>
                </IconButton> 
                {burgerStatus && 
                <Box sx={{width: "100vw", height: "100vh", backgroundColor: "#A5B9E0", zIndex: "tooltip", position: 'fixed', top: 0, left: 0}}>
                    <Box p={1} sx={{display: "flex", justifyContent:"flex-end", alignItems:"flex-end"}}> 
                    <IconButton onClick={() => setBurgerStatus(false)}>
                        <CloseIcon sx={{fontSize: "50px"}}/>
                    </IconButton> 
                    </Box>
                    <Box sx={{margin: 2, display: "flex", justifyContent:"center", alignItems:"center"}}> 
                        <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                            Menu
                        </Typography>
                    </Box>
                    <Stack p={2} direction="column" justifyContent="flex-start" alignItems="flex-start" gap="30px">
                    <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Profile
                    </Typography>
                    <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Clothes
                    </Typography>
                    <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Offers
                    </Typography>
                    <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Listings 
                    </Typography>
                    </Stack>
                </Box>
                }
            </Stack>
            <Stack direction="row" alignItems="space-between" justifyContent="space-between">
            {/* p={2}  under*/}
                <Stack flex={0} className="add-item-stack" p={2} direction="column" gap="20px" backgroundColor="#A5B9E0">
                    <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                        Add an Item 
                    </Typography>
                    <Stack direction="row" gap="20px">
                        {!imageView && 
                            <Box display="flex" alignItems="center" justifyContent="center" width="100px" height="100px" sx={{cursor: "pointer", backgroundColor: "#D9D9D9"}} onClick={handleBoxClick}> 
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
                            <Box display="flex" alignItems="center" justifyContent="center" width="100px" height="100px" sx={{cursor: "pointer", backgroundColor: "#D9D9D9"}} onClick={handleBoxClick}> 
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
                            <Box display="flex" alignItems="center" justifyContent="center" width="100px" height="100px" sx={{cursor: "pointer", backgroundColor: "#D9D9D9"}} onClick={handleBoxClick}> 
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
                    <TextField id="outlined-basic" label="Estimated Price" variant="outlined" />
                    <DropDownMenu text="Article of Clothing"/>
                    <DropDownMenu text="Size"/>
                    <TextField
                        placeholder="Description"
                        multiline
                        rows={2}
                        maxRows={4}
                    />
                    <Box p={2} backgroundColor="#D9D9D9"> 
                        <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: "#000000"}}>
                            Add Listing
                        </Typography>
                    </Box> 
                    
                </Stack> 
                <Stack className="responsive-stack" direction={{ xs: 'column', md: 'row'}}>
                    <Stack flex={1} direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" gap={"75px"}> 
                        <ImageCarousel/>
                        <Stack direction="column" gap={"25px"} >
                            <Typography variant="h3" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000', maxWidth:"450px", wordWrap: "break-word"}}>
                                Centenial DECA Shirt gang
                            </Typography>
                            <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                                Size: M
                            </Typography>
                            <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                                Estimated Value: $1000
                            </Typography>
                            <Typography wrap variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000', maxWidth:"350px", wordWrap: "break-word"}}>
                                Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            </Typography>
                            <Box p={1} sx={{backgroundColor: "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center", width: "208px"}}>
                                <Typography onClick={() => setTradeStatus(true)} variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                    Make a Trade!
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
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