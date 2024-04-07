import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DropDownMenu from "./DropDownMenu"
import Typography from '@mui/material/Typography';

export default function BasicSelect({text}) {

    const wrap = {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between", 
        gap: "5px"
    }

    const dropDownMenuGroup = {
        display: "flex", 
        justifyContent: "space-between", 
    }

    const labelWrap = {
        display: "flex", 
        justifyContent: "flex-start"
    }

    const labelTypography = {
        fontFamily: 'Poppins',
        fontWeight: "550",
        textAlign: 'center',
        color: '#000000',
        fontSize: "1.25vw"
    }

    const genderSizeLabelTypography = {
        fontFamily: 'Poppins',
        fontWeight: "550",
        color: '#000000',
        fontSize: "1.5vw",
        backgroundColor: "yellow"
    }

    const genderSizeLabelWrap = {
        display: "flex", 
        justifyContent: "flex-start", 
    }

    return (
        <Box sx={wrap}>
            <Box sx={genderSizeLabelWrap}> 
                <Typography variant="h4" sx={labelTypography}>
                    {text}
                </Typography>
            </Box>
            <Box sx={dropDownMenuGroup}>
                <DropDownMenu text="Shirt Size"/>
                <DropDownMenu text="Pant Size"/>
            </Box>
        </Box>
    );
}