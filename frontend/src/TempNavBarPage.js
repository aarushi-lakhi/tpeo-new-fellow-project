import React from 'react'
import styled from "styled-components";
import { Button, Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';

const TempNavBarPage = () => {
  return (
    <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" sx={{backgroundColor: "orange"}}>
        <Box sx={{backgroundColor: "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'center', color: '#000000',}}>
                Barter Buddies
            </Typography>
        </Box>
        <Box sx={{backgroundColor: "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'center', color: '#000000',}}>
                Barter Buddies
            </Typography>
        </Box>


    </Stack>
  )
}

export default TempNavBarPage
