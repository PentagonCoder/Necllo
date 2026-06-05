import dotenv from 'dotenv'
dotenv.config()

import http from "http";
import connectDB from './db/index.js'
import app from './app.js'
import socketHandler from './sockets/socketHandler.js'
import { initializeSocket } from './sockets/socket.js'

const port = 3000
const server = http.createServer(app);
const io = initializeSocket(server);
socketHandler(io);

// database connection and server start
connectDB()
.then(()=> console.log("Connected to MongoDB"))
.then(() => {
    server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    })
})
.catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the application if the database connection fails
});
