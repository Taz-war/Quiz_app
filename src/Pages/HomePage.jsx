import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Logo from "../assets/logo(2).png";
import { Box } from '@mui/material';
import background from '../assets/logo(3).png'
import { useState } from 'react';
import PopupModal from '../Components/HomePage_Components/PopupModal';

const HomePage = () => {
    const [open, setOpen] = useState(false);
  return (
      <Box sx={{
          backgroundImage: `url("https://i.ibb.co/Jr2mf11/logo-3.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh' }}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
          <Toolbar>
                <img src={Logo} alt="QuizCrafters Logo" style={{ marginRight: 'auto', height: '100px',width:'300px' }} />
            <Button variant='outlined'  sx={{mr:2,color:'#e3f2fd',borderColor:'#e3f2fd'}}>Contact Sales</Button>
              <Button sx={{bgcolor:'white',color:'blue'}} variant='contained'  onClick={()=>setOpen(true)}>Login</Button>
          </Toolbar>
      </AppBar>
      {open && <PopupModal open={open} setOpen={setOpen}/>}
    </Box>
  )
}

export default HomePage
