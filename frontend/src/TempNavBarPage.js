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




const TempNavBarPage = () => {
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [clothingCardStatus, setclothingCardStatus] = useState(false);
  const [filterDisplayStatus, setFilterDisplayStatus] = useState(true); 
  const [sideClothingView, setSideClothingView] = useState(false); 

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 

  function myFunction() {
    console.log("Hel;o")
  }

  function randomFinct() {
    console.log("hello")
  }

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
      {!filterDisplayStatus && 
      <Typography p={1} onClick={() => setFilterDisplayStatus(true)} variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000', hover: "pointer"}}>
          Open Filter
      </Typography>}
      <Stack direction="row">
        {filterDisplayStatus && 
        <Box p={2} sx={{overflowY: "scroll", background: "#A5B9E0", cursor: 'pointer'}}>
            <Typography onClick={() => setFilterDisplayStatus(false)} variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000', hover: "pointer"}}>
                Close Filter
            </Typography>
          <Stack direction="column" marginTop={2} >
            <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Gender
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox/>} label="Male" />
              <FormControlLabel control={<Checkbox/>} label="Female" />
              <FormControlLabel control={<Checkbox/>} label="Unisex" />
            </FormGroup>
            <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Shirt/Pant Sizes 
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox/>} label="XS" />
              <FormControlLabel control={<Checkbox/>} label="S" />
              <FormControlLabel control={<Checkbox/>} label="M" />
              <FormControlLabel control={<Checkbox/>} label="L" />
              <FormControlLabel control={<Checkbox/>} label="XL" />
            </FormGroup>
            <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Shoes Sizes 
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox/>} label="US 5-6" />
              <FormControlLabel control={<Checkbox/>} label="US 6-7" />
              <FormControlLabel control={<Checkbox/>} label="US 7-8" />
              <FormControlLabel control={<Checkbox/>} label="US 8-9" />
              <FormControlLabel control={<Checkbox/>} label="US 9-10+" />
            </FormGroup>
          </Stack>
        </Box>}
        <Stack p={2} flex="1" justifyContent="center" alignItems="center" gap="20px">
          <Stack flexWrap="wrap" direction="row" justifyContent="center" alignItems="center" gap="20px"> 
          {/* {!filterDisplayStatus && 
            <Typography onClick={() => setFilterDisplayStatus(true)} variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000', hover: "pointer"}}>
                Open Filter
            </Typography>
          } */}
            <Stack row="column" justifyContent="center" alignItems="center">
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Shirt}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Shirts
              </Typography>
            </Stack>
            <Stack row="column" justifyContent="center" alignItems="center">
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Pants}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Pants
              </Typography>
            </Stack>
            <Stack row="column" justifyContent="center" alignItems="center">
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Shoes}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Shoes
              </Typography>
            </Stack>
            <Stack row="column" justifyContent="center" alignItems="center">
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Dresses}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Dresses
              </Typography>
            </Stack>
            <Stack row="column" justifyContent="center" alignItems="center">
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Swimwear}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Swimwear
              </Typography>
            </Stack>
            <Stack row="column" justifyContent="center" alignItems="center">
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Suits}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Suits
              </Typography>
            </Stack>
            <Stack row="column" justifyContent="center" alignItems="center">
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Hoodies}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Hoodies
              </Typography>
            </Stack>
            <Stack row="column" justifyContent="center" alignItems="center">
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={ActiveWear}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Activewear
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
          </Stack>
        </Stack>
        <Box>
          <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Activewear
          </Typography>
        </Box>
      {/* {clothingCardStatus &&
          <Box sx={{height: "100vh", backgroundColor: "orange", zIndex: "tooltip", position: 'fixed', top: 0, right: 0}}>

          </Box>
      } */}
      </Stack>
    </Box>
  )
}

export default TempNavBarPage

// Profile 
// Clothes 
// Offers 
// Listings 