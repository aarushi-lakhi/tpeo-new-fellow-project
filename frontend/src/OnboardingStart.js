import React from 'react'
import styled from "styled-components";
import { Button, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import NavBar from "./components/NavBar.js"
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconButton from '@mui/material/IconButton';

const wrap = {
    width: "100vw",
    height: "100vh", 
    display: "flex", 
    flexDirection: "column",
}

const secondContainer = {
    width: "100vw",
    height: "88vh", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
}

const blueBox = {
    width: "35%",
    height: "67%", 
    backgroundColor: "#A5B9E0", 
    border: "4px solid rgba(0, 0, 0, 0.5)", 
    borderRadius: "4vw 4vw 4vw 4vw", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "space-between", 
    alignItems: "center",
}

const blueBoxTypography = {
    fontFamily: 'Poppins',
    fontWeight: "600",
    textAlign: 'center',
    color: '#000000',
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "25%", 
    fontSize: "2.5rem",  
    '@media (max-width:1000px)': {
        fontSize: '2.0rem',
    },
    '@media (max-width:750px)': {
        fontSize: '1.5rem',
    },
}

const bottomButtonGroup = {
    width: "100%", 
    height: "20%", 
    display: "flex", 
    justifyContent: "space-between", 
}


export default function OnboardingStart() {
  return (
    <Box sx={wrap}>
        <NavBar/>
        <Box sx={secondContainer}>
            <Box sx={blueBox}>
                <Typography variant="h3" sx={blueBoxTypography}>
                    Let us help you 
                    customize your 
                    experience for 
                    better swaps!
                </Typography>
                <Box sx={bottomButtonGroup}>
                    <IconButton sx={{marginLeft: "20px"}}>
                        <ArrowCircleLeftOutlinedIcon sx={{fontSize: "4vw"}}/>
                    </IconButton>
                    <IconButton sx={{marginRight: "20px"}}>
                        <ArrowCircleRightOutlinedIcon sx={{fontSize: "4vw"}}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}
