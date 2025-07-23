# ✅ Todo Universe 🪐

**Todo Universe** is a full-stack MERN Todo app that lets users manage tasks with a clean UI, drag-and-drop Task Board, login/register system, and motivational quotes. Guest users can try the app with limited features.

---

## 🔍 Features

- 📝 Add / Delete tasks  
- ✅ Mark tasks complete/incomplete  
- 🔄 Automatically sync completed tasks to the "Done" column  
- 🪄 Drag-and-drop Task Board (To Do / In Progress / Done)  
- 🔐 Register & Login with JWT  
- ⚠️ Guest users can add only 1 task  
- 💬 Rotating motivational quotes on Home page  
- 💻 Clean, modern responsive UI

---

## 🛠️ Tech Stack

**Frontend (React):**  
- React.js  
- @hello-pangea/dnd  
- React Router  
- Custom CSS

**Backend (Node + Express):**  
- Express.js  
- MongoDB + Mongoose  
- JWT (JSON Web Token)  
- dotenv, CORS

---

## 🚀 Getting Started

### 📦 Clone and Install

```bash
git clone https://github.com/your-username/todo-universe.git
cd todo-universe
🔧 Backend Setup (/server folder)
bash
Copy
Edit
cd server
npm install
Create .env file inside /server with the following:

ini
Copy
Edit
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
Start the backend:

bash
Copy
Edit
node server.js
🌐 Frontend Setup (/client folder)
bash
Copy
Edit
cd ../client
npm install
npm start
Frontend URL: http://localhost:3000
Backend API: http://localhost:5000

📁 Project Structure
bash
Copy
Edit
todo-universe/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/       # Home.jsx, TaskBoard.jsx, Login.jsx, Register.jsx
│   │   ├── components/  # Reusable components (e.g., Navbar)
│   │   ├── auth.js      # Frontend API utils for auth
│   │   └── App.js
│   ├── public/
│   ├── .gitignore
│   └── package.json

├── server/              # Express + MongoDB backend
│   ├── models/          # Todo and User schemas
│   ├── routes/          # /todos and /auth routes
│   ├── middleware/      # JWT authentication middleware
│   ├── .env             # Environment variables
│   ├── server.js        # Main server file
│   ├── package.json
│   └── .gitignore

└── README.md            # You’re reading it
🧪 .gitignore
bash
Copy
Edit
# Global ignores
node_modules/
.env
.DS_Store

# Build
/build
/dist
💡 Future Features
✅ Responsive design
✅ Drag-and-drop Task Board
✅ JWT Auth
🔜 Google login
🔜 Task priority levels
🔜 Task deadlines + reminders
🔜 Dark mode

👨‍💻 Author
Made with 💙 by Sameed Shaikh

📜 License
This project is licensed under the MIT License.