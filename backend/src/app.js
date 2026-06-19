import express from 'express'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit';
import cors from 'cors'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // your Vite dev server
  credentials: true // allows cookies to be sent
}))

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



import userRoutes from './routes/user.routes.js'
import workspaceRoutes from './routes/workspace.routes.js'
import projectRoutes from './routes/project.routes.js'
import taskRoutes from './routes/task.routes.js'
import commentRoutes from './routes/comment.routes.js'
import activityRoutes from './routes/activity.routes.js'
import notificationRoutes from './routes/notification.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

// routes
app.use('/api/users', userRoutes)
app.use('/api/workspace', workspaceRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/activity', activityRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/dashboard', dashboardRoutes)
export default app