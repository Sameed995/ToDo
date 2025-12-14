<div>
  <h1>App loaded!</h1>
  <KanbanBoard />
</div>
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import KanbanBoard from "./components/KanbanBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function ProtectedRoute ({ children }){
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}


export default function App() {
  return (
  <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <KanbanBoard />
            </ProtectedRoute>
          } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    );
}

/*function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}*/

//export default App
