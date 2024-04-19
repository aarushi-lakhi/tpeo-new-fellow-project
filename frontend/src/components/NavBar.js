import React, { useState } from "react";
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import NavBarButtons from './NavBarButtons';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ isProfilePage }) {
    const [burgerStatus, setBurgerStatus] = useState(false);
    const navigate = useNavigate();

    return (
        <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ position: "sticky", backgroundColor: isProfilePage ?  "#D9D9D9" : "#A5B9E0", zIndex: "mobile stepper" }}>
            <Box p={1.5} sx={{ backgroundColor: isProfilePage ? "#A5B9E0" : "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: "600", textAlign: 'center', color: '#000000' }}>
                    Barter Buddies
                </Typography>
            </Box>
            <NavBarButtons />
            <IconButton onClick={() => navigate("/profile")}>
                <AccountCircleIcon sx={{ fontSize: { xs: "50px" }, display: { xs: 'none', md: 'block' } }} />
            </IconButton>
            <IconButton onClick={() => setBurgerStatus(true)}>
                <MenuIcon sx={{ fontSize: { xs: "40px" }, display: { xs: 'block', md: 'none' } }} />
            </IconButton>
            {burgerStatus &&
                <Box sx={{ width: "100vw", height: "100vh", backgroundColor: isProfilePage ? "#A5B9E0" : "#D9D9D9", zIndex: "tooltip", position: 'fixed', top: 0, left: 0 }}>
                    <Box p={1} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                        <IconButton onClick={() => setBurgerStatus(false)}>
                            <CloseIcon sx={{ fontSize: "30px" }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ margin: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000' }}>
                            Menu
                        </Typography>
                    </Box>
                    <Stack p={2} direction="column" justifyContent="flex-start" alignItems="flex-start" gap="20px">
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: 'orange' }}>
                            Profile
                        </Typography>
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000' }}>
                            Clothes
                        </Typography>
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000' }}>
                            Offers
                        </Typography>
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000' }}>
                            Listings
                        </Typography>
                    </Stack>
                </Box>
            }
        </Stack>
    )
}
