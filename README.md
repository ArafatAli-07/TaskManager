# TaskManager

A modern, full-stack task management web application built with Next.js, Express.js, MongoDB, and Tailwind CSS. TaskManager allows users to securely register, log in, and manage their daily tasks with full CRUD (Create, Read, Update, Delete) functionality, descriptions, and due dates.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Live Demonstration](#live-demonstration)
- [Screenshots & Previews](#screenshots--previews)
- [Application Architecture](#application-architecture)
- [Project Directory Structure](#project-directory-structure)
- [Tech Stack & Tools](#tech-stack--tools)
- [Environment Variables](#environment-variables)
- [Installation & Local Setup](#installation--local-setup)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)
- [Future Enhancements](#future-enhancements)
- [Author & Contact](#author--contact)
- [License](#license)

---

## Overview

TaskManager is designed to streamline personal productivity by providing an intuitive, responsive interface for organizing workflows. Built on a decoupled architecture with a Next.js frontend and a Node.js/Express RESTful API backend, it delivers secure cookie/JWT-based authentication, real-time feedback via toast notifications, and persistent storage with MongoDB.

---

## Key Features

- User Authentication: Secure registration and login using bcrypt password hashing and JSON Web Tokens (JWT) stored in HTTP-only cookies.
- Task CRUD Operations:
  - Create tasks with a title, detailed description, and due date.
  - View all user-specific tasks organized in a clean dashboard.
  - Update task details and completion status.
  - Delete obsolete tasks with instant UI updates.
- Protected Routes: Middleware-guarded backend routes and client-side route protection ensure unauthorized users cannot access or manipulate tasks.
- Toast Notifications: Real-time feedback for actions like login, registration, task creation, updates, and deletions using React-Toastify.
- Responsive Design: Fully optimized layout for mobile, tablet, and desktop screens built with Tailwind CSS.

---

## Live Demonstration

- Live Application: [https://taskmanager-demo.vercel.app](https://taskmanager-demo.vercel.app)
- Backend API Base URL: [https://taskmanager-api.onrender.com](https://taskmanager-api.onrender.com)

---

## Screenshots & Previews

### Dashboard & Task List
```
+-----------------------------------------------------------------------+
|  TaskManager                   [ Dashboard ]  [ Add Task ]   [ Logout]|
+-----------------------------------------------------------------------+
|                                                                       |
|  My Tasks (3)                                                         |
|  +-----------------------------------------------------------------+  |
|  | [ ] Complete Project Documentation                              |  |
|  |     Write comprehensive README and API docs.                    |  |
|  |     Due: 2026-09-15                           [ Edit ] [ Delete ]|  |
|  +-----------------------------------------------------------------+  |
|  | [X] Setup Database Schema                                       |  |
|  |     Configure Mongoose models for User and Task.                |  |
|  |     Due: 2026-09-10                           [ Edit ] [ Delete ]|  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
+-----------------------------------------------------------------------+
```



---

## Application Architecture

```
[ Client Browser (Next.js / React) ]
               |
        Axios Requests (withCredentials: true)
               |
               v
[ Express.js REST API Server ]
       |               |
[ Auth Middleware ]    [ Controllers & Routers ]
  (JWT Verification)           |
                               v
                    [ MongoDB Database (Mongoose) ]
```

---

## Project Directory Structure

```text
TaskManager/
├── backend/
│   ├── controllers/
│   │   ├── task.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   └── isAuthenticated.js
│   ├── models/
│   │   ├── task.model.js
│   │   └── user.model.js
│   ├── routers/
│   │   ├── task.router.js
│   │   └── user.router.js
│   ├── utils/
│   │   └── db.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   │   └── page.js
│   │   ├── signup/
│   │   │   └── page.js
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   ├── Footer.js
│   │   ├── Main.js
│   │   └── Navbar.jsx
│   ├── public/
│   ├── .gitignore
│   ├── eslint.config.mjs
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package.json
│   ├── package-lock.json
│   └── postcss.config.mjs
└── .gitignore
```

---

## Tech Stack & Tools

### Frontend
- Framework: Next.js (App Router)
- Library: React
- Styling: Tailwind CSS, PostCSS (`@tailwindcss/postcss`)
- HTTP Client: Axios
- Notifications: React-Toastify
- Code Quality: ESLint, eslint-config-next

### Backend
- Runtime: Node.js
- Web Framework: Express.js
- Database & ODM: MongoDB, Mongoose
- Authentication & Security: JSON Web Token (`jsonwebtoken`), `bcryptjs`, `cookie-parser`
- CORS Management: `cors`
- Environment Management: `dotenv`

---

## Environment Variables

### Backend (`/backend/.env`)

Create a `.env` file in the `backend/` directory:

```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend (`/frontend/.env.local`)

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## Installation & Local Setup

### Prerequisites
- Node.js 
- npm or yarn
- MongoDB instance (local or MongoDB Atlas)

### 1. Clone Repository
```bash
git clone https://github.com/your-username/TaskManager.git
cd TaskManager
```

### 2. Backend Setup
```bash
cd backend
npm install
# Ensure .env is populated with required variables
npm start
```
The backend server will run on `http://localhost:8000`.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The client application will run on `http://localhost:3000`.

---

## Available Scripts

### Backend (`/backend`)
- `npm start` - Starts the Express server.
- `npm run dev` - Starts the backend server with nodemon for hot-reloading (if configured).

### Frontend (`/frontend`)
- `npm run dev` - Launches the Next.js development server on port 3000.
- `npm run build` - Builds the application for production deployment.
- `npm run start` - Starts the production server.
- `npm run lint` - Runs ESLint to identify code issues.

---

## API Endpoints

### Authentication Routes (`/api/v1/user` or `/api/user`)

| Method | Endpoint    | Description                     | Access   |
| :----- | :---------- | :------------------------------ | :------- |
| POST   | `/register` | Register a new user account     | Public   |
| POST   | `/login`    | Authenticate user & set cookie  | Public   |
| GET    | `/logout`   | Clear authentication cookie     | Private  |
| GET    | `/profile`  | Fetch current user details      | Private  |

### Task Routes (`/api/v1/task` or `/api/task`)

| Method | Endpoint        | Description                         | Access   |
| :----- | :-------------- | :---------------------------------- | :------- |
| POST   | `/create`       | Create a new task                   | Private  |
| GET    | `/all`          | Fetch all tasks for the logged-in user | Private |
| PUT    | `/update/:id`   | Update an existing task             | Private  |
| DELETE | `/delete/:id`   | Delete a specific task              | Private  |

---

## How It Works

1. User Registration & Login:
   - The user registers via the `/signup` page.
   - Credentials are submitted to the backend where passwords are encrypted using `bcryptjs`.
   - On successful login via `/login`, a signed JWT is returned via HTTP-only cookies.
2. Protected Request Flow:
   - When viewing or managing tasks, Axios sends API requests with `withCredentials: true`.
   - The backend `isAuthenticated` middleware inspects and verifies the JWT before invoking task controllers.
3. Task Management:
   - Tasks are linked to specific user IDs in MongoDB.
   - CRUD requests populate and update the state in real-time on the Next.js client, accompanied by `react-toastify` notifications.

---

## Future Enhancements

- Priority levels (Low, Medium, High) and custom categorization tags.
- Search and filtering options (by status, date range, priority).
- Email notifications and reminders for approaching due dates.
- Dark mode toggle with persistent user preference.
- Collaborative shared tasks and team management.

---

## Author & Contact

- Project Creator: lucky
- GitHub: [ArafatAli-07](https://github.com/ArafatAli-07)
- Email: aliarafat.dev@gmail.com
- LinkedIn: [arafat-ali-dev](https://linkedin.com/in/arafat-ali-dev)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
