# 📝 Kanban Board (React + DnD Kit + Node API)

A clean and functional Kanban board built with **React**, **DnD Kit**, and a custom **Node.js + Express + MongoDB** API.  
Supports drag-and-drop task movement, task creation, editing, and deletion.

---

## 🚀 Features

- Create tasks
- Edit tasks (only in **To-Do** column)
- Delete tasks (only in **Done** column)
- Drag tasks between columns:
  - To-Do → In Progress → Done
- API-synced:
  - Load tasks from MongoDB
  - Update task status when moved
  - Delete tasks from DB
  - Create new tasks

---

## 🧩 Tech Stack

### **Frontend**
- React
- DnD Kit (drag & drop)
- Axios
- Custom Hooks + Components

### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose

---

## 📁 Folder Structure

```
/client
  /src
    /components
      KanbanBoard.jsx
      Column.jsx
      TaskCard.jsx
      Navbar.jsx
    /api
      todoApi.js
```

---

## 🔌 API Endpoints

### **GET /todos**
Returns all tasks.

### **POST /todos**
Create a new task.  
`{ title: "My Task" }`

### **PATCH /todos/:id**
Updates:
- `title`
- `status`

### **DELETE /todos/:id**
Deletes a task.

---

## ▶️ Running the App

### **1. Start Backend**
```
cd server
npm install
npm run dev
```

### **2. Start Frontend**
```
cd client
npm install
npm run dev
```

Frontend runs at:  
👉 `http://localhost:5173/`

Backend runs at:  
👉 `http://localhost:3000/`

---

## 🧪 Environment Variables

Create a **.env** in server:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

---

## 🎨 UI Design

- 3 Columns: **To-Do**, **In-Progress**, **Done**
- Drag-n-Drop visual feedback
- Light theme with soft shadowed cards

---

## 🐞 Known Issues / Notes

- Tasks must have unique IDs from MongoDB.
- Edit button appears only in **To-Do** column.
- Dragging works only inside DndContext wrapper.

---

## 📌 Future Improvements
- Add due dates
- Add subtasks
- Add dark mode
- Add column customization

---

## 💙 Author
Made with React, patience, and many bugs.  
Ask me for improvements anytime!

---


```
mern-todo-app
├─ assets
│  ├─ a.png
│  ├─ b.png
│  ├─ c.png
│  ├─ d.png
│  └─ e.png
├─ backend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ config
│  │  │  └─ db.js
│  │  ├─ controllers
│  │  │  ├─ authController.js
│  │  │  └─ todoController.js
│  │  ├─ middleware
│  │  │  └─ authMiddleware.js
│  │  ├─ models
│  │  │  ├─ Todo.js
│  │  │  └─ User.js
│  │  ├─ routes
│  │  │  ├─ authRoutes.js
│  │  │  └─ todoRoutes.js
│  │  ├─ server.js
│  │  └─ utils
│  │     └─ asyncHandler.js
│  └─ test.js
├─ frontend
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ bg.jpg
│  │  └─ vite.svg
│  ├─ src
│  │  ├─ api
│  │  │  ├─ authApi.js
│  │  │  ├─ axiosConfig.js
│  │  │  └─ todoApi.js
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  └─ react.svg
│  │  ├─ components
│  │  │  ├─ Column.jsx
│  │  │  ├─ KanbanBoard.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  └─ TaskCard.jsx
│  │  ├─ context
│  │  │  ├─ AuthContext.jsx
│  │  │  └─ TodoContext.jsx
│  │  ├─ hooks
│  │  │  └─ useTodos.js
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ Home.jsx
│  │  │  ├─ Login.jsx
│  │  │  └─ Register.jsx
│  │  ├─ styles
│  │  │  └─ global.css
│  │  └─ utils
│  │     ├─ color.js
│  │     └─ constants.js
│  └─ vite.config.js
├─ README.md
└─ structure.md

```
```
mern-todo-app
├─ assets
│  ├─ a.png
│  ├─ b.png
│  ├─ c.png
│  ├─ d.png
│  └─ e.png
├─ backend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ config
│  │  │  └─ db.js
│  │  ├─ controllers
│  │  │  ├─ authController.js
│  │  │  └─ todoController.js
│  │  ├─ middleware
│  │  │  └─ authMiddleware.js
│  │  ├─ models
│  │  │  ├─ Todo.js
│  │  │  └─ User.js
│  │  ├─ routes
│  │  │  ├─ authRoutes.js
│  │  │  └─ todoRoutes.js
│  │  ├─ server.js
│  │  └─ utils
│  │     └─ asyncHandler.js
│  └─ test.js
├─ frontend
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ bg.jpg
│  │  └─ vite.svg
│  ├─ src
│  │  ├─ api
│  │  │  ├─ authApi.js
│  │  │  ├─ axiosConfig.js
│  │  │  └─ todoApi.js
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  └─ react.svg
│  │  ├─ components
│  │  │  ├─ Column.jsx
│  │  │  ├─ KanbanBoard.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  └─ TaskCard.jsx
│  │  ├─ context
│  │  │  ├─ AuthContext.jsx
│  │  │  └─ TodoContext.jsx
│  │  ├─ hooks
│  │  │  └─ useTodos.js
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ Home.jsx
│  │  │  ├─ Login.jsx
│  │  │  └─ Register.jsx
│  │  ├─ styles
│  │  │  └─ global.css
│  │  └─ utils
│  │     ├─ color.js
│  │     └─ constants.js
│  └─ vite.config.js
└─ README.md

```
```
mern-todo-app
├─ assets
│  ├─ a.png
│  ├─ b.png
│  ├─ c.png
│  ├─ d.png
│  └─ e.png
├─ backend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ config
│  │  │  └─ db.js
│  │  ├─ controllers
│  │  │  ├─ authController.js
│  │  │  └─ todoController.js
│  │  ├─ middleware
│  │  │  └─ authMiddleware.js
│  │  ├─ models
│  │  │  ├─ Todo.js
│  │  │  └─ User.js
│  │  ├─ routes
│  │  │  ├─ authRoutes.js
│  │  │  └─ todoRoutes.js
│  │  ├─ server.js
│  │  └─ utils
│  │     └─ asyncHandler.js
│  └─ test.js
├─ frontend
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ bg.jpg
│  │  └─ vite.svg
│  ├─ src
│  │  ├─ api
│  │  │  ├─ authApi.js
│  │  │  ├─ axiosConfig.js
│  │  │  └─ todoApi.js
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  └─ react.svg
│  │  ├─ components
│  │  │  ├─ Column.jsx
│  │  │  ├─ KanbanBoard.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  └─ TaskCard.jsx
│  │  ├─ context
│  │  │  ├─ AuthContext.jsx
│  │  │  └─ TodoContext.jsx
│  │  ├─ hooks
│  │  │  └─ useTodos.js
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ Home.jsx
│  │  │  ├─ Login.jsx
│  │  │  └─ Register.jsx
│  │  ├─ styles
│  │  │  └─ global.css
│  │  └─ utils
│  │     ├─ color.js
│  │     └─ constants.js
│  └─ vite.config.js
└─ README.md

```