import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { COLORS } from "../utils/color";

const COLUMN_COLORS = {
  todo: COLORS.todo,
  "in-progress": COLORS.inProgress,
  done: COLORS.done,
};

export default function Column({ title, id, tasks, onDelete, onEdit }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "300px",
        background: isOver ? "#dff6ff" : COLORS.cardBackground,
        padding: "40px",
        borderRadius: "12px",
        minHeight: "70vh",
        boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
        transition: "0.2s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3
        style={{
          marginBottom: "15px",
          color: COLUMN_COLORS[id],
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {title}
      </h3>

      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={() => onDelete(task._id, id)} // passes taskId + column
          onEdit={onEdit} // pass edit function
        />
      ))}
    </div>
  );
}
