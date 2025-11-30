import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task, onDelete, onEdit }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [loading, setLoading] = useState(false);

  // Set card background color by status
  const cardBackground =
    task.status === "todo"
      ? "#fee2e2" // light red
      : task.status === "in-progress"
      ? "#fef9c3" // light yellow
      : "#d1fae5"; // light green for done

  const handleEditSave = async () => {
    if (!editText.trim()) return;
    try {
      setLoading(true);
      if (onEdit) await onEdit(task._id, editText);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update task:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (onDelete) onDelete(task._id, task.status);
  };

  return (
    <>
      {/* Task Card */}
      <div
        ref={setNodeRef}
        style={{
          transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : "",
          background: cardBackground,
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid rgba(0,0,0,0.08)",
          gap: "10px",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "grab",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
      >
        {/* Task Title */}
        <div style={{ flex: 1, wordBreak: "break-word" }}>
          <span {...listeners} {...attributes} style={{ fontWeight: 500 }}>
            {task.title}
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "5px", flexShrink: 0, pointerEvents: "auto" }}>
          {task.status === "todo" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                style={{
                  background: "#4f46e5",
                  border: "none",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#4338ca")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#4f46e5")}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                style={{
                  background: "#f87171",
                  border: "none",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#ef4444")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#f87171")}
              >
                Delete
              </button>
            </>
          )}

          {task.status === "done" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              style={{
                background: "#f87171",
                border: "none",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#ef4444")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#f87171")}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            zIndex: 1000,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: "15px" }}>Edit Task</h3>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "100%",
                marginBottom: "20px",
              }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditSave();
                if (e.key === "Escape") setIsModalOpen(false);
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  background: "#fff",
                  cursor: "pointer",
                  color: "#000",
                  fontWeight: "500",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#4f46e5",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
