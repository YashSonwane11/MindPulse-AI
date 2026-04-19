import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import Home from "./Home";
import Chat from "./Chat";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Auth from "./Auth";

function App() {
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (authChecking) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 'bold', zIndex: 9999 }}>Authenticating Secure Link...</div>;
    if (!user) return <Navigate to="/auth" replace />;
    return children;
  };

  // Global 3D Interactive Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <BrowserRouter>
      {/* 3D Cursor Glow Layer */}
      <div className="interactive-bg"></div>
      
      <Navbar user={user} />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        
        {/* Secure Payload Wrappers */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;