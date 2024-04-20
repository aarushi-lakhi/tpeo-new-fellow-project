import React from 'react';
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const NavBarButtons = ({ isProfilePage }) => {
    const navigate = useNavigate();

    return (
        <Stack flex="1" direction="row" justifyContent="space-evenly" alignItems="center">
            <Box p={2} sx={{ backgroundColor: isProfilePage ? "#D9D9D9": "#A5B9E0" , display: "flex", justifyContent: "center", alignItems: "center", '&:hover': { backgroundColor: isProfilePage ? "#D9D9D9" :  "#A5B9E0" } }}>
                <Typography onClick={() => navigate("/search-page")} variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: "400", textAlign: 'center', color: '#000000', display: { xs: 'none', md: 'block' } }}>
                    Clothes
                </Typography>
            </Box>
            <Box p={2} sx={{ backgroundColor:  isProfilePage ? "#D9D9D9": "#A5B9E0", display: "flex", justifyContent: "center", alignItems: "center", '&:hover': { backgroundColor: isProfilePage ? "#D9D9D9" :  "#A5B9E0" } }}>
                <Typography onClick={() => navigate("/check-offers")} variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: "400", textAlign: 'center', color: '#000000', display: { xs: 'none', md: 'block' } }}>
                    Offers
                </Typography>
            </Box>
            <Box p={2} sx={{ backgroundColor:  isProfilePage ? "#D9D9D9": "#A5B9E0", display: "flex", justifyContent: "center", alignItems: "center", '&:hover': { backgroundColor: isProfilePage ? "#D9D9D9" :  "#A5B9E0" } }}>
                <Typography onClick={() => navigate("/manage-listings")} variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: "400", textAlign: 'center', color: '#000000', display: { xs: 'none', md: 'block' } }}>
                    Listings
                </Typography>
            </Box>
        </Stack>
    );
}

export default NavBarButtons;
