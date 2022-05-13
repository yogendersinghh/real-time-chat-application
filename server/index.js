const express = require("express");
const socket = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5000;
const app = express();
const router = require("./router.js");
const server = http.createServer(app);
const io = socket(server);

const { addUser, removeUser, getUser, getUserInRoom } = require("./user.js");
// const { callbackify } = require("util");
// const { userInfo } = require("os");

io.on("connection", (socket) => {
  // console.log("user is connected ");
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log("socket id 1", socket.id);
    if (error) {
      return callback(error);
    }
    socket.emit("message", {
      user: "admin",
      text: `${user.name} welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });
    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUserInRoom(user.room),
    });
    callback();
  });
  console.log("socket id 2.5", socket.id);
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log("socket id 2", socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", { room: user.room, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the room.`,
      });
    }
  });
});
app.use("/", router);
server.listen(PORT);
