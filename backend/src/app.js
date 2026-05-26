import express from 'express'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit';

const app = express()

// Rate limiting
const limiter = rateLimit({
   windowMs: 1 * 60 * 1000, 
   max: 5, // limit each IP to 5 requests per windowMs
   message: {
        message: "Too many requests"
   }

});

app.use(limiter);
app.use(express.json())
app.use(cookieParser())
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));

// CORS configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    next();
});

import userRoutes from './routes/user.routes.js'


// routes
app.use('/api/users', userRoutes)


export default app