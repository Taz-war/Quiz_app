import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ bgcolor: '#e8eaf6', color:'#5c6bc0'}}>
            <Toolbar>
                {/* Menu icon on the left */}
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>

                {/* The main logo or title with flex-grow to push everything else to the right */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Launch
                </Typography>

                {/* Navigation buttons */}
                <Button color="inherit" sx={{ marginX: 1 }}>Library</Button>
                <Button color="inherit" sx={{ marginX: 1 }}>Rooms</Button>
                <Button color="inherit" sx={{ marginX: 1 }}>Reports</Button>
                <Button color="inherit" sx={{ marginX: 1 }}>Live Results</Button>

                {/* Space element to push the following elements to the right */}
                <div style={{ flexGrow: 1 }} />

                {/* Elements aligned to the right */}
                <Button color="inherit" sx={{ marginX: 1 }}>TAZWER</Button>
                <Button color="inherit" sx={{ marginX: 1 }}>Get PRO</Button>
                <Button color="inherit" sx={{ marginX: 1 }}>FT</Button>

                {/* User account or settings icon */}
                <IconButton color="inherit" sx={{ ml: 2 }}>
                    {/* Icon for your user account or similar functionality */}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

