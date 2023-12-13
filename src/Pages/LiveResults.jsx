import { Progress, Space } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import { red, green, blue } from '@ant-design/colors';
const LiveResults = () => {
  const [roomData, setRoomData] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const socket = io("http://localhost:5000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    // socket.emit("joinRoom", "C7h9EM");
    socket.on("connectedRoom", (data) => {
      console.log("socketroom", data);
      setRoomData(data);
    });
    socket.on("roomSize", (data) => {
      console.log("roomSize", data);
      setRoomSize(data);
    });
  }, []);

  return (
    <div>
      <h1>{`This is live results ${roomData}`}</h1>
      <h2>{roomSize}</h2>
      <Space size={70} >
        
        <Progress percent={60} size={[50,20]} steps={5} strokeColor={[green[6], blue[6], red[5]]} />
        
      </Space>
    </div>
  );
};

export default LiveResults;
