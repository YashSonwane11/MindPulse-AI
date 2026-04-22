import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  
  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("app-theme");
    if (saved && saved !== "system") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="landing-page">
      
      {/* Navbar specific to Landing Page */}
      <nav className="lp-navbar">
        <div className="lp-logo">
          <i className="ti ti-pulse"></i> MINDPULSE
        </div>
        <div className="lp-nav-links">
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#team">Experts</a>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button 
            onClick={toggleTheme}
            title="Toggle Light/Dark Mode"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--lp-surface)",
              color: "var(--lp-text)",
              border: "1px solid rgba(0,0,0,0.1)",
              cursor: "pointer",
              fontSize: "1.2rem",
              transition: "all 0.2s ease"
            }}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <Link to="/auth" className="lp-btn lp-btn-primary">Sign In / Join</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="lp-hero">
        <div className="lp-container">
          <h1>Your <span>Mental Wellness</span><br/> Journey Starts Here</h1>
          <p>
            Take the first step toward healing with compassionate, expert AI and mental health 
            care right from the comfort of your home. Confidential. Secure. Built for students.
          </p>
          <div className="lp-hero-actions">
            <Link to="/auth" className="lp-btn lp-btn-primary">Get Started</Link>
            <a href="#services" className="lp-btn lp-btn-outline">Learn More &darr;</a>
          </div>

          <div className="lp-hero-cards">
            <div className="lp-h-card">
              <h3>Overcome Anxiety</h3>
              <p>Find relief from racing thoughts, build coping techniques, and regain peace of mind today.</p>
              <img src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop" alt="Anxiety Relief" />
            </div>
            <div className="lp-h-card">
              <h3>Manage Depression</h3>
              <p>Step-by-step guidance to lift the fog, rebuild your motivation, and navigate through the dark days.</p>
              <img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop" alt="Manage Depression" />
            </div>
            <div className="lp-h-card">
              <h3>Stress Reduction</h3>
              <p>Practical mindfulness tools to lower cortisol, sleep better, and handle academic pressure.</p>
              <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop" alt="Stress Reduction" />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="lp-stats">
        <div className="lp-container lp-stats-grid">
          <div className="lp-stats-title">
            <h2>Empowering Mental<br/>Health Worldwide</h2>
          </div>
          <div className="lp-stat-item">
            <h3>5M+</h3>
            <p>Lives Touched</p>
          </div>
          <div className="lp-stat-item">
            <h3>86%</h3>
            <p>Client Satisfaction</p>
          </div>
          <div className="lp-stat-item">
            <h3>72%</h3>
            <p>See Progress</p>
          </div>
          <div className="lp-stat-item">
            <h3>15+</h3>
            <p>Years Experience</p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="lp-section" id="about">
        <div className="lp-container lp-split">
          <div className="lp-split-content">
            <h2>Who We Are</h2>
            <p>
              At MindPulse, mental health meets digital comfort. We've built an AI-driven, compassionate 
              platform designed specifically to tear down the barriers to accessible mental health support. 
              Whether you need to break down daily anxieties or seek deeper therapeutic assistance, we connect 
              you with tools, insights, and trained professionals whenever you need them.
            </p>
            <p>
              Your mind deserves a safe, confidential space. We are here to listen, analyze, and empower 
              you every step of the way.
            </p>
            <Link to="/auth" className="lp-btn lp-btn-outline" style={{marginTop: '16px'}}>Read More &rarr;</Link>
          </div>
          <div className="lp-split-image">
            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop" alt="Therapy Session" />
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="lp-section lp-section-alt" id="team">
        <div className="lp-container">
          <div className="lp-section-title">
            <h2>Our Team of Trusted Experts</h2>
            <p>Meet our diverse, licensed therapists and mental health coaches, dedicated to helping you thrive.</p>
          </div>
          <div className="lp-grid-3">
             <div className="lp-team-card">
               <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" alt="Expert 1" />
               <div className="lp-team-info">
                 <h3>Dr. Alice Merry</h3>
                 <p>Clinical Psychologist</p>
               </div>
             </div>
             <div className="lp-team-card">
               <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop" alt="Expert 2" />
               <div className="lp-team-info">
                 <h3>Dr. David Alvis</h3>
                 <p>Behavioral Therapist</p>
               </div>
             </div>
             <div className="lp-team-card">
               <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop" alt="Expert 3" />
               <div className="lp-team-info">
                 <h3>Nina Silvia</h3>
                 <p>Lead Counselor</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="lp-section" id="services">
        <div className="lp-container">
          <div className="lp-section-title">
             <h2>Our Services Are Designed<br/>Around You</h2>
             <p>Personalized, flexible mental health support — whether you're looking for individual guidance, goal-focused coaching, or a supportive community.</p>
          </div>
          <div className="lp-grid-3">
             <div className="lp-service-card">
                <div className="lp-service-icon"><i className="ti ti-brain"></i></div>
                <h3>Therapy Sessions</h3>
                <p>Connect one-on-one with licensed therapists for depression, trauma, anxiety, and more. Personalized, evidence-based care.</p>
                <div className="lp-service-arrow"><i className="ti ti-arrow-up-right"></i></div>
             </div>
             <div className="lp-service-card">
                <div className="lp-service-icon"><i className="ti ti-target"></i></div>
                <h3>Mindset Coaching</h3>
                <p>Get practical tools for life challenges, burnout, motivation, and self-confidence with our trained coaches.</p>
                <div className="lp-service-arrow"><i className="ti ti-arrow-up-right"></i></div>
             </div>
             <div className="lp-service-card">
                <div className="lp-service-icon"><i className="ti ti-users"></i></div>
                <h3>Support Groups</h3>
                <p>Join safe, moderated groups to share, listen, and connect with people who truly understand your experience.</p>
                <div className="lp-service-arrow"><i className="ti ti-arrow-up-right"></i></div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust & Steps Split sections */}
      <section className="lp-section lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-title">
             <h2>Why People Trust Us With Their<br/>Mental Health</h2>
          </div>
          <div className="lp-grid-3" style={{ marginBottom: '120px' }}>
            <div className="lp-trust-card">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop" alt="Support" />
              <div className="lp-trust-overlay">
                <h3>Expert Led</h3>
                <p>All programs are developed by clinicians.</p>
              </div>
            </div>
            <div className="lp-trust-card">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop" alt="Privacy" />
              <div className="lp-trust-overlay">
                <h3>Private & Secure</h3>
                <p>Your privacy and identity is completely protected.</p>
              </div>
            </div>
            <div className="lp-trust-card">
              <img src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=600&auto=format&fit=crop" alt="Results" />
              <div className="lp-trust-overlay">
                <h3>Real Results</h3>
                <p>Trackable mood metrics that show real progress.</p>
              </div>
            </div>
          </div>

          <div className="lp-split">
             <div className="lp-split-content">
               <h2>Start Feeling Better In<br/>Just A Few Steps</h2>
               <p style={{ marginBottom: '40px' }}>Personalized, flexible mental health support designed by clinicians to give you exactly what you need.</p>
               <Link to="/auth" className="lp-btn lp-btn-primary">Get Started Now</Link>
             </div>
             <div className="lp-split-image" style={{ boxShadow: 'none', background: 'transparent' }}>
               <div className="lp-steps-list">
                 <div className="lp-step">
                   <div className="lp-step-num">1</div>
                   <div className="lp-step-content">
                     <h3>Choose A Service</h3>
                     <p>Our dedicated team is available around the clock to help you resolve your issues safely.</p>
                   </div>
                 </div>
                 <div className="lp-step">
                   <div className="lp-step-num">2</div>
                   <div className="lp-step-content">
                     <h3>Seamless Integrations</h3>
                     <p>Daily routines are built perfectly into existing tools like calendar and reminders.</p>
                   </div>
                 </div>
                 <div className="lp-step">
                   <div className="lp-step-num">3</div>
                   <div className="lp-step-content">
                     <h3>User-Friendly Design</h3>
                     <p>Tailored interfaces that fit specific business needs without unnecessary complexity.</p>
                   </div>
                 </div>
                 <div className="lp-step">
                   <div className="lp-step-num">4</div>
                   <div className="lp-step-content">
                     <h3>Results-Driven</h3>
                     <p>At the end of the day, what matters most is results. We focus on delivering measurable progress.</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="lp-cta-footer">
        <div className="lp-cta-overlay"></div>
        <div className="lp-cta-content lp-container">
           <h2>Are You Ready To Feel Better?</h2>
           <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
             Take action today and reclaim your peace of mind. Join the thousands of students using MindPulse.
           </p>
           <Link to="/auth" className="lp-btn lp-btn-primary" style={{ padding: '16px 40px', fontSize: '1.2rem' }}>
             Join MindPulse Now
           </Link>
        </div>
      </section>

    </div>
  );
}

export default Landing;
