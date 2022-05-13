import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import "./chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

let socket;
const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  let endpoint = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    socket = io(endpoint);
    console.log("chlaaaaaa");
    setName(name);
    setRoom(room);
    console.log(socket);
    socket.emit("join", { name, room }, () => {});
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
    // console.log(data);
  }, [endpoint, window.location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);
  return (
    <>
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
          {/* <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Chat;
