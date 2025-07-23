import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';

export default function TaskBoard() {
  const [columns, setColumns] = useState({
    'To Do': [],
    'In Progress': [],
    'Done': []
  });

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await API.get('/todos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const grouped = {
        'To Do': [],
        'In Progress': [],
        'Done': []
      };
      res.data.forEach(task => {
        grouped[task.status]?.push(task);
      });
      setColumns(grouped);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = async ({ source, destination, draggableId }) => {
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const movedTask = sourceColumn[source.index];

    const newSource = Array.from(sourceColumn);
    newSource.splice(source.index, 1);

    const newDest = Array.from(destColumn);
    const updatedTask = {
      ...movedTask,
      status: destination.droppableId,
      completed: destination.droppableId === 'Done'
    };
    newDest.splice(destination.index, 0, updatedTask);

    const newColumns = {
      ...columns,
      [source.droppableId]: newSource,
      [destination.droppableId]: newDest
    };

    setColumns(newColumns);

    try {
      const token = localStorage.getItem('token');
      await API.put(`/todos/${draggableId}`, {
        status: updatedTask.status,
        completed: updatedTask.completed
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const getCardStyle = (status) => {
    switch (status) {
      case 'To Do':
        return {
          background: '#ffecec',
          borderLeft: '5px solid #ff4d4f'
        };
      case 'In Progress':
        return {
          background: '#fffbe6',
          borderLeft: '5px solid #faad14'
        };
      case 'Done':
        return {
          background: '#e6ffed',
          borderLeft: '5px solid #52c41a'
        };
      default:
        return {};
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link 
        to="/" 
        style={{ 
          textDecoration: 'none', 
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
          padding: '10px 16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          border: 'none'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0px)';
          e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
        }}
      >
        <span style={{ fontSize: '16px' }}>←</span>
        Back to List
      </Link>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '3em',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        🗂️ Task Board
      </h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginTop: '20px'
          }}
        >
          {Object.keys(columns).map((column) => (
            <div
              key={column}
              style={{
                flex: 1,
                background: '#f9f9f9',
                padding: '15px',
                borderRadius: '10px',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                minHeight: '400px'
              }}
            >
              <h2
                style={{
                  textAlign: 'center',
                  fontSize: '1.5em',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '15px',
                  textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                {column}
              </h2>

              <Droppable droppableId={column}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      minHeight: '300px'
                    }}
                  >
                    {columns[column].map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id.toString()} index={index}>
                        {(provided, snapshot) => {
                          const style = {
                            marginBottom: '10px',
                            padding: '10px 15px',
                            borderRadius: '6px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            userSelect: 'none',
                            ...getCardStyle(task.status)
                          };

                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...style,
                                ...provided.draggableProps.style
                              }}
                            >
                              {task.text}
                            </div>
                          );
                        }}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
