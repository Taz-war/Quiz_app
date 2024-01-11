import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Logo from "../../assets/logo(2).png";

const StudentNavBar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#e8eaf6", color: "#5c6bc0" }}>
      <Toolbar>
        {/* Menu icon on the left */}
        <img src={Logo} alt="QuizCrafters Logo" style={{ marginRight: 'auto', height: '50px',width:'300px' }} />

        {/* The main logo or title with flex-grow to push everything else to the right */}


        {/* Space element to push the following elements to the right */}
        <div style={{ flexGrow: 1 }} />

        {/* Elements aligned to the right */}
        {/* <Button color="inherit" sx={{ marginX: 1 }}>
          {userName}
        </Button> */}
      

        {/* User account or settings icon */}
        <IconButton color="inherit" sx={{ ml: 2 }}>
          {/* Icon for your user account or similar functionality */}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default StudentNavBar