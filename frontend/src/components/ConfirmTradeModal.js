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

export default function ConfirmTradeModal({modalValue, infoDisplayValue}) {
  const [open, setOpen] = React.useState(modalValue);
  const [infoDisplay, setInfoDisplay] = useState(infoDisplayValue); 
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

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
                        <Typography onClick={() => setInfoDisplay(true)} p={1} variant="h5" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                            Confirm
                        </Typography>
                    </Box>
                </Stack>
            }
            {infoDisplay && 
                <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ ...style, width: 500 }}>
                    <Typography p={4} variant="h4" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                            Trade confirmed! 
                    </Typography>
                    <Typography p={4} variant="h6" sx={{fontFamily: 'Poppins', fontWeight: "1000", textAlign: 'center', color: '#000000'}}>
                        Reach out to <Link href="/temp-navbar">@bevo</Link> to trade your items!
                        {/* CHANGE ABOVE LINK LATER  */}
                    </Typography>
                </Stack>
            }
        </Box> 
      </Modal>
    </div>
  );
}