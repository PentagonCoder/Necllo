
const socketHandler = (io) => {

  // Map to store online users and their corresponding socket IDs
  const onlineUsers = new Map();

  io.on("connection", (socket) => {

    // Handle user connection
    socket.on("register", (userId) => {

      onlineUsers.set(userId, socket.id);
      socket.emit("notification", { message: "Welcome bro!" });

    });

    // Handle disconnection
    socket.on("disconnect", () => {

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

    });
  });
};

export default socketHandler;