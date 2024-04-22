import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Sucess from "./ClothingArticlesImages/Success.png"
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {useAuth} from '../AuthContext';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  backgroundColor: "#D9D9D9", 
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function ConfirmTradeModal({modalValue, theirOffer, yourItem}) {
  const backendURL = process.env.REACT_APP_BACKEND;

  const [open, setOpen] = React.useState(modalValue);
  const [infoDisplay, setInfoDisplay] = useState(false); 

  const {currentUser} = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  async function confirmButtonClicked() {
    console.log("we here")
      try {
          const idToken = await currentUser.getIdToken(); 

          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          const token = "Bearer " +  idToken; 
          myHeaders.append("Authorization", token);

          const raw = JSON.stringify({  
              "userOneEmail":  theirOffer.userDocumentReference.Email,
              "userTwoEmail": yourItem.userDocumentReference.Email,
              "userOneProductDocument": theirOffer.id,
              "userTwoProductDocument": yourItem.id 
          });

          const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow"
          };

          const url = `${backendURL}/offer/accept_offer`
          const repsonse = await fetch(url, requestOptions); 
          const result = await repsonse.json(); 
          setInfoDisplay(true); 
      } catch(e) { 
        console.log(e); 
        console.log("there was an error"); 
          // Catch Error
      }
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box> 
            {!infoDisplay && 
                <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ ...style, width: 500 }}>
                    <Typography p={4} variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                          Confirm your trade! 
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{backgroundColor: "#A5B9E0", borderRadius: "5%", border: '2px solid #000'}}> 
                        <Typography onClick={() => confirmButtonClicked()} p={1} variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                            Confirm
                        </Typography>
                    </Box>
                </Stack>
            }
            {infoDisplay && 
            
                <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ ...style, width: 500 }}>
                    <Box display="flex" justifyContent="flex-end" sx={{width: "100%"}}>
                      <IconButton onClick={() => handleClose()}>
                          <CloseIcon/>
                      </IconButton>
                    </Box>
                    <Typography p={4} variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                            Trade confirmed! 
                    </Typography>
                    <Typography p={4} variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Reach out to{' '}
                        <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                          shivansh.nikhra@utexas.edu
                        </span>
                        {' '}to trade your items!
                        {/* CHANGE ABOVE LINK LATER  */}
                    </Typography>
                </Stack>
            }
        </Box> 
      </Modal>
    </div>
  );
}