import React from 'react'
import { Button, Box, Card, CardMedia, CardContent} from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconButton from '@mui/material/IconButton';
import PortraitShirt from "./PortraitShirt.jpg"

const ClothingCard = () => {
    return (
        <Card sx={{ width: {sm: '300px'}, boxShadow: "none", borderRadius: 0 }}>
            <CardMedia image={PortraitShirt} alt={"TempVariable"} sx={{width: "300px", height: "300px"}} />
            <CardContent sx={{ backgroundColor: "#A5B9E0", height: '35px' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#FFF" sx={{fontFamily: 'Poppins'}}>
                    Centennial DECA Shirt
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold" color="#FFF" sx={{fontFamily: 'Poppins'}}>
                    Size: M
                </Typography>
            </CardContent>
        </Card>
      );
}

export default ClothingCard
