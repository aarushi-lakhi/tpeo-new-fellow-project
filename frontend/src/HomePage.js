import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Button, Box, TextField } from '@mui/material'; // Import Box and TextField

const HomePage = () => {
  const navigate = useNavigate(); //Hook for snavigating to different routes

  const handleLogin = () => {
    console.log("Handle Login"); 
    navigate('/login'); 
  }

  const handleSignup = () => {
    console.log("Handle Signup"); 
    navigate('/signup'); 
  }

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        component="form"
        flexDirection="column"
        sx={{
          '& > :not(style)': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
        <Typography align="center" variant="h3" component="h2">
            Home Page
        </Typography>
        </div>
        <Button onClick={handleSignup} variant="outlined">Sign-Up Button</Button>
        <Button onClick={handleLogin} variant="outlined">Sign-In Button</Button>
      </Box>
    </div>

  );
};

export default HomePage;