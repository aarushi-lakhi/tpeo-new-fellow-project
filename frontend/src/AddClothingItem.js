import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Box, Stack, TextField, Paper, MenuItem, Select, InputLabel, Card, CardContent} from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import NavBarButtons from './components/NavBarButtons';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ClothingCard from './components/ClothingCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import ImageCarousel from './components/ImageCarousel'
import Modal from "./components/ChildModal"

import PortraitShirt from "./components/PortraitShirt.jpg"
import DropDownMenu from "./components/DropDownMenu"

import ListingPreviewImage from "./components/YourListingPreviewImage.png"


// Firebase Stuff 
import {useAuth} from './AuthContext';
import {storage} from './firebaseConfig';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';

function AddClothingItem() {
    // Firebase Stuff 
    // useEffect(async () => {
    //     const idToken = await currentUser.getIdToken(); 
    //     console.log("hello")
    //     console.log(idToken); 
    //   }, []);


    // Frontend Stuff
    const [burgerStatus, setBurgerStatus] = useState(false);
    const [clothingCardStatus, setclothingCardStatus] = useState(false);
    const [tradeStatus, setTradeStatus] = useState(false);
    const [modalTruthValue, setModalTruthValue] = useState(false); 


    var imageSrcArray = []; 

    // Image State - 1
    const [imageViewOne, setImageViewOne] = useState(false); 
    const [imagePreviewUrlOne, setImagePreviewUrlOne] = useState(""); 

    // Image State - 2
    const [imageViewTwo, setImageViewTwo] = useState(false); 
    const [imagePreviewUrlTwo, setImagePreviewUrlTwo] = useState(""); 

    // Image State - 3
    const [imageViewThree, setImageViewThree] = useState(false); 
    const [imagePreviewUrlThree, setImagePreviewUrlThree] = useState(""); 

    const handleBoxClickOne = () => {
        document.getElementById('hidden-file-input-one').click();
    };
    const handleBoxClickTwo = () => {
        document.getElementById('hidden-file-input-two').click();
    };
    const handleBoxClickThree = () => {
        document.getElementById('hidden-file-input-three').click();
    };

    const [firebaseUploadImageOne, setFirebaseUploadImageOne] = useState(""); 
    const [firebaseUploadImageTwo, setFirebaseUploadImageTwo] = useState(""); 
    const [firebaseUploadImageThree, setFirebaseUploadImageThree] = useState(""); 

  
    const handleFileChange = (event, number) => {
      const firebaseUploadImageArray = [setFirebaseUploadImageOne, setFirebaseUploadImageTwo, setFirebaseUploadImageThree]; 

      const file = event.target.files[0];
      (firebaseUploadImageArray[number])(file); 
      if (file) {
        const imageViewArray = [setImageViewOne, setImageViewTwo, setImageViewThree]; 
        const imagePreviewURLArray = [setImagePreviewUrlOne, setImagePreviewUrlTwo, setImagePreviewUrlThree];

        const reader = new FileReader();
        reader.onloadend = () => {
            (imagePreviewURLArray[number])(reader.result);
        };
        reader.readAsDataURL(file);
        (imageViewArray[number])(true);  
      }
    };

    function updateImageSrcArray() {
        imageSrcArray = []; 

        if(imagePreviewUrlOne !== "") {
            imageSrcArray.push(imagePreviewUrlOne); 
        } 
        
        if(imagePreviewUrlTwo !== "") {
            imageSrcArray.push(imagePreviewUrlTwo); 
        }

        if(imagePreviewUrlThree !== "") {
            imageSrcArray.push(imagePreviewUrlThree); 
        }

        if(imageSrcArray.length === 0) {
            imageSrcArray.push(ListingPreviewImage); 
        }
    }

    function handlePictureClose(number) {
        const imageViewArray = [setImageViewOne, setImageViewTwo, setImageViewThree]; 
        const imagePreviewURLArray = [setImagePreviewUrlOne, setImagePreviewUrlTwo, setImagePreviewUrlThree];

        (imageViewArray[number])(false);  
        (imagePreviewURLArray[number])("");
    }

    // Text Stuff
    const [title, setTitle] = useState("");  

    function handleTitleChange(event) {
        const newValue = event.target.value;
        setTitle(newValue);
    }

    const [estimatedPrice, setEstimatedPrice] = useState("");  

    function handleEstimatedPriceChange(event) {
        const newValue = event.target.value;
        setEstimatedPrice(newValue);
    }

    const [size, setSize] = useState("");  

    function handleSizeChange(event) {
        const newValue = event.target.value;
        setSize(newValue);
    }

    const [articleOfClothing, setArticleOfClothing] = useState(""); 

    function handleArticleClothingChange(event) {
        const newValue = event.target.value;
        setArticleOfClothing(newValue);
    }

    const [description, setDescription] = useState(""); 
    
    function handleDescriptionChange(event) {
        const newValue = event.target.value;
        setDescription(newValue);
    }

    const [gender, setGender] = useState(""); 

    function handleGenderChange(event) {
        const newValue = event.target.value;
        setGender(newValue);
    }

    // Firebase Stuff 
    const {currentUser} = useAuth();

    // const fetchProfileInformation = async () => {
    //     try {
    //       const idToken = await currentUser.getIdToken(); 
    //       console.log(idToken); 
    //     } catch(e) {
    //       console.log(e); 
    //     }
    //   }

    // useEffect(() => {
    //     console.log("RAAAHAHHH"); 
    //     if(currentUser) {
    //         fetchProfileInformation();
    //     }
    // }, [currentUser]);

    const uploadSpecificImage = async (imageToUpload) => {
        const imageRef = ref(storage, `images/${imageToUpload.name + v4()}`);
        try {
            const imageRef = ref(storage, `images/${imageToUpload.name + v4()}`);
            const snapshot = await uploadBytes(imageRef, imageToUpload);
            const url = await getDownloadURL(snapshot.ref);
            return url; 
        } catch (error) {
            console.error("Error uploading image:", error);
            return null; 
        }
    };

    // const uploadImages = async () => {
    //     return firebaseURLS; 
    // };

    const [modalText, setModalText] = useState("");
    const [modalDisplayImage, setModalDisplayImage] = useState(false); 

    const addListing = async () => {

        setModalTruthValue(true); 
        setModalText("Waiting...."); 
        setModalDisplayImage(false); 


        const firebaseImageUploadArray = [firebaseUploadImageOne, firebaseUploadImageTwo, firebaseUploadImageThree]; 
        const firebaseURLS = []; 
        for (let i = 0; i < firebaseImageUploadArray.length; i++) {
            if(firebaseImageUploadArray[i] !== "") {
                const url = await uploadSpecificImage(firebaseImageUploadArray[i]);
                if(url) {
                    firebaseURLS.push(url); 
                } else {
                    // ERROR ; 
                }
            }
        }

        try {
            const backendURL = process.env.REACT_APP_BACKEND;
            const idToken = await currentUser.getIdToken(); 

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = "Bearer " +  idToken; 
            myHeaders.append("Authorization", token);

            const raw = JSON.stringify({
                "title": title, 
                "userEmail": currentUser.email,
                "description": description,
                "size": size,
                "clothingArticle": articleOfClothing,
                "estimatedMonetaryValue": estimatedPrice,
                "images": firebaseURLS, 
                "gender": gender, 
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };
            const url = `${backendURL}/item/upload_item_test`
            const response = await fetch(url, requestOptions);
            const result = await response.text(); 

            setModalDisplayImage(true); 
            setModalText("Added Item Successfully!"); 
            setModalDisplayImage(true); 
                // ERROR ^
        } catch(e) {
            // ERROR 
            console.log(e); 
        }
    }

  
    return (
        <Box>
            <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" sx={{position: "sticky", backgroundColor: "#A5B9E0",  zIndex: "mobile stepper"}}>
                <Box p={1.5} sx={{backgroundColor: "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Barter Buddies
                    </Typography>
                </Box>
                <NavBarButtons/>
                <IconButton onClick={() => setclothingCardStatus(true)}>
                    <AccountCircleIcon sx={{fontSize: {xs: "65px"},  display: {xs: 'none', md: 'block'}}}/>
                </IconButton> 
                <IconButton onClick={() => setBurgerStatus(true)}>
                    <MenuIcon sx={{fontSize: {xs: "65px"},  display: {xs: 'block', md: 'none' }}}/>
                </IconButton> 
                {burgerStatus && 
                <Box sx={{width: "100vw", height: "100vh", backgroundColor: "#A5B9E0", zIndex: "tooltip", position: 'fixed', top: 0, left: 0}}>
                    <Box p={1} sx={{display: "flex", justifyContent:"flex-end", alignItems:"flex-end"}}> 
                    <IconButton onClick={() => setBurgerStatus(false)}>
                        <CloseIcon sx={{fontSize: "50px"}}/>
                    </IconButton> 
                    </Box>
                    <Box sx={{margin: 2, display: "flex", justifyContent:"center", alignItems:"center"}}> 
                        <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                            Menu
                        </Typography>
                    </Box>
                    <Stack p={2} direction="column" justifyContent="flex-start" alignItems="flex-start" gap="30px">
                    <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Profile
                    </Typography>
                    <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Clothes
                    </Typography>
                    <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Offers
                    </Typography>
                    <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Listings 
                    </Typography>
                    </Stack>
                </Box>
                }
            </Stack>
            <Stack direction="row">
            {/* p={2}  under*/}
                <Stack sx={{flex: {xs: 1, md: 0}}} className="add-item-stack" p={2} direction="column" gap="20px" backgroundColor="#A5B9E0" height="85vh">
                    <Typography variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                        Add an Item 
                    </Typography>
                    <Stack direction="row" gap="20px">
                        {!imageViewOne && 
                            <Box display="flex" alignItems="center" justifyContent="center" width="100px" height="100px" sx={{cursor: "pointer", backgroundColor: "#D9D9D9"}} onClick={handleBoxClickOne}> 
                                <input type="file" id="hidden-file-input-one" hidden accept="image/*" onChange={(event) => handleFileChange(event, 0)} style={{ display: 'none' }}/>
                                <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000' }}>
                                    Add Photo
                                </Typography>
                            </Box>
                        }
                        {imageViewOne && 
                            <Box sx={{position: "relative", height: "100px", width: '100px', overflow: 'hidden'}}>
                                <Box component="img" sx={{height: "100px", display: 'block', overflow: 'hidden', width: '100px'}} src={imagePreviewUrlOne}/>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", right: 0, top: 0, width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%' }}>
                                    <IconButton onClick={() => handlePictureClose(0)}>
                                        <CloseIcon sx={{fontSize: "15px"}}/>
                                    </IconButton> 
                                </Box>
                            </Box>
                        }
                        {!imageViewTwo && 
                            <Box display="flex" alignItems="center" justifyContent="center" width="100px" height="100px" sx={{cursor: "pointer", backgroundColor: "#D9D9D9"}} onClick={handleBoxClickTwo}> 
                                <input type="file" id="hidden-file-input-two" hidden accept="image/*" onChange={(event) => handleFileChange(event, 1)} style={{ display: 'none' }}/>
                                <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000' }}>
                                    Add Photo
                                </Typography>
                            </Box>
                        }
                        {imageViewTwo && 
                            <Box sx={{position: "relative", height: "100px", width: '100px', overflow: 'hidden'}}>
                                <Box component="img" sx={{height: "100px", display: 'block', overflow: 'hidden', width: '100px'}} src={imagePreviewUrlTwo}/>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", right: 0, top: 0, width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%' }}>
                                    <IconButton onClick={() => handlePictureClose(1)}>
                                        <CloseIcon sx={{fontSize: "15px"}}/>
                                    </IconButton> 
                                </Box>
                            </Box>
                        }
                        {!imageViewThree && 
                            <Box display="flex" alignItems="center" justifyContent="center" width="100px" height="100px" sx={{cursor: "pointer", backgroundColor: "#D9D9D9"}} onClick={handleBoxClickThree}> 
                                <input type="file" id="hidden-file-input-three" hidden accept="image/*" onChange={(event) => handleFileChange(event, 2)} style={{ display: 'none' }}/>
                                <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000' }}>
                                    Add Photo
                                </Typography>
                            </Box>
                        }
                        {imageViewThree && 
                            <Box sx={{position: "relative", height: "100px", width: '100px', overflow: 'hidden'}}>
                                <Box component="img" sx={{height: "100px", display: 'block', overflow: 'hidden', width: '100px'}} src={imagePreviewUrlThree}/>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", right: 0, top: 0, width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%' }}>
                                    <IconButton onClick={() => handlePictureClose(2)}>
                                        <CloseIcon sx={{fontSize: "15px"}}/>
                                    </IconButton> 
                                </Box>
                            </Box>
                        }
                    </Stack>
                    <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={handleTitleChange}/>
                    <TextField id="outlined-basic" label="Estimated Price" variant="outlined" value={estimatedPrice} onChange={handleEstimatedPriceChange}/>
                    <FormControl fullWidth>
                        <InputLabel id="article-clothing-select-label">Article of Clothing</InputLabel>
                        <Select
                            labelId="article-clothing-select-label"
                            id="article-clothing-select"
                            value={articleOfClothing}
                            label="Article of Clothing"
                            onChange={handleArticleClothingChange}
                        >
                            <MenuItem value="Shirts">Shirts</MenuItem>
                            <MenuItem value="Pants">Pants</MenuItem>
                            <MenuItem value="Shoes">Shoes</MenuItem>
                            <MenuItem value="Dresses">Dresses</MenuItem>
                            <MenuItem value="Swimwear">Swimwear</MenuItem>
                            <MenuItem value="Suits">Suits</MenuItem>
                            <MenuItem value="Hoodies">Hoodies</MenuItem>
                            <MenuItem value="Activewear">Activewear</MenuItem>

                        </Select>
                    </FormControl>
                    <Stack direction="row" justifyContent="space-evenly"> 
                        <FormControl fullWidth>
                            <InputLabel id="size-select-label">Size</InputLabel>
                            <Select
                                labelId="size-select-label"
                                id="size-select"
                                value={size}
                                label="Size"
                                onChange={handleSizeChange}
                            >
                                <MenuItem value="XS">XS</MenuItem>
                                <MenuItem value="S">S</MenuItem>
                                <MenuItem value="M">M</MenuItem>
                                <MenuItem value="L">L</MenuItem>
                                <MenuItem value="XL">XL</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="gender-select-label">Gender</InputLabel>
                            <Select
                                labelId="gender-select-label"
                                id="gender-select"
                                value={gender}
                                label="Gender"
                                onChange={handleGenderChange}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Unisex">Unisex</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack> 
                    <TextField
                        placeholder="Description"
                        multiline
                        rows={2}
                        maxRows={4}
                        value={description} onChange={handleDescriptionChange}
                    />
                    <Box p={2} backgroundColor="#D9D9D9"> 
                        <Typography onClick={() => addListing()}variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: "#000000"}}>
                            Add Listing
                        </Typography>
                    </Box> 
                    
                </Stack> 
                <Stack flex={1} className="responsive-stack" sx={{display: {xs: "none", md: "flex"}}}>
                    <Stack p={2} flex={1} direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" gap={"75px"}> 
                        {updateImageSrcArray()}
                        <ImageCarousel srcArray={imageSrcArray}/>
                        <Stack direction="column" gap={"25px"} width="300px" >
                            <Typography variant="h3" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000', maxWidth:"300px", wordWrap: "break-word"}}>
                                {title === "" ? "Title" : title}
                            </Typography>
                            <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                                {"Seller: " + currentUser.displayName} 
                            </Typography>
                            <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                                {estimatedPrice === "" ? "Estimated Price" : "$" + estimatedPrice}
                            </Typography>
                            <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000', maxWidth:"300px", wordWrap: "break-word"}}>
                                {articleOfClothing === "" ? "Article of Clothing" : articleOfClothing}
                            </Typography>
                            <Typography variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000'}}>
                                {size === "" ? "Size" : "Size: " + size}
                            </Typography>
                            <Typography wrap variant="subtitle1" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'start', color: '#000000', maxWidth:"350px", wordWrap: "break-word"}}>
                                {description === "" ? "Description" : "Description: " + description}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            {modalTruthValue &&  
                <Modal modalValue={modalTruthValue} modalText={modalText} displayImage={modalDisplayImage}/>
            }
            {/* <Card sx={{ maxWidth: 345, borderRadius: '16px', backgroundColor: '#D3D3D3', border: '1px solid #0000FF', boxShadow: 'none' }}>
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="div">
                Confirm your trade!
                </Typography>
                <Box mt={2}>
                <Button variant="contained" color="primary">
                    CONFIRM
                </Button>
                </Box>
            </CardContent>
            </Card> */}
        </Box>
    );
}



export default AddClothingItem

// <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />


{/* <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleFileChange}/>
        </Button>
        {imagePreviewUrl && (
          <Box mt={2} display="flex" justifyContent="center">
            <Box component="img" sx={{height: "100px", width: "100px", display: 'block', overflow: 'hidden'}} src={imagePreviewUrl}/>
          </Box>
        )} */}


{/* <Box src={imageView ? imagePreviewUrl : undefined} component={imageView ? "img" : "div"} display="flex" alignItems="center" justifyContent="center" width="100px" height="100px" sx={{cursor: "pointer",  backgroundColor: "orange" }} onClick={handleBoxClick}> 
            {!imageView && 
                <Box> 
                    <input type="file" id="hidden-file-input" hidden accept="image/*" onChange={handleFileChange} style={{ display: 'none' }}/>
                    <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Add Photo
                    </Typography>
                </Box> 
            }
        </Box> */}

                                    {/* <Box p={1} sx={{backgroundColor: "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center", width: "208px"}}>
                                <Typography onClick={() => setTradeStatus(true)} variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                                    Make a Trade!
                                </Typography>
                            </Box> */}