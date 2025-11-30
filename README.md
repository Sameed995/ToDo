
# Drag-and-Drop To-Do List

A modern To-Do List web application built with **React** and **Node.js**, featuring **drag-and-drop functionality** for easy task management. Organize your tasks efficiently with interactive Kanban-style boards.

---

## Features

- Drag and Drop Tasks: Move tasks between columns like To-Do, In Progress, and Done.
- CRUD Operations: Create, Read, Update, and Delete tasks.
- User Authentication: Optional login to save your tasks.
- Responsive Design: Works on desktop and mobile devices.
- Real-time Updates: Changes are instantly reflected without page refresh.

---

## Screenshots

**Board View**  
![Board Screenshot](./images/board.png)  

**Task Details / Modal**  
![Task Screenshot](./images/task.png)  

> Replace the paths with your actual image paths.

---

## Tech Stack

| Frontend      | Backend             | Database |
|---------------|-------------------|---------|
| React.js      | Node.js + Express | MongoDB |
| TailwindCSS   | JWT Auth          | Mongoose|
| @dnd-kit/core | Axios             |         |

---

## Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/your-username/todo-dnd.git
cd todo-dnd
\`\`\`

2. **Install backend dependencies**
\`\`\`bash
cd backend
npm install
\`\`\`

3. **Install frontend dependencies**
\`\`\`bash
cd ../frontend
npm install
\`\`\`

4. **Set up environment variables**  
Create a `.env` file in the backend folder:
\`\`\`
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
\`\`\`

---

## Running the App

### Backend
\`\`\`bash
cd backend
npm start
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm start
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Usage

1. Add a new task in the "To-Do" column.
2. Drag and drop tasks between columns to update their status.
3. Click on a task to edit or delete it.
4. Login to save your tasks across sessions.

---

## Contributing

1. Fork the repository.
2. Create a new branch (\`git checkout -b feature/your-feature\`).
3. Make your changes.
4. Commit your changes (\`git commit -m "Add some feature"\`).
5. Push to the branch (\`git push origin feature/your-feature\`).
6. Open a Pull Request.

---

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.
