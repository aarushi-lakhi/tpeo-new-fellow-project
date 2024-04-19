import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Box, Stack } from '@mui/material';
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

import { useLocation } from 'react-router-dom';
import NavBar from "./components/NavBar"

import {useAuth} from './AuthContext';


const PreviewPage = () => {
    const location = useLocation();
    const userData = location.state.clothingData;
    const sellerTextValue = location.state.sellerTextValue;

    const [burgerStatus, setBurgerStatus] = useState(false);

    const [sellerText, setSellerText] = useState(""); 

    const {currentUser} = useAuth();

    useEffect(() => {
        if(sellerTextValue === undefined) {
            setSellerText(userData.userDocumentReference.Name); 
        } else if(sellerTextValue) {
            setSellerText(currentUser.displayName); 
        }
    }, []);


  return (
    <Box>
        <NavBar/>
        <Stack direction={{ xs: 'column', md: 'row' }}>
            <Stack flex={1} direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" mt={2} gap={"75px"}> 
                <ImageCarousel srcArray={userData.clothingImages}/>
                <Stack direction="column" gap={"25px"}>
                    <Typography variant="h3" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                        {userData.title}
                    </Typography>
                    <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                        {"Seller: " + sellerText}
                    </Typography>
                    <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                        {"Size: " + userData.size}
                    </Typography>
                    <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                        {userData.clothingArticle}
                    </Typography>
                    <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                        {userData.gender}
                    </Typography>
                    <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                        {"Estimated Price: " + userData.estimatedMonetaryValue}
                    </Typography>
                    <Typography wrap variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000', maxWidth:"350px", wordWrap: "break-word"}}>
                        {"Description: " + userData.description}
                    </Typography>
                </Stack> 
            </Stack>
        </Stack>
    </Box>
  )
}

export default PreviewPage
