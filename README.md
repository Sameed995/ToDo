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
- Delete button appears only in **Done** column.
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

