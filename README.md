# 📋 Project Management Tool

A full-stack project management application built with React, Node.js, Express, Prisma, and PostgreSQL. Create projects, assign tasks, set deadlines, and track progress with an intuitive interface.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Ready to deploy? See [DEPLOY.md](DEPLOY.md) for quick 5-minute deployment guide!**

For detailed instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

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

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

