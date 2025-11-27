import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  const quotes = [
    `"Progress through discipline"`,
    `"Unity brings strength"`,
    `"Harmony in productivity"`,
    `"Diligence leads to prosperity"`,
    `"Strong nation, productive people"`,
    `"Collective achievement matters"`,
    `"Work for the greater good"`,
    `"Order enables progress"`,
    `"The secret of getting ahead is getting started."`,
    `"You don't have to be great to start, but you have to start to be great."`,
    `"Small steps every day lead to big results."`,
    `"Productivity is never an accident. It's always the result of commitment to excellence."`,
    `"Your future is created by what you do today, not tomorrow."`,
    `"The way to get started is to quit talking and begin doing."`,
    `"Motivation is what gets you started. Habit is what keeps you going."`,
    `"Success is the sum of small efforts, repeated day in and day out."`,
    `"Don't count the days, make the days count."`,
    `"The only limit to our realization of tomorrow is our doubts of today."`,
    `"Done is better than perfect"`,
    `"Small steps, big wins"`,
    `"Start where you are"`,
    `"Progress over perfection"`,
    `"One task at a time"`,
    `"Discipline equals freedom"`,
    `"Clear space, clear mind"`,
    `"Less but better"`,
    `"Do the hard thing first"`,
    `"Completion creates momentum"`,
    `"Action beats intention"`,
    `"Focus determines reality"`,
    `"Small daily improvements"`,
    `"Eliminate to elevate"`,
    `"Busy ≠ productive"`,
    `"Prioritize or procrastinate"`,
    `"Clutter drains willpower"`,
    `"Finished > flawless"`,
    `"Momentum builds motivation"`,
    `"Simple systems sustain success"`
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // You can decode the token to get user info or make an API call
      // For now, using a placeholder name
      setUserName('User'); // Replace with actual user name from token/API
    }
  }, [location]);

  useEffect(() => {
    // Set initial random quote
    setCurrentQuote(getRandomQuote());
    
    const quoteInterval = setInterval(() => {
      setCurrentQuote(getRandomQuote());
    }, 5000);
    
    return () => clearInterval(quoteInterval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserName('');
    navigate('/login');
  };

  const linkStyle = (isActive) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    position: 'relative',
    background: isActive 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'transparent',
    boxShadow: isActive 
      ? '0 2px 8px rgba(102, 126, 234, 0.3)' 
      : 'none'
  });

  const authButtonStyle = (isPrimary = false) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    border: isPrimary ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
    background: isPrimary 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'transparent',
    boxShadow: isPrimary 
      ? '0 2px 8px rgba(102, 126, 234, 0.3)'
      : 'none',
    cursor: 'pointer',
    display: 'inline-block'
  });

  const userMenuStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500'
  };

  const logoutButtonStyle = {
    color: 'white',
    background: 'rgba(239, 68, 68, 0.8)',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const handleMouseEnter = (e) => {
    if (!e.target.classList.contains('active')) {
      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
      e.target.style.transform = 'translateY(-1px)';
    }
  };

  const handleMouseLeave = (e) => {
    if (!e.target.classList.contains('active')) {
      e.target.style.background = 'transparent';
      e.target.style.transform = 'translateY(0px)';
    }
  };

  const handleAuthButtonHover = (e, isPrimary) => {
    if (isPrimary) {
      e.target.style.transform = 'translateY(-2px) scale(1.05)';
      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.5)';
    } else {
      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
      e.target.style.transform = 'translateY(-1px)';
    }
  };

  const handleAuthButtonLeave = (e, isPrimary) => {
    if (isPrimary) {
      e.target.style.transform = 'translateY(0px) scale(1)';
      e.target.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
    } else {
      e.target.style.background = 'transparent';
      e.target.style.transform = 'translateY(0px)';
    }
  };

  const handleLogoutHover = (e) => {
    e.target.style.background = 'rgba(239, 68, 68, 1)';
    e.target.style.transform = 'translateY(-1px)';
  };

  const handleLogoutLeave = (e) => {
    e.target.style.background = 'rgba(239, 68, 68, 0.8)';
    e.target.style.transform = 'translateY(0px)';
  };

  return (
    <nav
      style={{
        padding: '15px 20px',
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        position: 'relative'
      }}
    >
      {/* Left Navigation */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div 
          style={{ 
            fontSize: '20px', 
            marginRight: '20px',
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          📋 TaskManager
        </div>
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
          style={linkStyle(location.pathname === '/')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          🏠 Home
        </Link>
        <Link 
          to="/taskboard" 
          className={location.pathname === '/taskboard' ? 'active' : ''}
          style={linkStyle(location.pathname === '/taskboard')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          📊 Task Board
        </Link>
      </div>

      {/* Centered Quote - positioned absolutely */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '18px',
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        transition: 'opacity 0.5s ease',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        whiteSpace: 'nowrap',
        maxWidth: 'calc(100% - 400px)',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {currentQuote}
      </div>

      {/* Right Navigation - Auth Section */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {isAuthenticated ? (
          <div style={userMenuStyle}>
            <span>👋 Welcome, {userName}</span>
            <button
              onClick={handleLogout}
              style={logoutButtonStyle}
              onMouseEnter={handleLogoutHover}
              onMouseLeave={handleLogoutLeave}
            >
              🚪 Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              style={authButtonStyle(false)}
              onMouseEnter={(e) => handleAuthButtonHover(e, false)}
              onMouseLeave={(e) => handleAuthButtonLeave(e, false)}
            >
              🔑 Sign In
            </Link>
            <Link
              to="/register"
              style={authButtonStyle(true)}
              onMouseEnter={(e) => handleAuthButtonHover(e, true)}
              onMouseLeave={(e) => handleAuthButtonLeave(e, true)}
            >
              ✨ Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}