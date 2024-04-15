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
            <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "400", textAlign: 'center', color: '#000000', display: {xs: 'none', md: 'block'}}}>
                Clothes 
            </Typography>
        </Box>
        <Box p={0.5} sx={{backgroundColor: "orange", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "400", textAlign: 'center', color: '#000000', display: {xs: 'none', md: 'block'}}}>
                Offers 
            </Typography>
        </Box>
        <Box p={0.5} sx={{backgroundColor: "orange", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "400", textAlign: 'center', color: '#000000', display: {xs: 'none', md: 'block'}}}>
                Listings  
            </Typography>
        </Box>
    </Stack>
  )
}

export default NavBarButtons
