import { Server } from "socket.io";

let io;

export const onlineUsers = new Map();

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }

  return io;
};

export {
  initializeSocket,
  getIO
};