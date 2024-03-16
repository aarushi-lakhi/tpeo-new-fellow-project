// TODO: Yet to finish the following to make placing and accepting offers endpoints work:
// change offered and offering arrays in the database to be an array of references to other products
// have fields modify array in database instead of sample data arrays made in server.js
// update frontend to click on image of product instead of typing product document
// remove email fields, and use userDocumentReference instead


import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const OfferManagement = () => {
  const [userOneProductDocument, setUserOneProductDocument] = useState('');
  const [userTwoProductDocument, setUserTwoProductDocument] = useState('');
  const [userOneEmail, setUserOneEmail] = useState('');
  const [userTwoEmail, setUserTwoEmail] = useState('');

  const handlePlaceOffer = async () => {
    try {
      const response = await fetch('/place_offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userOneProductDocument,
          userTwoProductDocument,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error placing offer:', error);
    }
  };

  const handleAcceptOffer = async () => {
    try {
      const response = await fetch('/accept_offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userOneProductDocument,
          userTwoProductDocument,
          userOneEmail,
          userTwoEmail,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error accepting offer:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Offer Management</Typography>
      <div>
        <TextField
          label="User One Product Document"
          value={userOneProductDocument}
          onChange={(e) => setUserOneProductDocument(e.target.value)}
        />
        <TextField
          label="User Two Product Document"
          value={userTwoProductDocument}
          onChange={(e) => setUserTwoProductDocument(e.target.value)}
        />
        <Button variant="contained" onClick={handlePlaceOffer}>Place Offer</Button>
      </div>
      <div>
        <TextField
          label="User One Email"
          value={userOneEmail}
          onChange={(e) => setUserOneEmail(e.target.value)}
        />
        <TextField
          label="User Two Email"
          value={userTwoEmail}
          onChange={(e) => setUserTwoEmail(e.target.value)}
        />
        <Button variant="contained" onClick={handleAcceptOffer}>Accept Offer</Button>
      </div>
    </div>
  );
};

export default OfferManagement;
