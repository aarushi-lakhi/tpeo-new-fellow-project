import React, { useState } from "react";
import styled from "styled-components";
import { Button, Box, Stack, TextField, Paper, MenuItem, Select, InputLabel } from '@mui/material';
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
import ArrowPicture from "./components/OfferArrow.png"

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

import ListingPreviewImage from "./components/YourListingPreviewImage.png"

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import ConfirmTradeModal from "./components/ConfirmTradeModal";

const Offers = () => {
    const [burgerStatus, setBurgerStatus] = useState(false);
    const [clothingCardStatus, setclothingCardStatus] = useState(false);
    const [modalStatus, setModalStatus] = useState(false); 

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
            <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}} pt={3} pl={3}>
                Pending Offers 
            </Typography>
            <Stack direction="column" gap={"24px"}>
                <Stack direction="row" justifyContent={"center"} gap={"400px"}>
                    {/* <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Their Offer 
                    </Typography>
                    <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Your Item 
                    </Typography> */}
                </Stack>
                <Stack gap={"24px"}> 
                    <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="center" alignItems="center" gap={"48px"}>
                        <Stack direction={{ xs: 'column',  md: 'row' }} justifyContent={"center"} alignItems={"center"} gap={"24px"}>
                            <Stack direction="column" gap={"24px"}>
                                <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                    Their Offer
                                </Typography>
                                <ClothingCard/>
                            </Stack> 
                            <Box component="img" sx={{ height: "200px", display: 'block', overflow: 'hidden', width: '200px' }} src={ArrowPicture}/>
                            <Stack direction="column" gap={"24px"}>
                                <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                    Your Item
                                </Typography>
                                <ClothingCard/>
                            </Stack> 
                        </Stack> 
                        <Stack direction="row" gap="24px">
                            <Stack direction="column" justifyContent="center" alignItems="center" gap={"8px"} backgroundColor="#D9D9D9" height="75px" width="150px">
                                <ThumbDownIcon/>
                                <Typography variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                    Not Intersted
                                </Typography>
                            </Stack> 
                            <Stack direction="column" justifyContent="center" alignItems="center" gap={"8px"} backgroundColor="#D9D9D9" height="75px" width="150px">
                                <ThumbUpIcon/>
                                <Typography onClick={() => setModalStatus(true)}variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                    Interested
                                </Typography>
                            </Stack> 
                        </Stack> 
                    </Stack>
                    <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="center" alignItems="center" gap={"48px"}>
                        <Stack direction={{ xs: 'column',  md: 'row' }} justifyContent={"center"} alignItems={"center"} gap={"24px"}>
                            <ClothingCard/>
                            <Box component="img" sx={{ height: "200px", display: 'block', overflow: 'hidden', width: '200px' }} src={ArrowPicture}/>
                            <ClothingCard/>
                        </Stack> 
                        <Stack direction="row" gap="24px">
                            <Stack direction="column" justifyContent="center" alignItems="center" gap={"8px"} backgroundColor="#D9D9D9" height="75px" width="150px">
                                <ThumbDownIcon/>
                                <Typography variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                    Not Intersted
                                </Typography>
                            </Stack> 
                            <Stack direction="column" justifyContent="center" alignItems="center" gap={"8px"} backgroundColor="#D9D9D9" height="75px" width="150px">
                                <ThumbUpIcon/>
                                <Typography variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                    Interested
                                </Typography>
                            </Stack> 
                        </Stack> 
                    </Stack>
                    <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="center" alignItems="center" gap={"48px"}>
                        <Stack direction={{ xs: 'column',  md: 'row' }} justifyContent={"center"} alignItems={"center"} gap={"24px"}>
                            <ClothingCard/>
                            <Box component="img" sx={{ height: "200px", display: 'block', overflow: 'hidden', width: '200px' }} src={ArrowPicture}/>
                            <ClothingCard/>
                        </Stack> 
                        <Stack direction="row" gap="24px">
                            <Stack direction="column" justifyContent="center" alignItems="center" gap={"8px"} backgroundColor="#D9D9D9" height="75px" width="150px">
                                <ThumbDownIcon/>
                                <Typography variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                    Not Intersted
                                </Typography>
                            </Stack> 
                            <Stack direction="column" justifyContent="center" alignItems="center" gap={"8px"} backgroundColor="#D9D9D9" height="75px" width="150px">
                                <ThumbUpIcon/>
                                <Typography variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                    Interested
                                </Typography>
                            </Stack> 
                        </Stack> 
                    </Stack>
                </Stack>
            </Stack>
            {modalStatus &&  
                <ConfirmTradeModal modalValue={modalStatus} infoDisplay={true}/>
            }
        </Box>
  )
}

export default Offers
