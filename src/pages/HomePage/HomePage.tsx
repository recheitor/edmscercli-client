import React from 'react';
import { Button, Box,  } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HomePage.css'; 

function HomePage(): React.ReactElement {
  return (
    <Box>
      <h1>Select UI</h1>
      <div className='home-links'>
      <Link to="/admin"> 
        <Button variant="outlined" size="large" className="home-links-button">Admin</Button>
      </Link>
      <Link to="/employee"> 
      <Button variant="outlined" size="large" className="home-links-button">Employee</Button>
      </Link>
      </div>

    </Box>
  );
}

export default HomePage;
