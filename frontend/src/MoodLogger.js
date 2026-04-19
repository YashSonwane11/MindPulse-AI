import React, { useState } from 'react';
import './MoodLogger.css';

const MoodLogger = ({ onMoodLogged, onClose }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(false);

  const moods = [
    { id: 'crisis', label: 'Crisis', icon: 'ti-alert-circle', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
    { id: 'depression', label: 'Low', icon: 'ti-mood-sad', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
    { id: 'neutral', label: 'Neutral', icon: 'ti-mood-neutral', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.1)' },
    { id: 'stress', label: 'Stressed', icon: 'ti-bolt', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    { id: 'normal', label: 'Good', icon: 'ti-mood-smile', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  ];

  const handleLogMood = async (mood) => {
    setSelectedMood(mood.id);
    setLoading(true);

    const moodEntry = {
      moodId: mood.id,
      timestamp: new Date().toISOString(),
      label: mood.label
    };

    setTimeout(() => {
      setLoading(false);
      if (onMoodLogged) onMoodLogged(moodEntry);
      else alert(`Mood logged: ${mood.label}`);
      if (onClose) onClose();
    }, 800);
  };

  return (
    <div className="mood-logger-overlay">
      <div className="mood-logger-card">
        <button className="mood-close-btn" onClick={onClose}><i className="ti ti-x"></i></button>
        <div className="mood-card-header">
          <h3>How are you feeling?</h3>
          <p>Quickly log your mood for your wellness map.</p>
        </div>

        <div className="mood-grid">
          {moods.map((mood) => {
            const isActive = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => handleLogMood(mood)}
                disabled={loading}
                className={`mood-btn ${isActive ? 'active' : ''}`}
                style={{ 
                  color: mood.color, 
                  backgroundColor: isActive ? mood.bg : 'var(--glass-bg)',
                  borderColor: isActive ? mood.color : 'var(--glass-border)'
                }}
              >
                <i className={`ti ${mood.icon} mood-icon`}></i>
                <span className="mood-label" style={{ color: "var(--text-main)" }}>
                  {mood.label}
                </span>
              </button>
            );
          })}
        </div>

        {loading && (
          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600' }}>
            Syncing with MindPulse Core...
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodLogger;
