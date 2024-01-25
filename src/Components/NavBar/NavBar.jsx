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
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from "react";
import { useContext } from "react";
import { CreateQuizContex } from "../../Context_Api/CreateQuizStateProvider";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";
import Logo from "../../assets/logo(2).png";
import {  useThemeToggle } from "../../Context_Api/ThemeProvider ";
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const { userName,userId } = useContext(CreateQuizContex);
  const [activeButton, setActiveButton] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
 const theme = useTheme();
  const { toggleTheme } = useThemeToggle();

  // console.log('intake',userId)
  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Sign-out successful, navigate to login page or handle as needed
      localStorage.clear();
      navigate("/"); // Replace '/login' with your login route
      console.log("User signed out successfully");
    } catch (error) {
      // An error happened.
      console.error("Error signing out: ", error);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Function to handle button click
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // Function to apply conditional styles
  const getButtonStyle = (buttonName) => ({
    color: activeButton === buttonName ? "red" : "inherit", // Change 'red' to your desired active color
    textDecoration: "none",
    marginX: 1,
  });
  return (
    <AppBar position="static" sx={{ bgcolor: "#e8eaf6", color: "#5c6bc0" }}>
      <Toolbar>

      <img src={Logo} alt="QuizCrafters Logo" style={{ marginRight: 'auto', height: '50px',width:'300px' }} />
        

        {/* The main logo or title with flex-grow to push everything else to the right */}
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Launch
        </Typography> */}

        {/* Navigation buttons */}
        <Button
          color="inherit"
          sx={getButtonStyle("Launch")}
          onClick={() => handleButtonClick("Launch")}
        >
          <NavLink
            to={`/Launch`}
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "#5C6BC3",
                viewTransitionName: isTransitioning ? "slide" : "",
                textDecoration: "none",
              };
            }}
          >
            Launch
          </NavLink>
        </Button>
        <Button
          color="inherit"
          sx={getButtonStyle("Library")}
          onClick={() => handleButtonClick("Library")}
        >
          <NavLink
            to={`/Library`}
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "#5C6BC3",
                viewTransitionName: isTransitioning ? "slide" : "",
                textDecoration: "none",
              };
            }}
          >
            Library
          </NavLink>
        </Button>
        <Button
          color="inherit"
          sx={getButtonStyle("Rooms")}
          onClick={() => handleButtonClick("Rooms")}
        >
          <NavLink
            to={`/Rooms`}
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "#5C6BC3",
                viewTransitionName: isTransitioning ? "slide" : "",
                textDecoration: "none",
              };
            }}
          >
            Rooms
          </NavLink>
        </Button>
        <Button
          color="inherit"
          sx={getButtonStyle("Reports")}
          onClick={() => handleButtonClick("Reports")}
        >
          <NavLink
            to={`/Reports`}
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "#5C6BC3",
                viewTransitionName: isTransitioning ? "slide" : "",
                textDecoration: "none",
              };
            }}
          >
            Reports
          </NavLink>
        </Button>
        <Button
          color="inherit"
          sx={getButtonStyle("Live Results")}
          onClick={() => handleButtonClick("Live Results")}
        >
          <NavLink
            to={`/LiveResult`}
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "#5C6BC3",
                viewTransitionName: isTransitioning ? "slide" : "",
                textDecoration: "none",
              };
            }}
          >
            Live Results
          </NavLink>
        </Button>

        {/* Space element to push the following elements to the right */}
        <div style={{ flexGrow: 1 }} />

        {/* Elements aligned to the right */}
        {/* <Button onClick={toggleTheme}>Toggle Theme</Button> */}
        <IconButton onClick={toggleTheme} color="inherit">
          {theme.palette.mode === 'dark' ? <LightModeIcon fontSize="large"/> : <DarkModeIcon fontSize="large"/>}
        </IconButton>

        <Button color="inherit" sx={{ marginX: 1 }}>
          {userName}
        </Button>
        {/* <Button color="inherit" sx={{ marginX: 1 }} onClick={handleMenu}>
          FT
        </Button> */}
        {/* Menu icon on the left */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={()=>{navigate(`/teacher/profile/${userId}`); handleClose()}}>Profile</MenuItem>
          {/* <MenuItem onClick={handleClose}>Help Topics</MenuItem> */}
          {/* <MenuItem onClick={handleClose}>Contact Socrative</MenuItem> */}
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
        {/* User account or settings icon */}
        <IconButton color="inherit" sx={{ ml: 2 }}>
          {/* Icon for your user account or similar functionality */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
