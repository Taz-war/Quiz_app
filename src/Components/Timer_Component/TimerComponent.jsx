import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { useTimer } from "react-timer-hook";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import NotStartedRoundedIcon from "@mui/icons-material/NotStartedRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import InputAdornment from '@mui/material/InputAdornment';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import { useContext } from "react";
import { CreateQuizContex } from "../../Context_Api/CreateQuizStateProvider";

const TimerComponent = () => {
    const { setStartExam } = useContext(CreateQuizContex);
  const [inputValue, setInputValue] = useState("");
  const [expiryTimestamp, setExpiryTimestamp] = useState(new Date());
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
        setStartExam(false)
    },
    autoStart: false,
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    const durationInSeconds = parseInt(inputValue, 10) * 60; // Convert minutes to seconds
    const time = new Date();
    time.setSeconds(time.getSeconds() + durationInSeconds);
    setExpiryTimestamp(time);
    setInputValue('')
  };

  const handleStartTimer = () => {
    restart(expiryTimestamp, true); // Restart and start the timer
    setStartExam(true)
  };

  const formatTime = (time) => {
    // Convert the time to a string and pad it with zeros if necessary to ensure it has at least two digits
    return String(time).padStart(2, "0");
  };
  return (
    <Box display={"flex"} mt={4}>
      <Box width={"50%"} textAlign={"left"} pl={3}>
        <Typography variant="h6" fontWeight={'bolder'} mb={2}>
          Exam duration(in minutes) :
        </Typography>
        {/* <TextField size="small" onChange={(e)=>setExamDuration((e.target.value)*60)}>Exam duration</TextField> */}
        <TextField
          size="small"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSubmit}>
                  <CheckIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Exam duration"
        />
      </Box>
      <div style={{ textAlign: "center",width:'50%' }}>
        <div style={{ fontSize: "30px", marginBottom: 6 }}>
          <span
            style={{
              backgroundColor: "#E7EDF0",
              borderRadius: "6px",
              padding: 1,
            }}
          >
            {formatTime(hours)}
          </span>
          :
          <span
            style={{
              backgroundColor: "#E7EDF0",
              borderRadius: "6px",
              padding: 1,
            }}
          >
            {formatTime(minutes)}
          </span>
          :
          <span
            style={{
              backgroundColor: "#E7EDF0",
              borderRadius: "6px",
              padding: 1,
            }}
          >
            {formatTime(seconds)}
          </span>
        </div>
        {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
        <Button
          variant="outlined"
          title="start"
          sx={{
            bgcolor: "#E8EAF6",
            "&:hover": { bgcolor: "transparent" },
            mr: 2,
          }}
          onClick={()=>{start();handleStartTimer()}}
          size="small"
        >
          <PlayCircleFilledOutlinedIcon
            titleAccess="start"
            sx={{ color: "#6161c9" }}
            fontSize="medium"
          />
        </Button>
        <Button
          variant="outlined"
          title="pause"
          sx={{
            bgcolor: "#E8EAF6",
            "&:hover": { bgcolor: "transparent" },
            mr: 2,
          }}
          onClick={pause}
          size="small"
        >
          <PauseCircleRoundedIcon sx={{ color: "#6161c9" }} fontSize="medium" />
        </Button>
        <Button
          variant="outlined"
          title="resume"
          sx={{
            bgcolor: "#E8EAF6",
            "&:hover": { bgcolor: "transparent" },
            mr: 2,
          }}
          onClick={resume}
          size="small"
        >
          <NotStartedRoundedIcon sx={{ color: "#6161c9" }} fontSize="medium" />
        </Button>
      </div>
    </Box>
  );
};

export default TimerComponent;
