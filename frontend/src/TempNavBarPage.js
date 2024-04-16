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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const TempNavBarPage = () => {
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [clothingCardStatus, setclothingCardStatus] = useState(false);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
      <Box p={2} height="92vh" sx={{overflowY: "scroll"}}>
        <Typography variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
            Open Filters
        </Typography>
        {/* <Stack direction="column" marginTop={2} >
          <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
              Men's Clothing
          </Typography>
          <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
              Shirt Sizes 
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox/>} label="XS" />
            <FormControlLabel control={<Checkbox/>} label="S" />
            <FormControlLabel control={<Checkbox/>} label="M" />
            <FormControlLabel control={<Checkbox/>} label="L" />
            <FormControlLabel control={<Checkbox/>} label="XL" />
          </FormGroup>
          <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
              Shirt Sizes 
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox/>} label="XS" />
            <FormControlLabel control={<Checkbox/>} label="S" />
            <FormControlLabel control={<Checkbox/>} label="M" />
            <FormControlLabel control={<Checkbox/>} label="L" />
            <FormControlLabel control={<Checkbox/>} label="XL" />
          </FormGroup>
          <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
              Shirt Sizes 
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox/>} label="XS" />
            <FormControlLabel control={<Checkbox/>} label="S" />
            <FormControlLabel control={<Checkbox/>} label="M" />
            <FormControlLabel control={<Checkbox/>} label="L" />
            <FormControlLabel control={<Checkbox/>} label="XL" />
          </FormGroup>
        </Stack> */}
      </Box>
      {/* <Box p={2} width="auto" height="auto" flex="1">
        <Stack direction="row" flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
          <ClothingCard/>
          <ClothingCard/>
          <ClothingCard/>
          <ClothingCard/>
          <ClothingCard/>
          <ClothingCard/>
          <ClothingCard/>
          <ClothingCard/>
          <ClothingCard/>
        </Stack>
      </Box>
      {clothingCardStatus &&
          <Box sx={{height: "100vh", backgroundColor: "orange", zIndex: "tooltip", position: 'fixed', top: 0, right: 0}}>

          </Box>
      } */}
    </Box>
  )
}

export default TempNavBarPage

// Profile 
// Clothes 
// Offers 
// Listings 