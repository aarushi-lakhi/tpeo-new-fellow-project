import React from 'react'
import styled from "styled-components";
import { Button, Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';

const NavBarButtons = () => {
  return (
    <Stack flex="1" direction="row" justifyContent="space-evenly" alignItems="center">
            <Box p={0.5} sx={{backgroundColor: "orange", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'center', color: '#000000', typography: {xs: "h6", sm: "h5", md: 'h4'}}}>
                    Clothes 
                </Typography>
            </Box>
            <Box p={0.5} sx={{backgroundColor: "orange", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'center', color: '#000000', typography: {xs: "h6", sm: "h5", md: 'h4'}}}>
                    Check Offers 
                </Typography>
            </Box>
            <Box p={0.5} sx={{backgroundColor: "orange", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'center', color: '#000000', typography: {xs: "h6", sm: "h5", md: 'h4'}}}>
                    Listings  
                </Typography>
            </Box>
    </Stack>
  )
}

export default NavBarButtons
