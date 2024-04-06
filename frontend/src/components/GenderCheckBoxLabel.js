import React from 'react'
import styled from "styled-components";
import { Button, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';


const wrap = {
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center",
    gap: "25px"
}

const labelTypography = {
    fontFamily: 'Poppins',
    fontWeight: "550",
    textAlign: 'center',
    color: '#000000',
    fontSize: "2vw"
}

export default function GenderCheckBoxLabel({text}) {
  return (
    <Box sx={wrap}>
        <Checkbox style={{
            transform: "scale(1.5)",
        }}/>
        <Typography variant="h4" sx={labelTypography}>
            {text}
        </Typography>
    </Box>
  )
}
