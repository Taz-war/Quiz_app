import { Label } from "@mui/icons-material";
import { Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {url} from '../../api'
import { Spin } from "antd";

const StudentLoginInfo = () => {
  const location = useLocation();
  const id = location.state?.id;
  const roomName = location.state?.roomName;
  const [loader,setLoader] =useState(false)
  let navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true)
    const StudentInfo = {
      id: uuidv4(),
      name: event.target.name.value,
      email: event.target.email.value,
    };
    try {
        fetch(`${url}/EditQuiz/${id}`)
        .then(res => res.json())
        .then(data => {
          navigate("/student/quiz", { state: { data: data,studentData:StudentInfo,id:id ,roomName: roomName } });
        })
      
    } catch (error) {
      console.error("Error posting question:", error);
    }finally{
      setLoader(false)
    }
  };


  const handleClick = async () => {
    const response = await fetch(
      `${url}/student/loginInfo/${id}`
    );
    const data = await response.json();
  };
  return (
    <div>
      <Container sx={{ bgcolor: "#DFEAF3", p: 4, textAlign: "left",mt:4 }} maxWidth='sm'>
      <Spin tip="Loading..." size="large" spinning={loader}></Spin>
        <Typography variant="h5" textAlign={"center"} fontWeight={"bolder"}>
          Please enter your name and email
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="h7" fontWeight={"bolder"} mb={2}>
            Enter your name
          </Typography>
          <br />
          <TextField
            fullWidth
            placeholder={"name"}
            variant="outlined"
            name="name"
            //   value={answer || ""}
            //   onChange={(e) => setEnteredRoomName(e.target.value)}
            sx={{ marginBottom: "10px", bgcolor: "white", mt: 2 }}
          />
          <Typography variant="h7" fontWeight={"bolder"} mb={2}>
            Enter your email
          </Typography>
          <br />
          <TextField
            fullWidth
            placeholder={"email"}
            variant="outlined"
            name="email"
            //   value={answer || ""}
            //   onChange={(e) => setEnteredRoomName(e.target.value)}
            sx={{ marginBottom: "10px", bgcolor: "white", mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            //   onClick={handleNext}
            //   onClick={handleClick}
            style={{ marginTop: "20px" }}
          >
            Submit Answer
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default StudentLoginInfo;
