import React from 'react'
import { Button, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import NavBar from "./components/NavBar.js"
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconButton from '@mui/material/IconButton';
import GenderCheckBoxLabel from "./components/GenderCheckBoxLabel.js"

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
    borderRadius: "2.5vw 2.5vw 2.5vw 2.5vw", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "space-between", 
    alignItems: "center",
}

const bottomButtonGroup = {
    width: "100%", 
    height: "20%", 
    display: "flex", 
    justifyContent: "space-between", 
}

const headerWrap = {
    width: "100%", 
    display: "flex", 
    justifyContent: "flex-start",
    alignItems: "flex-start"
}
const blueBoxTypographyHeader = {
    fontFamily: 'Poppins',
    fontWeight: "600",
    color: '#000000',
    marginTop: "10%",
    textAlign: "left",
    marginLeft: "20px",
    fontSize: "2.5vw" 
}

const checkBoxLabelWrap = {
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "flex-start",
    gap: "5vh", 
    marginTop: "25px"
}

export default function ChooseStyleOnboarding() {
  return (
    <Box sx={wrap}>
        <NavBar/>
        <Box sx={secondContainer}>
            <Box sx={blueBox}>
                <Box sx={headerWrap}>
                    <Typography variant="h4" sx={blueBoxTypographyHeader}>
                            Choose your style(s)
                    </Typography>
                </Box>
                <Box sx={checkBoxLabelWrap}>
                    <GenderCheckBoxLabel text="Women's Clothing"/>
                    <GenderCheckBoxLabel text="Men's Clothing"/>
                    <GenderCheckBoxLabel text="Unisex Clothing"/>
                </Box>
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
