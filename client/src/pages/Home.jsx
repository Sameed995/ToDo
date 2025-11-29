import React, { useEffect, useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [authWarning, setAuthWarning] = useState('');
  const [unauthAddCount, setUnauthAddCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Use relative API paths for Netlify deployment
const API_BASE = "https://todo-jdiu.onrender.com";


  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_BASE}/todos`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (!res.ok) throw new Error('Failed to fetch todos');
      const data = await res.json();
      setTodos(data);
      if (!token) setUnauthAddCount(data.length);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTodo = async () => {
    if (!text.trim()) return;

    if (!token && unauthAddCount >= 1) {
      setAuthWarning('⚠️ Please log in to add more tasks.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ text, status: 'To Do' }),
      });

      if (!res.ok) throw new Error('Failed to add todo');

      await fetchTodos();
      setText('');

      if (!token) setUnauthAddCount(prev => prev + 1);
      if (token) setAuthWarning('');
    } catch (err) {
      console.error('Add todo error:', err);
      setAuthWarning('⚠️ Something went wrong.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_BASE}/todos/${id}`, {
        method: 'DELETE',
        ...(token && {
          headers: { Authorization: `Bearer ${token}` },
        }),
      });

      const updatedTodos = todos.filter(todo => todo._id !== id);
      setTodos(updatedTodos);

      if (!token && updatedTodos.length === 0) {
        setUnauthAddCount(0);
        setAuthWarning('');
      }
    } catch (err) {
      console.error('Delete failed:', err);
      setAuthWarning('⚠️ Failed to delete task.');
    }
  };

  const toggleComplete = async (id, currentCompleted) => {
    const updatedTask = {
      completed: !currentCompleted,
      status: !currentCompleted ? 'Done' : 'To Do',
    };

    if (!token) {
      setTodos(todos.map(todo =>
        todo._id === id ? { ...todo, ...updatedTask } : todo
      ));
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) throw new Error('Failed to update task');

      const updated = await res.json();
      setTodos(todos.map(todo => (todo._id === id ? updated : todo)));
    } catch (error) {
      console.error('Failed to update task', error);
      setAuthWarning('⚠️ Could not update task.');
    }
  };

  const clearAllTodos = async () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      for (const todo of todos) {
        await fetch(`${API_BASE}/todos/${todo._id}`, {
          method: 'DELETE',
          ...(token && { headers: { Authorization: `Bearer ${token}` } }),
        });
      }
      setTodos([]);
      if (!token) {
        setUnauthAddCount(0);
        setAuthWarning('');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    fetchTodos();
    if (!storedToken) {
      setUnauthAddCount(todos.length);
      setAuthWarning('');
    }
  }, [token]);

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0px) scale(1); }
          }
        `}
      </style>

      {authWarning && <div style={styles.warning}>{authWarning}</div>}

      <div style={styles.background}></div>
      <h1 style={styles.title}>✨ Your Todo Universe</h1>
      <p style={styles.subtitle}>Organize your thoughts, achieve your dreams</p>

      {totalCount > 0 && (
        <>
          <div style={styles.progressBar}>
            <div style={{
              ...styles.progressFill,
              width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%'
            }}></div>
          </div>
          <div style={styles.stats}>
            <div style={styles.statItem}><span style={styles.statNumber}>{totalCount}</span><span style={styles.statLabel}>Total</span></div>
            <div style={styles.statItem}><span style={styles.statNumber}>{completedCount}</span><span style={styles.statLabel}>Completed</span></div>
            <div style={styles.statItem}><span style={styles.statNumber}>{totalCount - completedCount}</span><span style={styles.statLabel}>Remaining</span></div>
          </div>
        </>
      )}

      <div style={styles.inputGroup}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done today?"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.button}>🚀 Add Task</button>
      </div>

      <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
        <ul style={styles.todoList}>
          {todos.map((todo, index) => (
            <li key={todo._id} style={styles.getTodoItemStyle(todo.completed, index)}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id, todo.completed)}
                style={styles.checkbox}
              />
              <span style={styles.getTextStyle(todo.completed)}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo._id)} style={styles.deleteButton}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>

      {todos.length > 0 && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={clearAllTodos}
            style={{ ...styles.button, marginTop: '10px' }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0px) scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            }}
          >
            🧹 Clear All Tasks
          </button>
        </div>
      )}
    </div>
  );
}

// Styles remain exactly the same
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    position: 'relative',
    overflow: 'hidden'
  },
  background: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(102, 126, 234, 0.03) 0%, transparent 50%)`,
    zIndex: -1
  },
  title: {
    textAlign: 'center',
    fontSize: '3em',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    animation: 'float 6s ease-in-out infinite'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '1.1em',
    color: '#64748b',
    marginBottom: '30px',
    fontWeight: '500'
  },
  warning: {
    color: '#e53e3e',
    marginBottom: '16px',
    textAlign: 'center',
    fontWeight: '600',
    backgroundColor: '#fff5f5',
    padding: '10px 20px',
    borderRadius: '12px',
    border: '1px solid #feb2b2'
  },
  progressBar: {
    width: '100%',
    height: '6px',
    background: 'rgba(225, 232, 237, 0.5)',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '30px'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    transition: 'width 0.5s ease',
    borderRadius: '3px'
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  statItem: {
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '16px 24px',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    minWidth: '120px'
  },
  statNumber: {
    fontSize: '2em',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'block'
  },
  statLabel: {
    fontSize: '0.9em',
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  inputGroup: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px'
  },
  input: {
    flex: 1,
    padding: '16px 20px',
    fontSize: '16px',
    border: '2px solid rgba(225, 232, 237, 0.6)',
    borderRadius: '20px',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
  },
  button: {
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
  },
  todoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  getTodoItemStyle: (completed, index) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px',
    background: completed
      ? 'linear-gradient(135deg, rgba(240, 249, 255, 0.9), rgba(219, 234, 254, 0.7))'
      : 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    boxShadow: completed
      ? '0 4px 20px rgba(34, 197, 94, 0.15)'
      : '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: `2px solid ${completed ? 'rgba(34, 197, 94, 0.3)' : 'rgba(225, 232, 237, 0.4)'}`,
    animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
  }),
  getTextStyle: (completed) => ({
    flex: 1,
    fontSize: '16px',
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? '#6b7280' : '#1f2937'
  }),
  checkbox: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    accentColor: '#667eea'
  },
  deleteButton: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '10px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};