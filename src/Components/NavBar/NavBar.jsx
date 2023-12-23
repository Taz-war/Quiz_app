import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [activeButton, setActiveButton] = useState("");

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
        {/* Menu icon on the left */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

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
            to={`/`}
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "#5C6BC3",
                viewTransitionName: isTransitioning ? "slide" : "",
                textDecoration:'none'
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
                textDecoration:'none'
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
                textDecoration:'none'
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
                textDecoration:'none'
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
                textDecoration:'none'
              };
            }}
          >
            Live Results
          </NavLink>
        </Button>

        {/* Space element to push the following elements to the right */}
        <div style={{ flexGrow: 1 }} />

        {/* Elements aligned to the right */}
        <Button color="inherit" sx={{ marginX: 1 }}>
          TAZWER
        </Button>
        <Button color="inherit" sx={{ marginX: 1 }}>
          Get PRO
        </Button>
        <Button color="inherit" sx={{ marginX: 1 }}>
          FT
        </Button>

        {/* User account or settings icon */}
        <IconButton color="inherit" sx={{ ml: 2 }}>
          {/* Icon for your user account or similar functionality */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
