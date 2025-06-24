# 📋 Task Manager - Full Stack Application
🖥️ Front-End Hosted on Vercel: [task-manager-frontend](https://task-manager-1y38.vercel.app/)
🖥️ Back-End Hosted on Render: [task-manager-backend](https://task-manager-backend-kmbu.onrender.com/api/tasks)

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Express](https://img.shields.io/badge/Express-4.18.2-green?style=for-the-badge&logo=express)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC?style=for-the-badge&logo=tailwind-css)

**A complete task management application built with Next.js, React, TypeScript, and Express**

[🚀 Demo](#demo) • [✨ Features](#features) • [🛠️ Technologies](#technologies) • [📁 Project Structure](#project-structure) • [🚀 Installation](#installation) • [📖 Usage](#usage) • [🔧 API](#api)



---

## 🎯 Demo

A modern and responsive application to manage your daily tasks with an intuitive interface and full CRUD functionality.

### ✨ Main Features

- ✅ **Full task management** (Create, Read, Update, Delete)
- 🎨 **Modern and responsive UI** with Tailwind CSS
- ⚡ **Optimized performance** with Next.js 15 and React 19
- 🔄 **Real-time task state updates**
- 📱 **Mobile-first and fully responsive design**
- 🎯 **Real-time form validation**
- 📊 **Visual statistics** (total, completed, pending)
- 💾 **Data persistence** with local storage
- 🔧 **Full RESTful API** with Express

---

## 🛠️ Technologies

### Frontend
- **Next.js 15.3.4** - React framework with SSR
- **React 19.0.0** - UI library
- **TypeScript 5** - Static typing
- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **PostCSS** - CSS processor

### Backend
- **Express 4.18.2** - Web framework for Node.js
- **TypeScript 5.8.3** - Static typing
- **CORS** - Middleware for Cross-Origin Resource Sharing
- **Node.js** - JavaScript runtime

---

## 📁 Project Structure

```
task-manager/
├── 📁 front-end/                 # Next.js application
│   ├── 📁 src/
│   │   ├── 📁 app/              # Next.js App Router
│   │   │   ├── 📁 tasks/        # Tasks page
│   │   │   ├── layout.tsx       # Main layout
│   │   │   └── page.tsx         # Home page
│   │   ├── 📁 components/       # React components
│   │   │   ├── TaskForm.tsx     # Task form
│   │   │   ├── TaskItem.tsx     # Single task item
│   │   │   └── TaskList.tsx     # Task list
│   │   ├── 📁 lib/              # Utilities and config
│   │   │   └── 📁 api/          # API client
│   │   └── 📁 types/            # Type definitions
│   └── package.json
├── 📁 back-end/                 # Express API
│   ├── 📁 src/
│   │   ├── 📁 lib/              # Utilities
│   │   │   └── taskStorage.ts   # Storage management
│   │   ├── 📁 routes/           # API routes
│   │   │   └── tasks.ts         # Task endpoints
│   │   ├── app.ts               # Express config
│   │   ├── index.ts             # Entry point
│   │   └── types.ts             # TypeScript types
│   └── package.json
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone the repository
```bash
git clone <your-repo>
cd task-manager
```

### 2. Install Backend dependencies
```bash
cd back-end
npm install
```

### 3. Install Frontend dependencies
```bash
cd ../front-end
npm install
```

### 4. Set up environment variables
Create a `.env` file in the root of the frontend:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 🚀 Running the App

### Start the Backend
```bash
cd back-end
npm run dev
```
The server will be available at: `http://localhost:4000`

### Start the Frontend
```bash
cd front-end
npm run dev
```
The app will be available at: `http://localhost:3000`

---

## 📖 Usage

### Main Features

1. **📝 Create Task**
   - Click "New Task"
   - Fill in the title (required, min 3 characters)
   - Optionally add a description (max 500 characters)
   - Mark as completed if needed
   - Save the task

2. **✏️ Edit Task**
   - Click "Edit" on any task
   - Modify the necessary fields
   - Save the changes

3. **✅ Mark as Completed**
   - Click the circle next to the title
   - The task will move to the "Completed" section

4. **🗑️ Delete Task**
   - Click "Delete"
   - Confirm the action

5. **📊 View Statistics**
   - Total tasks
   - Completed tasks
   - Pending tasks

---

## 🔧 API

### Endpoints

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| `GET`  | `/api/tasks`     | Get all tasks          |
| `POST` | `/api/tasks`     | Create a new task      |
| `PUT`  | `/api/tasks/:id` | Update an existing task|
| `DELETE`| `/api/tasks/:id`| Delete a task          |

### Task Structure
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO string
  updatedAt?: string; // ISO string
}
```

### Usage Examples

#### Create Task
```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My first task",
    "description": "Task description",
    "completed": false
  }'
```

#### Get Tasks
```bash
curl http://localhost:4000/api/tasks
```

---

## 🎨 UI Features

- **🎯 Modern Design**: Clean and professional interface
- **📱 Responsive**: Works perfectly on mobile and desktop
- **⚡ Animations**: Smooth transitions and visual feedback
- **🎨 Consistent Theme**: Cohesive color palette
- **♿ Accessibility**: Keyboard navigation and screen reader support

---

## 🔧 Available Scripts

### Frontend
```bash
npm run dev      # Development with Turbopack
npm run build    # Production build
npm run start    # Production server
npm run lint     # Linting with ESLint
```

### Backend
```bash
npm run dev      # Development with hot reload
```

---

## 🐛 Troubleshooting

### Hydration Error
If you encounter hydration errors, make sure to:
- Use the `formatDate()` function for dates
- Normalize dates with `normalizeDate()`
- Add `suppressHydrationWarning` in the layout

### CORS Issues
The backend is configured with CORS enabled for local development.

---

## 🤝 Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License. See the `LICENSE` file for more details.

---

**Thanks for using Task Manager! 🎉**

If you liked the project, please give it a ⭐!

