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

const TempNavBarPage = () => {
  const [burgerStatus, setBurgerStatus] = useState(false);

  return (
    <Box>
      <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" sx={{position: "sticky", backgroundColor: "orange",  zIndex: "mobile stepper"}}>
        <Box p={1.5} sx={{backgroundColor: "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                Barter Buddies
            </Typography>
        </Box>
        <NavBarButtons/>
        <IconButton>
             <AccountCircleIcon sx={{fontSize: {xs: "65px"},  display: {xs: 'none', md: 'block'}}}/>
        </IconButton> 
        <IconButton onClick={() => setBurgerStatus(true)}>
             <MenuIcon sx={{fontSize: {xs: "65px"},  display: {xs: 'block', md: 'none' }}}/>
        </IconButton> 
        {burgerStatus && 
          <Box sx={{
            width: "100vw", 
            height: "100vh", 
            backgroundColor: "green", 
            zIndex: "tooltip", // A value like the AppBar's z-index or higher
            position: 'fixed', // Ensure it's fixed or absolute
            top: 0, // Start from the top
            left: 0 // Start from the left
          }}>
            <Stack>
              
            </Stack>
          </Box>
        }
      </Stack>
    </Box>
  )
}

export default TempNavBarPage
