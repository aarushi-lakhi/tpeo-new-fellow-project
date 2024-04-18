// React-MUI 
import React, { useState, useEffect} from "react";
import {Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

// Components
import ClothingCard from './components/ClothingCard';
import NavBar from "./components/NavBar"

// Firebase  
import {useAuth} from './AuthContext';

const TempNavBarPage = () => {
  const navigate = useNavigate();
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
        if(currentUser) {
          try {
            const idToken = await currentUser.getIdToken(); 
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
      <NavBar/> 
      <Stack direction="column">
        <Box p={4}>
            <Stack direction={"row"} alignItems="center" justifyContent={"flex-end"} gap="16px" > 
                <AddCircleOutlineIcon onClick={navigateToAddListing}  sx={{fontSize: "56px",  hover: "pointer"}}/>
                <Typography onClick={navigateToAddListing} variant="h3" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000', hover: "pointer"}}>
                  Add Listing
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