# ✅ Todo Universe

*Todo Universe* is a full-stack MERN application for managing your daily tasks with an intuitive UI, user authentication, and a drag-and-drop task board. It supports authenticated users as well as guests (with limited access). 
---
*Note* : You will only be able to create one task without logging in.
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
odo-universe/
│
├── client/                # React frontend
│   ├── public/            # Public assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Pages: Home, TaskBoard, Auth
│   │   ├── App.jsx        # React router setup
│   │   ├── index.js       # Entry point
│   │   └── ...            
│   ├── package.json
│   └── README.md
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


