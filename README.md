# 📋 Project Management Tool

A full-stack project management application built with React, Node.js, Express, Prisma, and SQLite. Create projects, assign tasks, set deadlines, and track progress with an intuitive interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## Features

- ✅ **Project Management**: Create, update, and delete projects
- ✅ **Task Management**: Add tasks to projects with deadlines, priorities, and assignees
- ✅ **Progress Tracking**: Visual progress indicators and statistics
- ✅ **Status Filtering**: Filter tasks by status (To Do, In Progress, Completed)
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **PostgreSQL Database**: Reliable data storage with Prisma ORM
- ✅ **REST API**: Clean API architecture with validation

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/project-management-tool.git
cd project-management-tool
```

2. **Install dependencies**

```bash
npm install
```

This will install dependencies for both backend and frontend.

3. **Set up the database**

```bash
cd backend
cp .env.example .env
npx prisma migrate dev --name init
npx prisma generate
npm run db:seed
cd ..
```

4. **Start the application**

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 📦 What's Inside

```
project-management-tool/
├── backend/              # Express.js API server
│   ├── prisma/          # Database schema and migrations
│   ├── src/
│   │   ├── routes/      # API route handlers
│   │   ├── prisma.js    # Database client
│   │   ├── server.js    # Express server setup
│   │   └── seed.js      # Sample data seeder
│   └── package.json
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx      # Main app component
│   │   └── api.js       # API client
│   └── package.json
└── package.json         # Root package.json
```

## 💻 Tech Stack

**Frontend:**
- ⚛️ React 18
- 🔀 React Router for navigation
- 📡 Axios for API calls
- ⚡ Vite for build tooling
- 🎨 CSS3 for styling

**Backend:**
- 🟢 Node.js with Express
- 🔷 Prisma ORM
- 🗄️ SQLite database (easily switchable to PostgreSQL)
- ✅ Express Validator for input validation

## 📝 Available Scripts

### Root Directory

```bash
npm run dev              # Start both frontend and backend
npm run dev:backend      # Start only backend server
npm run dev:frontend     # Start only frontend server
npm run build            # Build frontend for production
```

### Backend Directory

```bash
npm run dev              # Start backend with nodemon
npm run start            # Start backend in production mode
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed database with sample data
npm run db:studio        # Open Prisma Studio (database GUI)
```

### Frontend Directory

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
```

## 🎯 Usage Guide

### Creating a Project

1. Click the **"+ New Project"** button
2. Fill in the project name and description
3. Select the status (active, completed, or archived)
4. Click **"Create Project"**

### Adding Tasks

1. Click on a project to view its details
2. Click **"+ Add Task"**
3. Enter task details:
   - Title (required)
   - Description
   - Status (To Do, In Progress, Completed)
   - Priority (Low, Medium, High)
   - Assignee name
   - Deadline
4. Click **"Create Task"**

### Tracking Progress

- View project progress bars on the main page
- Filter tasks by status on the project detail page
- See task counts and statistics
- Monitor overdue tasks (highlighted in red)

## 🔧 Switching to PostgreSQL

If you prefer PostgreSQL over SQLite:

1. Install PostgreSQL locally or use Docker:
   ```bash
   docker run --name postgres-pm -e POSTGRES_PASSWORD=password -e POSTGRES_DB=project_management -p 5432:5432 -d postgres:16
   ```

2. Update `backend/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. Update `backend/.env`:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/project_management?schema=public"
   ```

4. Run migrations:
   ```bash
   cd backend
   npx prisma migrate dev --name init
   npx prisma generate
   npm run db:seed
   ```

## 🛠️ Troubleshooting

### Database Connection Issues

If you encounter database errors:
```bash
cd backend
npx prisma generate
npx prisma migrate reset --force
npm run db:seed
```

### Port Already in Use

If ports 3000 or 3001 are in use:
- Change `PORT` in `backend/.env`
- Update `server.port` in `frontend/vite.config.js`

### Module Not Found Errors

```bash
# Reinstall dependencies
npm install
cd backend && npm install
cd ../frontend && npm install
```

## 📡 API Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Tasks

- `GET /api/tasks` - Get all tasks (optional `?projectId=xxx`)
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🗃️ Database Schema

### Projects

**Projects Table:**
```prisma
model Project {
  id          String   @id @default(uuid())
  name        String
  description String?
  status      String   @default("active")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  tasks       Task[]
}
```

**Tasks Table:**
```prisma
model Task {
  id          String    @id @default(uuid())
  title       String
  description String?
  status      String    @default("todo")
  priority    String    @default("medium")
  assignee    String?
  deadline    DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  projectId   String
  project     Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
}
```

```

## 🚢 Deployment

### Using Docker Compose

The project includes Docker configuration for easy deployment:

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database
- Backend API server
- Frontend (served via Nginx)

### Manual Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Set environment variables for production
3. Start the backend:
   ```bash
   cd backend
   npm start
   ```

4. Serve the frontend `dist` folder using Nginx or any static file server

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ using React, Node.js, and SQLite

## 🙏 Acknowledgments

- React team for the amazing framework
- Prisma team for the excellent ORM
- Express.js community
- All contributors and users of this project

---

**⭐ If you find this project useful, please consider giving it a star!**
