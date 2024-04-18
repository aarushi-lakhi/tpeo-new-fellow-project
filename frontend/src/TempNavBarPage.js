import React, { useState, useEffect } from "react";
import {Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import NavBarButtons from './components/NavBarButtons';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

// Clean this up later 
import Shirt from "./components/ClothingArticlesImages/Shirt.png"
import ActiveWear from "./components/ClothingArticlesImages/Activewear.png"
import Dresses from "./components/ClothingArticlesImages/Dresses.png"
import Hoodies from "./components/ClothingArticlesImages/Hoodies.png"
import Pants from "./components/ClothingArticlesImages/Pants.png"
import Shoes from "./components/ClothingArticlesImages/Shoes.png"
import Suits from "./components/ClothingArticlesImages/Suits.png"
import Swimwear from "./components/ClothingArticlesImages/Swimwear.png"

// Formgroup stuff 
import FormControlLabel from '@mui/material/FormControlLabel';
import NavBar from "./components/NavBar"


const TempNavBarPage = () => {
  const [filterDisplayStatus, setFilterDisplayStatus] = useState(true); 
  const [backgroundColorClothingArticles, setBackgroundColorClothingArticles] = useState(["#D9D9D9", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]); 
  const [shoeSelected, setShoeSelected] = useState(false);

  const [genderFilter, setGenderFilter] = useState([true, false, false]); 
  const [sizeFilter, setSizeFilter] = useState([true, false, false, false, false]); 

  
  useEffect(() => {
    if(backgroundColorClothingArticles[2] === "#D9D9D9") {
      setShoeSelected(true); 
    } else {
      setShoeSelected(false); 
    }
  }, [backgroundColorClothingArticles])

  function backgroundColorChange(number) {
      const backgroundColorArray = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]; 
      backgroundColorArray[number] = "#D9D9D9";  
      setBackgroundColorClothingArticles(backgroundColorArray); 
  }

  const handleGenderChange = (event, number) => {
      genderFilter[number] = !genderFilter[number]; 
  };

  const handleSizeChange = (event, number) => {
    sizeFilter[number] = !sizeFilter[number]; 
};

  return (
    <Box>
      <NavBar/>
      {!filterDisplayStatus && 
      <Typography p={1} onClick={() => setFilterDisplayStatus(true)} variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000', hover: "pointer"}}>
          Open Filter
      </Typography>}
      <Stack direction="row">
        {filterDisplayStatus && 
        <Box p={2} sx={{overflowY: "scroll", background: "#A5B9E0", cursor: 'pointer', height: "92vh"}}>
            <Typography onClick={() => setFilterDisplayStatus(false)} variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000', hover: "pointer"}}>
                Close Filter
            </Typography>
          <Stack direction="column" marginTop={2}>
            <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Gender
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={genderFilter[0]} onChange={(event) => handleGenderChange(event, 0)}/>} label="Male" />
              <FormControlLabel control={<Checkbox checked={genderFilter[1]} onChange={(event) => handleGenderChange(event, 1)}/>} label="Female" />
              <FormControlLabel control={<Checkbox checked={genderFilter[2]} onChange={(event) => handleGenderChange(event, 2)}/>} label="Unisex" />
            </FormGroup>
            {!shoeSelected && 
              <Box> 
                <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                    Shirt/Pant Sizes 
                </Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={sizeFilter[0]} onChange={(event) => handleSizeChange(event, 0)}/>} label="XS" />
                  <FormControlLabel control={<Checkbox checked={sizeFilter[1]} onChange={(event) => handleSizeChange(event, 1)}/>} label="S" />
                  <FormControlLabel control={<Checkbox checked={sizeFilter[2]} onChange={(event) => handleSizeChange(event, 2)}/>} label="M" />
                  <FormControlLabel control={<Checkbox checked={sizeFilter[3]} onChange={(event) => handleSizeChange(event, 3)}/>} label="L" />
                  <FormControlLabel control={<Checkbox checked={sizeFilter[4]} onChange={(event) => handleSizeChange(event, 4)}/>} label="XL" />
                </FormGroup>
              </Box> 
            }
            {shoeSelected && 
              <Box> 
                <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                    Shoes Sizes 
                </Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox/>} label="US 5-6" />
                  <FormControlLabel control={<Checkbox/>} label="US 6-7" />
                  <FormControlLabel control={<Checkbox/>} label="US 7-8" />
                  <FormControlLabel control={<Checkbox/>} label="US 8-9" />
                  <FormControlLabel control={<Checkbox/>} label="US 9-10+" />
                </FormGroup>
              </Box> 
            }
            <Box mt={3} p={2} backgroundColor="#D9D9D9"> 
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'center', color: '#000000'}}>
                  Search! 
              </Typography>
            </Box>
          </Stack>
        </Box>}
        {/* Change to flex start beneath me */}
        <Stack p={2} flex="1" justifyContent="center" alignItems="center" gap="20px">
          <Stack flexWrap="wrap" direction="row" justifyContent="center" alignItems="center" gap="20px"> 
            <Stack onClick={() => backgroundColorChange(0)} row="column" justifyContent="center" alignItems="center" sx={{'&:hover': {backgroundColor: "#D9D9D9"}, backgroundColor: backgroundColorClothingArticles[0]}}>
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Shirt}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Shirts
              </Typography>
            </Stack>
            <Stack onClick={() => backgroundColorChange(1)} row="column" justifyContent="center" alignItems="center" sx={{'&:hover': {backgroundColor: "#D9D9D9"}, backgroundColor: backgroundColorClothingArticles[1]}}>
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Pants}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Pants
              </Typography>
            </Stack>
            <Stack onClick={() => backgroundColorChange(2)} row="column" justifyContent="center" alignItems="center" sx={{'&:hover': {backgroundColor: "#D9D9D9"}, backgroundColor: backgroundColorClothingArticles[2]}}>
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Shoes}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Shoes
              </Typography>
            </Stack>
            <Stack onClick={() => backgroundColorChange(3)} row="column" justifyContent="center" alignItems="center" sx={{'&:hover': {backgroundColor: "#D9D9D9"}, backgroundColor: backgroundColorClothingArticles[3]}}>
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Dresses}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Dresses
              </Typography>
            </Stack>
            <Stack onClick={() => backgroundColorChange(4)} row="column" justifyContent="center" alignItems="center" sx={{'&:hover': {backgroundColor: "#D9D9D9"}, backgroundColor: backgroundColorClothingArticles[4]}}>
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Swimwear}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Swimwear
              </Typography>
            </Stack>
            <Stack onClick={() => backgroundColorChange(5)} row="column" justifyContent="center" alignItems="center" sx={{'&:hover': {backgroundColor: "#D9D9D9"}, backgroundColor: backgroundColorClothingArticles[5]}}>
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Suits}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Suits
              </Typography>
            </Stack>
            <Stack onClick={() => backgroundColorChange(6)} row="column" justifyContent="center" alignItems="center" sx={{'&:hover': {backgroundColor: "#D9D9D9"}, backgroundColor: backgroundColorClothingArticles[6]}}>
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={Hoodies}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Hoodies
              </Typography>
            </Stack>
            <Stack onClick={() => backgroundColorChange(7)} row="column" justifyContent="center" alignItems="center" sx={{'&:hover': {backgroundColor: "#D9D9D9"}, backgroundColor: backgroundColorClothingArticles[7]}}>
              <Box component="img" sx={{height: "100px", width: "125px",}} alt="Uh Oh" src={ActiveWear}/>
              <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000'}}>
                Activewear
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
            {/* <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/>
            <ClothingCard onClickFunction={() => setSideClothingView(true)}/> */}
          </Stack>
        </Stack>
        <Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default TempNavBarPage

// Profile 
// Clothes 
// Offers 
// Listings 


          {/* {!filterDisplayStatus && 
            <Typography onClick={() => setFilterDisplayStatus(true)} variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "600", textAlign: 'start', color: '#000000', hover: "pointer"}}>
                Open Filter
            </Typography>
          } */}