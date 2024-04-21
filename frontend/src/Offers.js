import React, { useState, useEffect } from "react";
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

import NavBar from "./components/NavBar"

// Firebase 
import {useAuth} from './AuthContext';

import { useNavigate } from 'react-router-dom';



const Offers = () => {
    const backendURL = process.env.REACT_APP_BACKEND;
    const [burgerStatus, setBurgerStatus] = useState(false);
    const [clothingCardStatus, setclothingCardStatus] = useState(false);
    const [modalStatus, setModalStatus] = useState(false); 
    const [modalProfileName, setModalProfileName] = useState(""); 


  const navigate = useNavigate();
  const {currentUser} = useAuth();
  const [userInventoryData, setUserInventoryData] = useState([]); 

  
  function navigateToPreview(specificClothingData) {
    navigate("/preview-page", {state: {clothingData: specificClothingData}});
  }

  const [pendingOffers, setPendingOffers] = useState([]); 
  const [offersYouMade, setOffersYouMade] = useState([]); 
  const [myNoOffers, setMyNoOffers] = useState([]); 
  const [successfulTransactions, setSuccessfulTransactions] = useState([]); 

  useEffect(() => {
    const getUserInventory = async () => {
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
            
            const url = `${backendURL}/inventory/view_complete_inventory/` + currentUser.email; 
            const response = await fetch(url, requestOptions); 
            const data = await response.json();
            if (Array.isArray(data)) {
                const pendingOffersCopy = []; 
                const offersYouMadeCopy = []; 
                const myNoOffersCopy = []; 

              for(let i = 0; i < data.length; i++) {
                const offeredItems = data[i].offered; 
                if(offeredItems.length !== 0) {
                    for(let j = 0; j < offeredItems.length; j++) {
                        const oneOffer = []; 
                        oneOffer.push(offeredItems[j]); 
                        oneOffer.push(data[i]);  
                        pendingOffersCopy.push(oneOffer); 
                    }
                } else {
                    myNoOffersCopy.push(data[i]); 
                }

                const offeringClothes = data[i].offering; 
                if(offeringClothes.length !== 0) {
                    for(let j = 0; j < offeringClothes.length; j++) {
                        const oneOffer = []; 
                        oneOffer.push(offeringClothes[j]); 
                        oneOffer.push(data[i]); 
                        offersYouMadeCopy.push(oneOffer); 
                    }
                }
              }
              setPendingOffers(pendingOffersCopy); 
              setOffersYouMade(offersYouMadeCopy); 
              setMyNoOffers(myNoOffersCopy); 

            } else {
              // Catch Error
            }
        } catch(e) {
            // ERROR 
            console.log(e); 
        }
      }
    }
    getUserInventory(); 
  }, [currentUser])


  useEffect(() => {
    const getUserSuccessfulTrades = async () => {
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
            
            const url = `${backendURL}/inventory/successful_trades/` + currentUser.email; 
            const response = await fetch(url, requestOptions); 
            const data = await response.json();
            if (Array.isArray(data)) {
                setSuccessfulTransactions(data); 
            } else {
              // Catch Error
            }
        } catch(e) {
            // ERROR 
            console.log(e); 
        }
      }
    }
    getUserSuccessfulTrades(); 
  }, [currentUser])


  const [theirOffer, setTheirOffer] = useState(""); 
  const [yourItem, setYourItem] = useState(""); 

  function tradeRequestInitiated(index) {
    setTheirOffer(pendingOffers[index][0]); 
    setYourItem(pendingOffers[index][1]); 
    setModalStatus(true); 
  }


  const [removeOfferStatus, setRemoveOfferStatus] = useState(false);

  async function handleRemoveTrade(index) {
    try {
        const idToken = await currentUser.getIdToken(); 

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = "Bearer " +  idToken; 
        myHeaders.append("Authorization", token);

        const raw = JSON.stringify({  
            "theirItemProductID":  offersYouMade[index][0].id,
            "yourItemProductID":  offersYouMade[index][1].id,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const repsonse = await fetch(`${backendURL}/offer/reverse_offer`, requestOptions); 
        const result = await repsonse.json();
        setRemoveOfferStatus(true); 

    } catch(e) { 
      console.log(e); 
      console.log("there was an error"); 
        // Catch Error
    }
  }

  return (
        <Box>
            <NavBar/>
            <Stack direction="column" gap={"24px"}>
                <Stack gap={"24px"}> 
                    {pendingOffers.length !== 0 &&
                        <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}} pt={3} pl={3}>
                            {"Pending Offers - Their Offer <-> Your Item"}
                        </Typography>
                    }
                    {pendingOffers.length !== 0 && 
                        pendingOffers.map((item, index) => (
                            <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="center" alignItems="center" gap={"48px"}>
                                <Stack direction={{ xs: 'column',  md: 'row' }} justifyContent={"center"} alignItems={"center"} gap={"24px"}>
                                    <ClothingCard onClickFunction={() => navigateToPreview(pendingOffers[index][0])} userData={pendingOffers[index][0]}/>
                                    <Box component="img" sx={{ height: "200px", display: 'block', overflow: 'hidden', width: '200px' }} src={ArrowPicture}/>
                                    <ClothingCard onClickFunction={() => navigateToPreview(pendingOffers[index][1])} userData={pendingOffers[index][1]}/>
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
                                        <Typography onClick={() => tradeRequestInitiated(index)} variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                            Interested
                                        </Typography>
                                    </Stack> 
                                </Stack> 
                            </Stack>
                        ))
                    }
                    {offersYouMade.length !== 0 &&
                        <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}} pt={3} pl={3}>
                             {"Offers you made - Their Item <-> Your Offered Item"}
                        </Typography>
                    }
                    {offersYouMade.length !== 0 && 
                        offersYouMade.map((item, index) => (
                            <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="center" alignItems="center" gap={"48px"}>
                                <Stack direction={{ xs: 'column',  md: 'row' }} justifyContent={"center"} alignItems={"center"} gap={"24px"}>
                                    <ClothingCard onClickFunction={() => navigateToPreview(offersYouMade[index][0])} userData={offersYouMade[index][0]}/>
                                    <Box component="img" sx={{ height: "200px", display: 'block', overflow: 'hidden', width: '200px' }} src={ArrowPicture}/>
                                    <ClothingCard onClickFunction={() => navigateToPreview(offersYouMade[index][1])} userData={offersYouMade[index][1]}/>
                                </Stack> 
                                <Box onClick={() => handleRemoveTrade(index)}display="flex" justifyContent="center" alignItems="center" backgroundColor="#D9D9D9" height="75px" width="150px">
                                    <Typography variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                        Remove Offer
                                    </Typography>
                                </Box>
                            </Stack>
                        ))
                    }
                    {myNoOffers.length !== 0 &&
                        <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}} pt={3} pl={3}>
                            Your Clothes with no Offers  
                        </Typography>
                    }
                    <Stack direction={"row"} justifyContent={"center"} gap={"24px"}> 
                        {myNoOffers.length !== 0 && 
                            myNoOffers.map((item, index) => (
                                <Box display="flex" justifyContent={"center"}>
                                    <ClothingCard onClickFunction={() => navigateToPreview(myNoOffers[index])} userData={myNoOffers[index]}/>
                                </Box>
                            ))
                        }
                    </Stack> 
                    {successfulTransactions.length !== 0 &&
                        <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}} pt={3} pl={3}>
                             {"Successful Trades"}
                        </Typography>
                    }
                    {successfulTransactions.length !== 0 && 
                        successfulTransactions.map((item, index) => (
                            <Stack direction={{ xs: 'column',  md: 'row' }} justifyContent={"center"} alignItems={"center"} gap={"24px"}>
                                <ClothingCard onClickFunction={() => navigateToPreview(successfulTransactions[index].product1Ref)} userData={successfulTransactions[index].product1Ref}/>
                                <Box component="img" sx={{ height: "200px", display: 'block', overflow: 'hidden', width: '200px' }} src={ArrowPicture}/>
                                <ClothingCard onClickFunction={() => navigateToPreview(successfulTransactions[index].product2Ref)} userData={successfulTransactions[index].product2Ref}/>
                            </Stack> 
                        ))
                    }
                </Stack>
            </Stack>
            {modalStatus &&  
                <ConfirmTradeModal modalValue={modalStatus} theirOffer={theirOffer} yourItem={yourItem}/>
            }
            {removeOfferStatus &&  
                <Modal modalValue={removeOfferStatus} modalText={"Offer Removed"} displayImage={false}/>
            }
        </Box>
  )
}

