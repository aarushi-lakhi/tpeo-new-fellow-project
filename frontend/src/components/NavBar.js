import React from 'react'
import styled from "styled-components";
import { Button, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';

const navBar = {
    width: '100vw', 
    height: '12vh', 
    backgroundColor: "#A5B9E0", 
    display: "flex", 
    justifyContent: "space-between",  
    alignItems: "center", 
}

const homePageNavBarButton = {
    width: "17%", 
    height: "70%",
    backgroundColor: "#D9D9D9",
    marginLeft: "1.5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
}

const homePageNavBarButtonTypography = {
    fontFamily: 'Poppins',
    fontSize: '2vw',
    fontWeight: "600",
    textAlign: 'center',
    color: '#000000',
}


export default function NavBar() {
  return (
    <Box sx={navBar}>
        <Box sx={homePageNavBarButton}>
            <Typography variant="h2" sx={homePageNavBarButtonTypography}>
                Barter Buddies
            </Typography>
        </Box> 
        <IconButton>
             <AccountCircleIcon sx={{fontSize: "4vw"}}/>
        </IconButton> 
    </Box>
  )
}



const NavBarButton = styled.div`
    width: 17%; 
    height: 70%;
    background-color: #D9D9D9;
    margin-left: 2.5%;
    display: flex; 
    justify-content: center; 
    align-items: center; 
    font-weight: 500; 
`

const BarterBuddiesText = styled.div`
    font-size: '10vw'; 
    font-weight: 100; 
`





// import React from 'react'
// import styled from "styled-components";
// import { Button, Box } from '@mui/material';
// import Typography from '@mui/material/Typography';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import IconButton from '@mui/material/IconButton';


// const styles = {
//     largeIcon: {
//       width: "100%",
//       height: "5%",
//     },
// };

// const iconButtonStyles = {
//     width: "50%", 
//     height: "50%",
// }

// export default function NavBar() {
//   return (
//     <MainNavBar>
//         <NavBarButton>
//             <Typography
//                 variant="h2"
//                 sx={{
//                     fontFamily: 'Poppins',
//                     fontSize: '2vw',
//                     fontWeight: 625,
//                     lineHeight: '1.5',
//                     textAlign: 'center',
//                     color: '#000000',
//                 }}
//             >
//                 Barter Buddies
//             </Typography>
//         </NavBarButton>
//         <IconButton>
//             <AccountCircleIcon sx={{fontSize: "50px"}}/>
//         </IconButton>
//     </MainNavBar>
//   )
// }


// const MainNavBar = styled.div`
//     width: 100vw; 
//     height: 12vh;
//     background-color: #A5B9E0; 
//     display: flex; 
//     justify-content: space-between; 
//     align-items: center; 
// `;

// const NavBarButton = styled.div`
//     width: 17%; 
//     height: 70%;
//     background-color: #D9D9D9;
//     margin-left: 2.5%;
//     display: flex; 
//     justify-content: center; 
//     align-items: center; 
//     font-weight: 500; 
// `

// const BarterBuddiesText = styled.div`
//     font-size: '10vw'; 
//     font-weight: 100; 
// `