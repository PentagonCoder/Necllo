import { onlineUsers } from "./socket.js";

const socketHandler = (io) => {

  // Handle socket connection
  io.on("connection", (socket) => {

    console.log("Connected:", socket.id);
    // Handle user registration
    socket.on("register", (userId) => {

      onlineUsers.set(userId, socket.id);

      console.log("Online Users:");
      console.log(onlineUsers);
    });

    // Handle disconnection
    socket.on("disconnect", () => {

      for (const [userId, socketId] of onlineUsers.entries()) {

        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }

      }

      console.log("Disconnected:", socket.id);
    });

  });

};

export default socketHandler;