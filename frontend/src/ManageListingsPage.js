import React, { useState, useEffect} from "react";
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Firebase Stuff 
import {useAuth} from './AuthContext';
import {storage} from './firebaseConfig';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';

import { useNavigate } from 'react-router-dom';


const TempNavBarPage = () => {
  const navigate = useNavigate();
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [clothingCardStatus, setclothingCardStatus] = useState(false);
  const [filterDisplayStatus, setFilterDisplayStatus] = useState(true); 
  const [sideClothingView, setSideClothingView] = useState(false); 

  const {currentUser} = useAuth();
  const [userInventoryData, setUserInventoryData] = useState([]); 

  function navigateToAddListing() {
    navigate('/add-item'); 
  }

  function navigateToPreview(specificClothingData) {
    navigate("/preview-page", {state: {clothingData: specificClothingData}});
  }


  useEffect(() => {
    const getUserListings = async () => {
       console.log("here"); 
        if(currentUser) {
          try {
            const idToken = await currentUser.getIdToken(); 
            console.log(idToken); 
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = "Bearer " +  idToken; 
            myHeaders.append("Authorization", token);

            const raw = JSON.stringify({
              "userEmail": currentUser.email
            });
            
            const requestOptions = {
              method: "GET",
              headers: myHeaders,
              redirect: "follow"
            };
            
            const url = "http://localhost:4000/inventory/view_inventory/" + currentUser.email; 
            const response = await fetch(url, requestOptions); 
            const data = await response.json();
            console.log(data); 
            if (Array.isArray(data)) {
              setUserInventoryData(data); 
            } else {
              // Catch Error
            }
        } catch(e) {
            // ERROR 
            console.log(e); 
        }
      }
    }

    getUserListings(); 
  }, [currentUser])

  
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
      <Stack direction="column">
        <Box p={4}>
            <Stack direction={"row"} alignItems="center" justifyContent={"flex-end"} gap="16px" > 
                <AddCircleOutlineIcon onClick={navigateToAddListing}  sx={{fontSize: "56px",  hover: "pointer"}}/>
                <Typography onClick={navigateToAddListing} variant="h3" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000', hover: "pointer"}}>
                  Add New Listing
                </Typography>
            </Stack>
        </Box>

        <Stack direction="row" flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
            {userInventoryData.length !== 0 && 
              userInventoryData.map((item, index) => (
                  <ClothingCard onClickFunction={() => navigateToPreview(userInventoryData[index])} userData={userInventoryData[index]}/> 
              ))
            }
        </Stack>
      </Stack>
    </Box>
  )
}

export default TempNavBarPage


            {/* <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/> */}