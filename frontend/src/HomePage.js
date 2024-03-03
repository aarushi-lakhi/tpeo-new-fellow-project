import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const HomePage = () => {
  const navigate = useNavigate(); //Hook for snavigating to different routes

  const handleLogin = () => {
    console.log("Handle Login"); 
    navigate('/login'); 
  }

  return (
    <div>
      <div>
        <Typography variant="h3" component="h2">
            Home Page
        </Typography>
      </div>
      <button onClick={handleLogin}>Sign-Up Button</button>
    </div>

  );
};

export default HomePage;