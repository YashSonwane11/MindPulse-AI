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
  const [theme, setTheme] = useState(() => localStorage.getItem("app-theme") || "system");

  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    
    const applyTheme = (t) => {
      let activeTheme = t;
      if (t === "system") {
        activeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      document.documentElement.setAttribute("data-theme", activeTheme);
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => { if (theme === "system") applyTheme("system"); };
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Theme Switcher Component
  const ThemeToggleUI = () => (
    <select 
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      style={{
        padding: "8px 16px",
        borderRadius: "20px",
        background: isDashboard ? "var(--mp-bg)" : "var(--glass-bg)",
        color: isDashboard ? "var(--mp-text)" : "var(--text-main)",
        border: `1px solid ${isDashboard ? "var(--mp-surface-border)" : "var(--glass-border)"}`,
        cursor: "pointer",
        fontWeight: "600",
        outline: "none",
        fontSize: "0.9rem"
      }}
    >
      <option value="system">💻 System</option>
      <option value="light">☀️ Light</option>
      <option value="dark">🌙 Dark</option>
    </select>
  );

  if (isDashboard) {
    // Preserve Admin Board Navbar
    return (
      <nav 
        style={{
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: "0 24px", 
          height: "64px",
          backgroundColor: "var(--mp-surface)",
          color: "var(--mp-text)",
          borderBottom: "1px solid var(--mp-surface-border)",
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "600", margin: 0 }}>
            🧠 MindPulse
          </h1>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <ThemeToggleUI />
          <Link to="/" style={{ textDecoration: "none", color: "var(--mp-text-muted)", fontWeight: "500", fontSize: "0.95rem", transition: "color 0.2s" }}>
            Home (Chat)
          </Link>
          <Link to="/dashboard" style={{ textDecoration: "none", color: "var(--mp-text)", fontWeight: "600", fontSize: "0.95rem" }}>
            Admin Board
          </Link>
          {user ? (
            <button 
              onClick={() => signOut(auth).then(() => navigate('/auth'))}
              style={{ background: 'transparent', border: '1px solid var(--mp-surface-border)', color: 'var(--mp-text)', padding: '6px 12px', borderRadius: '18px', cursor: 'pointer', fontWeight: '600' }}
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => navigate('/auth')}
              style={{ background: 'var(--primary)', border: 'none', color: '#fff', padding: '6px 16px', borderRadius: '18px', cursor: 'pointer', fontWeight: '600' }}
            >
              Log In
            </button>
          )}
        </div>
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
      
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <ThemeToggleUI />
        
        {user ? (
          <button 
            className="logout-btn" 
            onClick={() => signOut(auth).then(() => navigate('/auth'))}
            style={{borderColor: 'var(--glass-border)', color: 'var(--text-main)'}}
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