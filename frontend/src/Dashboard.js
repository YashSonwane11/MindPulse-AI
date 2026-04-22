import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const LABEL_COLORS = {
  Crisis: "#ef4444",      // Red
  Depression: "#8b5cf6",  // Purple
  Neutral: "#94a3b8",     // Slate
  Normal: "#10b981",      // Emerald
  Stress: "#f59e0b",      // Amber
};

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get("https://mindpulse-ai-a8s8.onrender.com/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !stats) {
    return (
      <div className="dashboard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading Dashboard Analytics...</p>
      </div>
    );
  }

  const { total_sessions, label_counts, most_common, crisis_alerts } = stats;

  const pieData = {
    labels: Object.keys(label_counts),
    datasets: [
      {
        data: Object.values(label_counts),
        backgroundColor: Object.keys(label_counts).map(l => LABEL_COLORS[l] || "#888"),
        borderColor: "#1a1a2e",
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#e2e8f0",
          usePointStyle: true,
          padding: 20
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6
      }
    },
  };

  const barData = {
    labels: Object.keys(label_counts),
    datasets: [
      {
        label: 'Sessions recorded',
        data: Object.values(label_counts),
        backgroundColor: Object.keys(label_counts).map(l => LABEL_COLORS[l] || "#888"),
        borderRadius: 6,
        barThickness: 24,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12
      }
    },
    scales: {
      x: {
        grid: { display: false, color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8', stepSize: 1 }
      }
    }
  };

  return (
    <div className="home-page" style={{ padding: '2rem 5%', maxWidth: '1400px', margin: '0 auto', paddingBottom: '5rem' }}>
      <header className="hero-banner" style={{ padding: '2rem 0 3rem', textAlign: 'left', animation: 'none' }}>
        <div className="hero-content">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Analytics</h1>
          <p className="hero-subtitle" style={{ margin: '0', maxWidth: 'none' }}>Real-time mental health statistics overview.</p>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="card status-grid-container" style={{ marginBottom: '2.5rem' }}>
        <div className="status-grid dashboard-status-grid">
          <div className="status-pill">
            <i className="ti ti-clipboard-list" style={{ color: "#3B82F6" }}></i>
            <div className="status-content">
              <h4>Total Sessions</h4>
              <div className="value">{total_sessions}</div>
            </div>
          </div>
          <div className="status-pill">
            <i className="ti ti-chart-bar" style={{ color: "#10B981" }}></i>
            <div className="status-content">
              <h4>Common State</h4>
              <div className="value" style={{ color: LABEL_COLORS[most_common] || 'inherit' }}>
                {most_common !== "N/A" ? most_common : "--"}
              </div>
            </div>
          </div>
          <div className={`status-pill ${crisis_alerts > 0 ? 'alert-pill' : ''}`} style={crisis_alerts > 0 ? { borderColor: 'rgba(239, 68, 68, 0.5)', background: 'rgba(239, 68, 68, 0.05)' } : {}}>
            <i className="ti ti-alert-triangle" style={{ color: "#EF4444" }}></i>
            <div className="status-content">
              <h4 style={crisis_alerts > 0 ? { color: '#FCA5A5' } : {}}>Crisis Alerts</h4>
              <div className="value" style={crisis_alerts > 0 ? { color: '#EF4444' } : {}}>{crisis_alerts}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <div className="dashboard-container" style={{ padding: '0', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        <div className="dashboard-charts-grid">
          <div className="card">
            <div className="card-header">
              <i className="ti ti-chart-pie"></i> Mental State Distribution
            </div>
            <div style={{ height: '320px', position: 'relative' }}>
              {total_sessions > 0 ? (
                <Doughnut data={pieData} options={pieOptions} />
              ) : (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No data available yet.</p>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <i className="ti ti-activity"></i> Session Volume Breakdown
            </div>
            <div style={{ height: '320px', position: 'relative' }}>
              {total_sessions > 0 ? (
                <Bar data={barData} options={barOptions} />
              ) : (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No data available yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <i className="ti ti-align-box-left-stretch"></i> Label Breakdown Diagnostics
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {Object.entries(label_counts).map(([label, count]) => {
              const pct = total_sessions > 0 ? ((count / total_sessions) * 100).toFixed(1) : 0;
              return (
                <div key={label} style={{ background: 'var(--glass-bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: '600' }}>
                    <span style={{ color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>{label}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{pct}% ({count})</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        backgroundColor: LABEL_COLORS[label],
                        boxShadow: `0 0 10px ${LABEL_COLORS[label]}80`,
                        transition: 'width 1s ease'
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
