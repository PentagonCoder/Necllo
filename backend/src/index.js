import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/index.js'
import app from './app.js'

const port = 3000

// database connection and server start
connectDB()
.then(()=> console.log("Connected to MongoDB"))
.then(() => {
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    })
})
.catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the application if the database connection fails
});
