# Drag-and-Drop To-Do List

A modern To-Do List web application built with **React** and **Node.js**, featuring **drag-and-drop functionality** for easy task management. Organize your tasks efficiently with interactive Kanban-style boards.

---

## Features

- **Drag and Drop Tasks:** Move tasks between columns like To-Do, In Progress, and Done.
- **CRUD Operations:** Create, Read, Update, and Delete tasks.
- **User Authentication:** Optional login to save your tasks.
- **Responsive Design:** Works on desktop and mobile devices.
- **Real-time Updates:** Changes are instantly reflected without page refresh.

---

## Screenshots

### Board View
![Board Screenshot](./images/board.png)  

### Task Details / Modal
![Task Screenshot](./images/task.png)  

> Replace the paths with your actual image paths.  

---

## Tech Stack

| Frontend | Backend | Database |
|----------|---------|---------|
| React.js | Node.js + Express | MongoDB |
| TailwindCSS | JWT Auth | Mongoose |
| @dnd-kit/core | Axios | |

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/todo-dnd.git
cd todo-dnd
Install backend dependencies

bash
Copy code
cd backend
npm install
Install frontend dependencies

bash
Copy code
cd ../frontend
npm install
Set up environment variables
Create a .env file in the backend:

ini
Copy code
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
Running the App
Backend
bash
Copy code
cd backend
npm start
Frontend
bash
Copy code
cd frontend
npm start
Open http://localhost:3000 to see the app.

Usage
Add a new task in the "To-Do" column.

Drag and drop tasks between columns to update their status.

Click on a task to edit or delete it.

Login to save your tasks across sessions.

Contributing
Fork the repository

Create a new branch (git checkout -b feature/your-feature)

Make your changes

Commit your changes (git commit -m "Add some feature")

Push to the branch (git push origin feature/your-feature)

Open a Pull Request

License
This project is licensed under the MIT License.
See the LICENSE file for details.