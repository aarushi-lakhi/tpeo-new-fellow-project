import React from 'react'
import {Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


const NavBarButtons = () => {
  const navigate = useNavigate();

  return (
    <Stack flex="1" direction="row" justifyContent="space-evenly" alignItems="center">
        <Box p={2} sx={{backgroundColor: "#A5B9E0", display: "flex", justifyContent: "center", alignItems: "center", '&:hover': {backgroundColor: "#D9D9D9"}}}>
            <Typography onClick={() => navigate("/temp-navbar")} variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "400", textAlign: 'center', color: '#000000', display: {xs: 'none', md: 'block'}}}>
                Clothes 
            </Typography>
        </Box>
        <Box p={2} sx={{backgroundColor: "#A5B9E0", display: "flex", justifyContent: "center", alignItems: "center", '&:hover': {backgroundColor: "#D9D9D9"}}} >
            <Typography onClick={() => navigate("/check-offers")} variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "400", textAlign: 'center', color: '#000000', display: {xs: 'none', md: 'block'}}}>
                Offers 
            </Typography>
        </Box>
        <Box p={2} sx={{backgroundColor: "#A5B9E0", display: "flex", justifyContent: "center", alignItems: "center", '&:hover': {backgroundColor: "#D9D9D9"}}}>
            <Typography onClick={() => navigate("/manage-listings")} variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "400", textAlign: 'center', color: '#000000', display: {xs: 'none', md: 'block'}}}>
                Listings  
            </Typography>
        </Box>
    </Stack>
  )
}

export default NavBarButtons
