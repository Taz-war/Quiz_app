import { Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {url} from '../../api'
import { Spin } from "antd";

const StudentLogin = () => {
  const [enteredRoomName, setEnteredRoomName] = useState("");
  const [loader,setLoader] = useState(false)
  let navigate = useNavigate();

  const handleNavigation = (data)=>{
    if (data.result == true) {
      navigate("/student/studentLoginInfo", { state: { id: data._id, roomName: enteredRoomName } });
    } else {
      alert('The Room name you have entered is wrong')
    }
  }

  const handleClick=async()=>{
    setLoader(true)
    const response = await fetch(`${url}/student/${enteredRoomName}`);
    const data = await response.json();
    // setTimeout(handleNavigation(data),2000)
    if (data.result == true) {
      setLoader(false)
      navigate("/student/studentLoginInfo", { state: { id: data._id, roomName: enteredRoomName } });
    } else {
      alert('The Room name you have entered is wrong')
    }
  }

  if (loader) {
    return 
  }
  return (
    <div>
      <Container sx={{ bgcolor: "#DFEAF3", p: 4, textAlign: "left",mt:4 }} maxWidth='sm'>
      <Spin tip="Loading..." size="large" spinning={loader}></Spin>
        <Typography variant="h5">Please enter your room name</Typography>
        <TextField
          fullWidth
          label={"room name"}
          variant="outlined"
          //   value={answer || ""}
          onChange={(e) => setEnteredRoomName(e.target.value)}
          sx={{ marginBottom: "10px", bgcolor: "white" }}
        />
        <Button
          variant="contained"
          color="primary"
          //   onClick={handleNext}
          onClick={handleClick}
          style={{ marginTop: "20px" }}
        >
          Submit Answer           
        </Button>
      </Container>
    </div>
  );
};

export default StudentLogin;
