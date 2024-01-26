import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Logo from "../assets/logo(2).png";
import { Box, Container, Typography } from '@mui/material';
import background from '../assets/logo(3).png'
import { useState } from 'react';
import PopupModal from '../Components/HomePage_Components/PopupModal';
import AnimatedText from '../Components/AnimatedText/AnimatedText';

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
              <Button sx={{bgcolor:'white',color:'blue',"&:hover":{color:'white'}}} variant='contained'  onClick={()=>setOpen(true)}>Login</Button>
          </Toolbar>
      </AppBar>
      <Box p={10} mt={10}>
        <Box sx={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(67, 67, 67, 0.8))',p:2,borderRadius:'15px' }}>
        <Typography variant='h3' sx={{color:'whitesmoke',fontWeight:'bolder'}}>Empower Your Teaching with Interactive Quizzes.</Typography>
        <Typography variant='h5' sx={{ color: '#2891fa', fontWeight: 'bolder' }}>Create, Launch, and Monitor Live Quizzes in Seconds</Typography>
        </Box>
        <Box mt={15}>
          <Typography variant='h3' sx={{ color: '#2891fa',fontWeight:'bolder' }}>Features Overview</Typography>
          <Container sx={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(67, 67, 67, 0.8))', p: 2, borderRadius:'15px' }}>
        <AnimatedText />
          </Container>
        </Box>
      </Box>
      {open && <PopupModal open={open} setOpen={setOpen}/>}
    </Box>
  )
}

export default HomePage
