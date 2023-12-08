import { Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [enteredRoomName, setEnteredRoomName] = useState("");
  console.log(enteredRoomName);
  let navigate = useNavigate();

  const handleClick=async()=>{
    const response = await fetch(`http://localhost:5000/student/${enteredRoomName}`);
    const data = await response.json();
    console.log('fahim',data)
    if (data.result == true) {
      fetch(`http://localhost:5000/EditQuiz/${data._id}`)
        .then(res => res.json())
        .then(data => {
          console.log('tazwer',data)
          navigate("/student/quiz", { state: { data: data } });
        })
    }else{
        alert('The Room name you have entered is wrong')
    }
  }
  return (
    <div>
      <Container sx={{ bgcolor: "#DFEAF3", p: 4, textAlign: "left" }}>
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
