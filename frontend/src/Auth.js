import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Auth.css";

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorFront, setErrorFront] = useState("");
  const [errorBack, setErrorBack] = useState("");

  const handleSubmit = async (e, isLoginForm) => {
    e.preventDefault();
    const setLocalError = isLoginForm ? setErrorFront : setErrorBack;
    
    if (!email || !password) {
      setLocalError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setLocalError("");

    try {
      if (isLoginForm) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard'); 
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setLocalError("This account already exists. Please log in.");
      } else if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setLocalError("Invalid credentials. Please try again.");
      } else {
        setLocalError(err.message.replace("Firebase: ", ""));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setErrorFront("");
    setErrorBack("");
  };

  return (
    <div className="home-page" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Framer Holographic 4K Video Background */}
      <video 
        src="https://framerusercontent.com/assets/Kny5Ty8J6mn9PsM1TGpXsWNtNh4.mp4" 
        loop 
        autoPlay
        muted
        preload="auto" 
        poster="https://framerusercontent.com/images/tJ3TnVgvh0uXDNH0WtoVmYeT7KE.png" 
        playsInline 
        style={{ 
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', 
          height: '100%', 
          display: 'block', 
          objectFit: 'cover', 
          objectPosition: '50% 50%',
          backgroundColor: '#000',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <div className="auth-page" style={{ zIndex: 10, position: 'relative' }}>
        <div className={`auth-flip-container ${!isLogin ? "flipped" : ""}`}>
          <div className="auth-flipper">
            
            {/* --- FRONT SIDE: LOGIN --- */}
            <div className="auth-panel auth-front">
              <div className="auth-header">
                <h2>Welcome Back</h2>
                <p>Securely access your mental wellness companion.</p>
              </div>

              {errorFront && <div className="auth-error">{errorFront}</div>}

              <form className="auth-form" onSubmit={(e) => handleSubmit(e, true)}>
                <div className="input-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="you@university.edu" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? "Authenticating..." : "Sign In"}
                </button>
              </form>

              <div className="auth-toggle">
                Don't have an account? 
                <span onClick={handleToggle}>Sign Up</span>
              </div>
            </div>

            {/* --- BACK SIDE: SIGN UP --- */}
            <div className="auth-panel auth-back">
              <div className="auth-header">
                <h2>Create Account</h2>
                <p>Begin your anonymous wellness journey today.</p>
              </div>

              {errorBack && <div className="auth-error">{errorBack}</div>}

              <form className="auth-form" onSubmit={(e) => handleSubmit(e, false)}>
                <div className="input-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="student@university.edu" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? "Creating..." : "Sign Up"}
                </button>
              </form>

              <div className="auth-toggle">
                Already have an account? 
                <span onClick={handleToggle}>Log In</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
