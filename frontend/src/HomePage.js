import React from 'react';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

  const navigate = useNavigate(); //Hook for navigating to different routes

  const handleLogin = () => {
    console.log("Handle Login"); 
    navigate('/login'); 
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleLogin}>Sign-Up Button</button>
    </div>

  );
};

export default HomePage;
