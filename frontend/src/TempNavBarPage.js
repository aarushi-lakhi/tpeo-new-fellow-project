import React from 'react'
import styled from "styled-components";
import { Button, Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import NavBarButtons from './components/NavBarButtons';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const TempNavBarPage = () => {
  return (
    <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" sx={{backgroundColor: "orange"}}>
        <Box p={1.5} sx={{backgroundColor: "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000', typography: {xs: "h6", sm: "h5", md: "h4"}}}>
                Barter Buddies
            </Typography>
        </Box>
        <NavBarButtons/>
        <IconButton>
             <AccountCircleIcon sx={{fontSize: {xs: "50px", md: '65px'}}}/>
        </IconButton> 
    </Stack>
  )
}

export default TempNavBarPage
