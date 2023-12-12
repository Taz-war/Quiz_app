import { Label } from "@mui/icons-material";
import { Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const StudentLoginInfo = () => {
  const location = useLocation();
  const id = location.state?.id;
  const roomName = location.state?.roomName;
  console.log(id);
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const StudentInfo = {
      id: uuidv4(),
      name: event.target.name.value,
      email: event.target.email.value,
    };
    try {
        fetch(`http://localhost:5000/EditQuiz/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log('tazwer',data)
          navigate("/student/quiz", { state: { data: data,studentData:StudentInfo,id:id ,roomName: roomName } });
        })
      
    } catch (error) {
      console.error("Error posting question:", error);
    }
  };


  const handleClick = async () => {
    const response = await fetch(
      `http://localhost:5000/student/loginInfo/${id}`
    );
    const data = await response.json();
    // console.log('fahim',data)
    // if (data.result == true) {
    //   fetch(`http://localhost:5000/EditQuiz/${data._id}`)
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log('tazwer',data)
    //       navigate("/student/quiz", { state: { data: data } });
    //     })
    // }else{
    //     alert('The Room name you have entered is wrong')
    // }
  };
  return (
    <div>
      <Container sx={{ bgcolor: "#DFEAF3", p: 4, textAlign: "left" }}>
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
