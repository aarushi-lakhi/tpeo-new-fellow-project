import React from 'react'
import { Button, Box, Card, CardMedia, CardContent} from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconButton from '@mui/material/IconButton';
import PortraitShirt from "./PortraitShirt.jpg"
import CardActionArea from '@mui/material/CardActionArea';


const ClothingCard = ({onClickFunction, borderSize, userData}) => {
    return (
        <Card sx={{ width: {sm: '300px'}, boxShadow: "none", borderRadius: 0, border: borderSize}} onClick={onClickFunction}>
            <CardActionArea onClick={() => onClickFunction}> 
                <CardMedia image={userData.clothingImages[0]} alt={"TempVariable"} sx={{width: "300px", height: "300px"}} />
                <CardContent sx={{ backgroundColor: "#A5B9E0", height: '40px' }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="#FFF" sx={{fontFamily: 'Poppins'}}>
                        {userData.title}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="bold" color="#FFF" sx={{fontFamily: 'Poppins'}}>
                        {"Size " + userData.size}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
      );
}

export default ClothingCard
