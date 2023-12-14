import { Progress, Space } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import { red, green, blue } from "@ant-design/colors";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Item from "antd/es/list/Item";
const LiveResults = () => {
  const [roomData, setRoomData] = useState("");
  const [steps, setSteps] = useState(0);
  const [QuestionCompleted, setQuestionCompleted] = useState(0);
  const [enteredStudents, setEnteredStudents] = useState([]);



  const socket = io("http://localhost:5000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.emit("joinAdminRoom", "admin");
    // socket.emit("joinRoom", "C7h9EM");
    socket.on("userJoined", (userData, step, completedQuestions) => {
      console.log({ userData });
      setQuestionCompleted(completedQuestions);
      setEnteredStudents([...enteredStudents, userData.name]);
      setSteps(step);
    });
    console.log(enteredStudents);
    console.log(steps);
    socket.on("connectedRoom", (data) => {
      console.log("socketroom", data);

      setRoomData(data);
    });
    // socket.on("steps", (data) => {
    //   // console.log("aha", data.studenData.name);
    //   setEnteredStudents([...enteredStudents, data.studenData.name]);
    //   setSteps(data.steps);
    // });
    // socket.on("questionCompleted", (data) => {
    //   setQuestionCompleted(data);
    // });
  }, [socket]);

  console.log({ enteredStudents });
  return (
    <div>
      <h1>{`This is live results ${roomData}`}</h1>
      <h2>{QuestionCompleted}</h2>
      {/* <TableContainer component={Paper}>
        <Table>
          <TableHead></TableHead>
          <TableBody>
            {JSON.stringify(enteredStudents)}
            {enteredStudents.length > 0 &&
              enteredStudents.map((item, index) => {
                return <p>{item}</p>;
                <TableRow key={index}>
                  <TableCell>{item}</TableCell>
                  <TableCell>
                    <Space size={70}>
                      <Progress
                        percent={60}
                        size={[50, 20]}
                        steps={steps}
                        strokeColor={[green[6], blue[6], red[5]]}
                      />
                    </Space>
                  </TableCell>
                </TableRow>;
              })}
          </TableBody>
        </Table>
      </TableContainer> */}
      <Space size={70}>
        <Progress
          percent={(QuestionCompleted / steps) * 100}
          size={[50, 20]}
          steps={steps}
          strokeColor={[green[6], blue[6], red[5]]}
        />
      </Space>
    </div>
  );
};

export default LiveResults;
