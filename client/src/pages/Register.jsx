import React, { useState } from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Styles matching the login page aesthetic
  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(102, 126, 234, 0.03) 0%, transparent 50%)
    `,
    zIndex: -1
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '3em',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    animation: 'float 6s ease-in-out infinite'
  };

  const subtitleStyle = {
    textAlign: 'center',
    fontSize: '1.1em',
    color: '#64748b',
    marginBottom: '40px',
    fontWeight: '500'
  };

  const formContainerStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    animation: 'slideIn 0.6s ease-out'
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    fontSize: '16px',
    border: '2px solid rgba(225, 232, 237, 0.6)',
    borderRadius: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    marginBottom: '20px',
    boxSizing: 'border-box'
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#667eea',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
    transform: 'translateY(-2px)'
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px 32px',
    background: isLoading 
      ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isLoading 
      ? '0 8px 25px rgba(156, 163, 175, 0.4)'
      : '0 8px 25px rgba(102, 126, 234, 0.4)',
    position: 'relative',
    overflow: 'hidden',
    marginTop: '10px'
  };

  const errorStyle = {
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#dc2626',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    marginBottom: '20px',
    fontSize: '14px',
    fontWeight: '500',
    animation: 'slideIn 0.3s ease-out'
  };

  const linkStyle = {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '14px',
    color: '#64748b'
  };

  const linkButtonStyle = {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'color 0.2s ease'
  };

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0px) scale(1);
            }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>
      <div style={containerStyle}>
        <div style={backgroundStyle}></div>
        
        <h1 style={titleStyle}>✨ Join Us</h1>
        <p style={subtitleStyle}>Create your Todo Universe account</p>
        
        <div style={formContainerStyle}>
          {error && <div style={errorStyle}>⚠️ {error}</div>}
          
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              placeholder="👤 Full Name"
              value={form.username}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              required
              disabled={isLoading}
            />
            
            <input
              name="email"
              type="email"
              placeholder="✉️ Email address"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              required
              disabled={isLoading}
            />
            
            <input
              name="password"
              type="password"
              placeholder="🔒 Password"
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              required
              disabled={isLoading}
            />
            
            <button
              type="submit"
              style={buttonStyle}
              disabled={
                isLoading ||
                !form.username.trim() ||
                !form.email.trim() ||
                !form.password.trim()
              }
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-3px) scale(1.02)';
                  e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(0px) scale(1)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                }
              }}
            >
              {isLoading ? (
                <span style={{ animation: 'pulse 1.5s infinite' }}>
                  🚀 Creating account...
                </span>
              ) : (
                '🚀 Create Account'
              )}
            </button>

          </form>
          
          <div style={linkStyle}>
            Already have an account?{' '}
            <span
              style={linkButtonStyle}
              onMouseEnter={(e) => e.target.style.color = '#764ba2'}
              onMouseLeave={(e) => e.target.style.color = '#667eea'}
              onClick={() => navigate('/login')}
            >
              Sign in here
            </span>
          </div>
        </div>
      </div>
    </>
  );
}