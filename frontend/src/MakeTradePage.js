import React, { useState } from "react";
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

// Firebase 
import {useAuth} from './AuthContext';


const MakeTrade = () => {
    const backendURL = process.env.REACT_APP_BACKEND;
    const location = useLocation();
    const userData = location.state.clothingData;

    const [burgerStatus, setBurgerStatus] = useState(false);
    const [clothingCardStatus, setclothingCardStatus] = useState(false);
    const [tradeStatus, setTradeStatus] = useState(false);
    const [borderSize, setBorderSize] = useState(0); 
    const [modalTruthValue, setModalTruthValue] = useState(false); 

    const {currentUser} = useAuth();
    const [userInventoryData, setUserInventoryData] = useState([]); 

    const [borderStatus, setBorderStatus] = useState(false); 
    const [borderSizes, setBorderSizes] = useState([]); 
    const [selectedTradeOption, setSelectedTradeOption] = useState(""); 

    async function handleConfirmTrade() {
        try {
            const idToken = await currentUser.getIdToken(); 

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = "Bearer " +  idToken; 
            myHeaders.append("Authorization", token);

            const raw = JSON.stringify({
                "userOneProductDocument":  selectedTradeOption.id,
                "userTwoProductDocument": userData.id,
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const repsonse = await fetch(`${backendURL}/offer/place_offer`, requestOptions); 
            const result = await repsonse.json(); 
            setModalTruthValue(true); 
        } catch(e) {
            // Catch Error
        }
    }



    const getUserListings = async () => {
        console.log("another test"); 
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
            
            const url = `${backendURL}/inventory/view_inventory/` + currentUser.email; 
            const response = await fetch(url, requestOptions); 
            const data = await response.json();
            if (Array.isArray(data)) {
              setUserInventoryData(data); 
            } else {
              // Catch Error
            }
        } catch(e) {
            console.log(e); 
        }

        }
      }

      async function handleTradeRequest() {
        setTradeStatus(true); 
        await getUserListings(); 
        handleBorderSizeChange(); 
      }

      function handleBorderSizeChange(number) {
            const borderSize = []; 
            for(let i = 0; i < userInventoryData.length; i++) {
                if(i !== number) {
                    borderSize.push(0); 
                } else {
                    borderSize.push(5);
                    setSelectedTradeOption(userInventoryData[number]);
                }
            }
            setBorderSizes(borderSize); 
            setBorderStatus(true); 
      }

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
                        {"Seller: " + userData.userDocumentReference.Name}
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
                    <Box p={1} onClick={() => handleTradeRequest()} sx={{backgroundColor: "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center", width: "208px"}}>
                        <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                            Make a Trade!
                        </Typography>
                    </Box>
                    {borderStatus && 
                         <Box p={1} sx={{backgroundColor: "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center", width: "208px"}}>
                            <Typography onClick={() => handleConfirmTrade()} variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                Confirm Trade! 
                            </Typography>
                        </Box>
                    }
                </Stack> 
            </Stack>
        {tradeStatus && 
            <Box p={2} backgroundColor="#D9D9D9" overflow="scroll" height="90vh">
                <Stack direction="column" gap={"20px"}>
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={() => setTradeStatus(false)}>
                            <CloseIcon/>
                        </IconButton> 
                    </Box>
                    <Typography onClick={() => setTradeStatus(true)} variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Select an Item to Trade
                    </Typography>
                    {userInventoryData.length !== 0 && 
                        userInventoryData.map((item, index) => (
                            <ClothingCard onClickFunction={() => handleBorderSizeChange(index)} borderSize={borderSizes[index]} userData={userInventoryData[index]}/> 
                        ))
                    }
                </Stack>
            </Box>
        }
        {modalTruthValue &&  
            <Modal modalValue={modalTruthValue} modalText={"Trade Request Sent!"} displayImage={true}/>
        }
      </Stack>
    </Box>
  )
}
export default MakeTrade