export default Offers





// <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="center" alignItems="center" gap={"48px"}>
//                         <Stack direction={{ xs: 'column',  md: 'row' }} justifyContent={"center"} alignItems={"center"} gap={"24px"}>
//                             <Stack direction="column" gap={"24px"}>
//                                 <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
//                                     Their Offer
//                                 </Typography>
//                                 <ClothingCard/>
//                             </Stack> 
//                             <Box component="img" sx={{ height: "200px", display: 'block', overflow: 'hidden', width: '200px' }} src={ArrowPicture}/>
//                             <Stack direction="column" gap={"24px"}>
//                                 <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
//                                     Your Item
//                                 </Typography>
//                                 <ClothingCard/>
//                             </Stack> 
//                         </Stack> 
//                         <Stack direction="row" gap="24px">
//                             <Stack direction="column" justifyContent="center" alignItems="center" gap={"8px"} backgroundColor="#D9D9D9" height="75px" width="150px">
//                                 <ThumbDownIcon/>
//                                 <Typography variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
//                                     Not Intersted
//                                 </Typography>
//                             </Stack> 
//                             <Stack direction="column" justifyContent="center" alignItems="center" gap={"8px"} backgroundColor="#D9D9D9" height="75px" width="150px">
//                                 <ThumbUpIcon/>
//                                 <Typography onClick={() => setModalStatus(true)}variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
//                                     Interested
//                                 </Typography>
//                             </Stack> 
//                         </Stack> 
//                     </Stack>


{/* <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="center" alignItems="center" gap={"48px"}>
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
                    </Stack> */}