# Necllo

Necllo is a collaborative project management backend inspired by tools like Trello and Jira.

It provides workspace-based collaboration with role-based access control, project management, task tracking, comments, activity logs, notifications, and real-time updates using Socket.io.

## Features

- JWT-based authentication with access/refresh token flow
- Email verification and password reset (token + OTP)
- Workspace creation, invitation, joining, and role assignment
- Project management inside workspaces
- Task management with assignment and status updates
- Task comments
- Project activity logs
- Notifications API
- Request rate limiting and route-level access control

## Tech Stack

- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- Socket.IO
- JWT (`jsonwebtoken`)
- Zod
- bcrypt
- Nodemailer
- cookie-parser
- express-rate-limit

## Role System Section

Workspace Owner
- Manage workspace
- Manage members
- Manage projects

Admin
- Manage projects
- Manage tasks

Member
- View and update assigned tasks

## Flow
```text
JWT Authentication
↓
Workspace Access Validation
↓
Role Management
↓
Projects
↓
Tasks
↓
Comments
↓
Activity Tracking
↓
Notifications
↓
Socket.io (in progress)
```

## API Structure

Base routes configured in `backend/src/app.js`:

- `/api/users` → authentication and user actions
- `/api/workspace` → workspace operations
- `/api/project` → project and project-task endpoints
- `/api/tasks` → task details, updates, assignment, status
- `/api/comments` → task comments
- `/api/activity` → project activity logs
- `/api/notifications` → notifications

### Key endpoints

#### Users (`/api/users`)
- `POST /register`
- `GET /verify-email/:token`
- `POST /login`
- `POST /refresh-Token`
- `POST /profile`
- `POST /logout`
- `POST /admin/dashboard`
- `POST /forgot-password`
- `POST /reset-password/:token`
- `POST /forgot-password-Otp`
- `POST /reset-password-Otp`

#### Workspace (`/api/workspace`)
- `POST /create`
- `GET /my-workspaces`
- `GET /:workspaceId`
- `PATCH /:workspaceId`
- `POST /invite-users/:workspaceId`
- `POST /join-workspace/:invitationToken`
- `POST /Role-Asing/:workspaceId`
- `DELETE /:workspaceId`

#### Project (`/api/project`)
- `POST /create/:workspaceId`
- `GET /my-projects/:workspaceId`
- `GET /:workspaceId/:projectId`
- `PATCH /:workspaceId/:projectId`
- `DELETE /:workspaceId/:projectId`
- `POST /:workspaceId/:projectId/create-task`
- `GET /:workspaceId/:projectId/tasks`

#### Tasks (`/api/tasks`)
- `GET /:projectId/:taskId`
- `PATCH /:projectId/:taskId`
- `DELETE /:projectId/:taskId`
- `PATCH /:projectId/:taskId/status`
- `PATCH /:projectId/:taskId/assign`

#### Comments (`/api/comments`)
- `POST /:projectId/:taskId`
- `GET /:projectId/:taskId`
- `PATCH /:taskId/:commentId`
- `DELETE /:taskId/:commentId`

#### Activity (`/api/activity`)
- `GET /:projectId`

#### Notifications (`/api/notifications`)
- `GET /`
- `PATCH /read`
- `GET /:notificationId`

## API Diagram

```text
User
│
├── Workspace
│   ├── Projects
│   │   ├── Tasks
│   │   │   ├── Comments
│   │   │   ├── Assignee
│   │   │   └── Activity Logs
│   │   │
│   │   └── Notifications
```

## Installation

```bash
cd backend
npm install
```

## Environment Variables

Create `backend/.env` from `backend/.env.example`:

```env
PORT=yourport
MONGODB_URI=yourmongodburi
ACCESS_TOKEN_SECRET=youraccesssecret
REFRESH_TOKEN_SECRET=yourrefreshsecret
EMAIL_USER=example@gmail.com
EMAIL_PASS=examplepassword
```

## Run Locally

```bash
cd backend
npm run dev
```

## Future Improvements

- Add automated unit and integration tests
- Add production-grade logging and monitoring
- Improve API documentation with OpenAPI/Swagger
- Add CI checks for linting and tests
- Strengthen role/permission granularity across resources
