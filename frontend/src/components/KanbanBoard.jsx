import { DndContext } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import Column from "./Column";
import Navbar from "./Navbar";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";

const COLUMNS = {
  todo: "To-Do",
  "in-progress": "In Progress",
  done: "Completed",
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState({
    todo: [],
    "in-progress": [],
    done: [],
  });

  const [newTitle, setNewTitle] = useState("");

  // ---------------------------
  // Load Tasks From API
  // ---------------------------
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTodos();
        setTasks({
          todo: data.filter((t) => t.status === "todo"),
          "in-progress": data.filter((t) => t.status === "in-progress"),
          done: data.filter((t) => t.status === "done"),
        });
      } catch (err) {
        console.error("Failed to load tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  // ---------------------------
  // Create New Task
  // ---------------------------
  const createTask = async () => {
    if (!newTitle.trim()) return;
    try {
      const newTask = await createTodo(newTitle.trim());
      setTasks((prev) => ({
        ...prev,
        todo: [...prev.todo, newTask],
      }));
      setNewTitle("");
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  // ---------------------------
  // Delete Task
  // ---------------------------
  const handleDeleteTask = async (taskId, status) => {
    try {
      await deleteTodo(taskId);

      setTasks((prev) => ({
        ...prev,
        [status]: prev[status].filter((t) => t._id !== taskId),
      }));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  // ---------------------------
  // Edit Task
  // ---------------------------
  const handleEditTask = async (taskId, newTitle) => {
    try {
      const updatedTask = await updateTodo(taskId, { title: newTitle });

      setTasks((prev) => {
        const updated = { ...prev };
        const col = Object.keys(updated).find((c) =>
          updated[c].some((t) => t._id === taskId)
        );
        if (col) {
          updated[col] = updated[col].map((t) =>
            t._id === taskId ? { ...t, title: updatedTask.title } : t
          );
        }
        return updated;
      });
    } catch (err) {
      console.error("Failed to edit task:", err);
    }
  };

  // ---------------------------
  // Drag & Drop Movement
  // ---------------------------
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const from = findColumn(active.id);
    const to = over.id;
    if (from === to) return;

    const movedTask = tasks[from].find((t) => t._id === active.id);

    // Update state instantly
    setTasks((prev) => ({
      ...prev,
      [from]: prev[from].filter((t) => t._id !== active.id),
      [to]: [...prev[to], { ...movedTask, status: to }],
    }));

    // Sync with server
    try {
      await updateTodo(active.id, { status: to });
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  const findColumn = (taskId) =>
    Object.keys(tasks).find((col) => tasks[col].some((t) => t._id === taskId));

  // ---------------------------
  // Render UI
  // ---------------------------
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Frosted-glass wrapper for smooth blending with background image */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0px",
          minHeight: "90vh",
          width: "98%",

          /* Frosted glass effect */
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(1px)",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "22px",
        }}
      >
        {/* Navbar */}
        <Navbar tasks={tasks} />

        {/* Create Task Input */}
        <div style={{ margin: "30px 0", display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="New task title"
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "250px",
            }}
            onKeyDown={(e) => e.key === "Enter" && createTask()}
          />
          <button
            onClick={createTask}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#4f46e5",
              color: "white",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </div>

        {/* Columns */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "50px",
            width: "100%",
            padding: "0 20px 50px",
            overflowX: "auto",
          }}
        >
          {Object.entries(COLUMNS).map(([key, label]) => (
            <Column
              key={key}
              id={key}
              title={label}
              tasks={tasks[key]}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
