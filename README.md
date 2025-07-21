# TaskFlow – Role-Based Task Management System ✅

TaskFlow is a role-based task management web application designed to streamline project and task assignment within teams. It enables Admins and Managers to manage projects and tasks, while Team members can view and update their assigned work.

---

## 🚀 Features

### 👥 Role-Based Access
- **Admin**
  - Manage users (view all)
  - Create and view projects and tasks
- **Manager**
  - Create and manage tasks for projects
  - Assign team members
- **Team**
  - View "My Tasks" page with assigned tasks only
  - Update status/progress if enabled

### 📁 Project & Task Management
- Create projects and assign team members
- Create tasks under projects
- Assign tasks to multiple team members
- View list of all projects (accessible to all roles)
- Track task status and deadlines

### 🔐 Authentication
- JWT-based signup/login system
- Session-based access with token verification
- Role-specific routing and dashboard control

---

## 💻 Tech Stack

| Layer     | Tech Used                 |
|-----------|---------------------------|
| Frontend  | HTML, CSS, JavaScript     |
| Backend   | Node.js, Express.js       |
| Database  | MongoDB (Mongoose ODM)    |
| Auth      | JWT (JSON Web Tokens)     |

---

## 🧾 API Endpoints Overview

### 🔐 Auth
- `POST /api/users/signup` – Register user
- `POST /api/users/login` – Login user

### 📂 Projects
- `POST /api/projects` – Create new project (admin/manager)
- `GET /api/projects` – View all projects (all roles)

### ✅ Tasks
- `POST /api/tasks` – Create task (admin/manager)
- `GET /api/tasks/my-tasks` – View tasks assigned to current user (team role only)
- `GET /api/tasks` – View all tasks (admin/manager)

---

## 🗂 Folder Structure

taskflow/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── utils/
│ └── server.js
├── frontend/
│ ├── login.html
│ ├── signup.html
│ ├── dashboard_admin.html
│ ├── dashboard_manager.html
│ ├── dashboard_team.html
│ ├── projects.html
│ └── tasks.html
└── README.md
