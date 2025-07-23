# ✅ Todo Universe

*Todo Universe* is a full-stack MERN application for managing your daily tasks with an intuitive UI, user authentication, and a drag-and-drop task board. It supports authenticated users as well as guests (with limited access). 
---

## 🌟 Features

- 📝 Add, update, and delete todos  
- ✅ Mark tasks as completed/incomplete  
- 📂 Categorize tasks as: To Do, In Progress, and Done  
- 🧲 Drag-and-drop Task Board (Kanban style)  
- 👤 User Authentication (JWT-based login/register)  
- 🧪 Guest mode: Add 1 task without logging in  
- 💡 Rotating motivational quotes  
- 🎨 Modern, clean, responsive UI  

---

## 🔧 Tech Stack

**Frontend:**  
- React.js  
- CSS3 (custom + responsive)  
- @hello-pangea/dnd (for drag and drop)  
- React Router DOM  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- JWT for authentication  
- CORS and dotenv

---

## 🚀 Getting Started

### 📦 Clone and Install

```bash
git clone https://github.com/your-username/todo-universe.git
cd todo-universe
```
### 🖥️ Frontend Setup (/client)
```bash
cd client
npm install
npm start
```

### 🔧 Backend Setup (/server)
```bash
cd server
npm install
```

### Create a .env file in the /server folder with the following:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Then run the backend server:
```bash
node server.js
```
### 🌐 Project Structure

```bash
Todo-universe/
client/
├── node_modules/               # Installed npm packages
│
├── public/                     # Static assets served by React
│   └── index.html              # HTML template loaded by React
│
├── src/                        # Source code for the React frontend
│   ├── api/                    # API calls and utility functions
│   │   └── auth.js             # Handles authentication-related API requests
│   │
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.jsx          # Navigation bar component
│   │   ├── Navbar.css          # Styling for Navbar
│   │   └── TodoItem.jsx        # Component to render a single todo item
│   │
│   ├── pages/                  # React pages used in routing
│   │   ├── Home.jsx            # Main todo list page
│   │   ├── Login.jsx           # User login page
│   │   ├── Register.jsx        # User registration page
│   │   └── Taskboard.jsx       # Drag-and-drop task board page
│   │
│   ├── api.js                  # General API utility functions
│   ├── App.css                 # Global stylesheet
│   ├── App.jsx                 # Main App component (with routing/layout)
│   └── index.js                # React entry point (renders <App />)
│
├── .gitignore                  # Git ignored files and folders
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Exact dependency versions

│
├── server/                # Express backend
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Route handlers (auth, todos)
│   ├── middleware/        # JWT & auth middleware
│   ├── server.js          # Main server file
│   └── .env               # Environment variables
│
├── .gitignore
└── README.md
```

### 🛡️ Authentication Logic

On registration/login, users receive a JWT token stored in localStorage.

Protected routes verify JWT before allowing access.

Guest users can add 1 task — but must log in to add more.



### 🎯 Future Plans
🔁 Add user-specific task history

📅 Add due dates and calendar view

📊 Task analytics dashboard

📱 Deploy to Vercel/Render for public access



📄 License
This project is licensed under the MIT License.

Made by Sameed Shaikh 💻


