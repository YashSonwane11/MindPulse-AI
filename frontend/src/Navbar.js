import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import "./Home.css";

function Navbar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === "/dashboard";
  // Theme Logic
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("app-theme");
    if (saved && saved !== "system") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Theme Switcher Component
  const ThemeToggleUI = () => {
    const isDark = theme === "dark";
    const toggleTheme = () => setTheme(isDark ? "light" : "dark");
    
    return (
      <button 
        onClick={toggleTheme}
        title="Toggle Light/Dark Mode"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          borderRadius: "20px",
          background: isDashboard ? "var(--mp-bg)" : "var(--glass-bg)",
          color: isDashboard ? "var(--mp-text)" : "var(--text-main)",
          border: `1px solid ${isDashboard ? "var(--mp-surface-border)" : "var(--glass-border)"}`,
          cursor: "pointer",
          fontWeight: "600",
          outline: "none",
          fontSize: "0.9rem",
          transition: "all 0.2s ease"
        }}
      >
        <span>{isDark ? "🌙" : "☀️"}</span>
        <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
      </button>
    );
  };

  if (isDashboard) {
    // Preserve Admin Board Navbar
    return (
      <nav 
        style={{
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: "10px 24px", 
          minHeight: "64px",
          backgroundColor: "var(--mp-surface)",
          color: "var(--mp-text)",
          borderBottom: "1px solid var(--mp-surface-border)",
          fontFamily: "'Inter', sans-serif",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "600", margin: 0 }}>
            🧠 MindPulse
          </h1>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <ThemeToggleUI />
          <Link to="/" style={{ textDecoration: "none", color: "var(--mp-text-muted)", fontWeight: "500", fontSize: "0.95rem", transition: "color 0.2s" }}>
            Home
          </Link>
          <Link to="/dashboard" style={{ textDecoration: "none", color: "var(--mp-text)", fontWeight: "600", fontSize: "0.95rem" }}>
            Admin Board
          </Link>
          {user ? (
            <button 
              onClick={() => signOut(auth).then(() => navigate('/auth'))}
              className="logout-btn"
              style={{ padding: '6px 16px', fontSize: '0.85rem' }}
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => navigate('/auth')}
              className="btn-pill btn-pill-primary"
              style={{ padding: '6px 16px', fontSize: '0.85rem', border: 'none' }}
            >
              Log In
            </button>
          )}
        </div>
      </nav>
    );
  }

  const isAuthPage = location.pathname === "/auth";
  const isLandingPage = location.pathname === "/";

  // Hide the top navbar entirely on the Public Landing Page
  if (isLandingPage && !user) {
    return null;
  }

  if (isAuthPage) {
    return (
      <nav className="navbar" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '1rem 5%', background: 'transparent', borderBottom: 'none', boxShadow: 'none' }}>
        
        {/* Left Col: Back Button */}
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: 'var(--text-muted)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontWeight: '600',
            width: 'fit-content'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <i className="ti ti-arrow-left"></i> Back
        </Link>

        {/* Center Col: MINDPULSE Logo */}
        <Link to="/" className="brand-logo" style={{ fontSize: '1.8rem', textDecoration: 'none', justifyContent: 'center' }}>
          <i className="ti ti-pulse"></i> MINDPULSE
        </Link>
        
        {/* Right Col: Empty for Grid Balance */}
        <div></div>
      </nav>
    );
  }

  // User-facing VitaKita Navbar
  return (
    <nav className="navbar">
      <div className="brand-logo">
        <i className="ti ti-pulse"></i> MINDPULSE
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
        <Link to="/chat" className={`nav-link ${location.pathname === "/chat" ? "active" : ""}`}>AI Support</Link>
        <Link to="/dashboard" className="nav-link" style={{ color: 'var(--primary)', fontWeight: '700' }}>Admin Dashboard</Link>
      </div>
      
      <div className="nav-actions" style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", justifyContent: "center", marginTop: "10px" }}>
        <ThemeToggleUI />
        
        {user ? (
          <button 
            className="logout-btn" 
            onClick={() => signOut(auth).then(() => navigate('/auth'))}
          >
            Sign Out
          </button>
        ) : (
          <Link to="/auth" className="btn-pill btn-pill-primary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem' }}>
            Login / Sign Up
          </Link>
        )}

      </div>
    </nav>
  );
}

export default Navbar;