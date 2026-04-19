import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import MoodLogger from "./MoodLogger";

function Home() {
  const navigate = useNavigate();
  const [q1, setQ1] = useState("More than half the days");
  const [q2, setQ2] = useState("Not at all");
  const [showMoodLogger, setShowMoodLogger] = useState(false);

  // Persistent Display States
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("streak")) || 14);
  const [moodScore, setMoodScore] = useState(() => localStorage.getItem("moodScore") || "Good");
  const [sessions] = useState(() => Number(localStorage.getItem("sessions")) || 3);
  const [preferredName, setPreferredName] = useState(() => localStorage.getItem("preferredName") || "StudentAlpha");
  const [concernTag, setConcernTag] = useState(() => localStorage.getItem("concernTag") || "Anxiety & Stress");

  return (
    <div className="home-page">
      <header className="hero-banner">
        <div className="hero-content">
          <h1>MINDPULSE</h1>
          <p className="hero-subtitle">
            Your confidential digital mental wellness companion.
          </p>
          <p className="hero-desc">
            A safe, stigma-free space offering resources and tools specifically
            for the challenges of higher education.
          </p>
          <div className="hero-actions">
            <Link to="/chat" className="btn-pill btn-pill-primary">
              <i className="ti ti-message-chatbot"></i> Start AI Chat Support
            </Link>
            <a href="#resources" className="btn-pill btn-pill-secondary">
              <i className="ti ti-book"></i> Explore Resources
            </a>
          </div>
        </div>
      </header>

      <main className="dashboard-container">
        <div className="main-col">
          <section className="wellness-toolkit" id="ai-portal">
            <div className="ai-feature-banner">
              <div className="ai-feature-content">
                <i className="ti ti-message-chatbot ai-floating-icon"></i>
                <div className="ai-feature-text">
                  <h2>Dedicated AI Support Chat</h2>
                  <p>Experience 24/7 empathetic support equipped with advanced crisis intervention guidance. Talk about your day, log your mood, and receive personalized care completely anonymously.</p>
                </div>
              </div>
              <button 
                style={{ flexShrink: 0 }}
                className="btn-fill btn-fill-primary" 
                onClick={() => navigate('/chat')}
              >
                Launch AI Assistant
              </button>
            </div>
          </section>

          <section className="card diagnostic-card">
            <div className="card-header">
              <i className="ti ti-notes"></i> Initial Diagnostic
            </div>
            <div className="diagnostic-q">
              <p className="q-text">
                Over the past 2 weeks, how often have you felt down, depressed,
                or hopeless?
              </p>
              <div className="options-row">
                {["Not at all", "Several days", "More than half the days", "Nearly every day"].map(opt => (
                    <button 
                        key={opt}
                        className={`option-btn ${q1 === opt ? "selected" : ""}`}
                        onClick={() => setQ1(opt)}
                    >
                        {opt}
                    </button>
                ))}
              </div>
            </div>
            <div className="diagnostic-q">
              <p className="q-text">
                Over the past 2 weeks, how often have you felt nervous, anxious,
                or on edge?
              </p>
              <div className="options-row">
                {["Not at all", "Several days", "More than half the days", "Nearly every day"].map(opt => (
                    <button 
                        key={opt}
                        className={`option-btn ${q2 === opt ? "selected" : ""}`}
                        onClick={() => setQ2(opt)}
                    >
                        {opt}
                    </button>
                ))}
              </div>
            </div>
            <div className="submit-row">
              <button 
                className="btn-fill btn-fill-primary"
                onClick={() => {
                  alert("Diagnostic Submitted! Your session risk factors have been updated.");
                  const newStreak = streak + 1;
                  setStreak(newStreak);
                  localStorage.setItem("streak", newStreak);
                }}
              >
                Submit Diagnostic
              </button>
              <button 
                className="btn-fill btn-fill-secondary"
                onClick={() => { setQ1("Not at all"); setQ2("Not at all"); }}
              >
                Reset
              </button>
            </div>
          </section>

          <section className="card status-grid-container">
            <div className="status-grid">
              <div className="status-pill">
                <i className="ti ti-flame" style={{ color: "#F59E0B" }}></i>
                <div className="status-content">
                  <h4>Streak</h4>
                  <div className="value">{streak} Days</div>
                </div>
              </div>
              <div className="status-pill">
                <i
                  className="ti ti-mood-neutral"
                  style={{ color: "#6B7280" }}
                ></i>
                <div className="status-content">
                  <h4>Mood Score</h4>
                  <div className="value">{moodScore}</div>
                </div>
              </div>
              <div className="status-pill">
                <i className="ti ti-history" style={{ color: "#3B82F6" }}></i>
                <div className="status-content">
                  <h4>Sessions</h4>
                  <div className="value">{sessions}</div>
                </div>
              </div>
              <div className="status-pill">
                <i className="ti ti-award" style={{ color: "#10B981" }}></i>
                <div className="status-content">
                  <h4>Achievements</h4>
                  <div className="value">5</div>
                </div>
              </div>
            </div>
            <div className="inline-profile">
              <div className="inline-input-group">
                <label>Preferred Name</label>
                <input 
                  type="text" 
                  value={preferredName} 
                  onChange={(e) => {
                    setPreferredName(e.target.value);
                    localStorage.setItem("preferredName", e.target.value);
                  }} 
                />
              </div>
              <div className="inline-input-group">
                <label>Disease/Concern Tag</label>
                <select 
                  value={concernTag}
                  onChange={(e) => {
                    setConcernTag(e.target.value);
                    localStorage.setItem("concernTag", e.target.value);
                  }}
                >
                  <option>Anxiety & Stress</option>
                  <option>General Support</option>
                  <option>Social Concerns</option>
                </select>
              </div>
            </div>
          </section>

          <section className="card counselor-card">
            <div className="card-header">
              <i className="ti ti-user-star"></i> Choose Your Counselor
            </div>
            <div className="profile-list">
              <div className="profile-item">
                <div className="prof-avatar"><i className="ti ti-user-female"></i></div>
                <div className="prof-details">
                  <h4>Dr. Elena Vasquez</h4>
                  <p>Anxiety & Stress, Academic Pressure</p>
                  <div className="prof-tags">
                    <span className="tag">In-Person</span>{" "}
                    <span className="tag">Video Call</span>
                  </div>
                </div>
                <div className="prof-meta">
                  <div className="rating">
                    <i className="ti ti-star-filled"></i> 4.9
                  </div>
                  <div className="experience">12 Years Exp.</div>
                </div>
              </div>
              <div className="profile-item">
                <div className="prof-avatar"><i className="ti ti-user-circle"></i></div>
                <div className="prof-details">
                  <h4>Dr. Marcus Chen</h4>
                  <p>Relationship & Social Concerns</p>
                  <div className="prof-tags">
                    <span className="tag">Video Call</span>
                  </div>
                </div>
                <div className="prof-meta">
                  <div className="rating">
                    <i className="ti ti-star-filled"></i> 4.8
                  </div>
                  <div className="experience">8 Years Exp.</div>
                </div>
              </div>
            </div>
          </section>
        </div>{" "}
        <aside className="sidebar-col">
          <section className="card">
            <div className="card-header">
              <i className="ti ti-lightning"></i> Quick Actions
            </div>
            <div className="quick-actions">
              <Link to="/chat" className="action-btn action-btn-primary">
                <i className="ti ti-message-chatbot"></i> Start AI Chat
              </Link>
              <button className="action-btn" onClick={() => {
                sessionStorage.setItem("showDiagnostic", "true");
                sessionStorage.setItem("diagnosticIndex", "0");
                sessionStorage.setItem("diagnosticAnswers", "[]");
                navigate("/chat");
              }}>
                <i className="ti ti-rotate"></i> Retake Diagnostic
              </button>
              <button className="action-btn" onClick={() => setShowMoodLogger(true)}>
                <i className="ti ti-face-id"></i> Log Current Mood
              </button>
              <button className="action-btn" onClick={() => alert("Redirecting to the Calendar and Scheduling Hub...")}>
                <i className="ti ti-calendar-plus"></i> Book Session
              </button>
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <i className="ti ti-award"></i> Achievements
            </div>
            <div
              className="status-grid status-grid-small"
              style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              <div className="status-pill status-pill-small">
                <i
                  className="ti ti-checkup-list"
                  style={{ color: "#10B981" }}
                ></i>
                <div className="status-content">
                  <h4>Diagnostic</h4>
                  <div className="value" style={{ fontSize: "0.9rem" }}>
                    Complete
                  </div>
                </div>
              </div>
              <div className="status-pill status-pill-small">
                <i
                  className="ti ti-message-dots"
                  style={{ color: "#3B82F6" }}
                ></i>
                <div className="status-content">
                  <h4>AI Chats</h4>
                  <div className="value" style={{ fontSize: "0.9rem" }}>
                    Level 1
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="card upcoming-card">
            <div className="card-header">
              <i className="ti ti-calendar-event"></i> Upcoming
            </div>
            <div className="upcoming-empty">No events scheduled.</div>
          </section>
        </aside>{" "}
      </main>

      {showMoodLogger && (
        <MoodLogger 
          onClose={() => setShowMoodLogger(false)} 
          onMoodLogged={(entry) => {
            setMoodScore(entry.label);
            localStorage.setItem("moodScore", entry.label);
          }}
        />
      )}
    </div>
  );
}

export default Home;
