import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const PHQ_QUESTIONS = [
  "Over the last 2 weeks, how often have you been bothered by having little interest or pleasure in doing things?",
  "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
  "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious or on edge?"
];

const PHQ_OPTIONS = [
  "Not at all",
  "Several days",
  "More than half the days",
  "Nearly every day"
];

function Chat() {
  const [messages, setMessages] = useState(() => {
    // Check if this is a fresh application open
    const isNewSession = !sessionStorage.getItem("sessionActive");
    
    if (isNewSession) {
      sessionStorage.setItem("sessionActive", "true");
      // Archive the old chat to history
      const oldMessages = localStorage.getItem("currentChatMessages");
      if (oldMessages && JSON.parse(oldMessages).length > 0) {
        const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
        history.push({ 
          date: new Date().toLocaleString(), 
          messages: JSON.parse(oldMessages) 
        });
        localStorage.setItem("chatHistory", JSON.stringify(history));
      }
      // Start fresh
      localStorage.setItem("currentChatMessages", "[]");
      return [];
    } else {
      // Continue existing session
      const saved = localStorage.getItem("currentChatMessages");
      return saved ? JSON.parse(saved) : [];
    }
  });

  const [inputValue, setInputValue] = useState("");
  
  // Diagnostic State
  const [showDiagnostic, setShowDiagnostic] = useState(() => {
    const saved = sessionStorage.getItem("showDiagnostic");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [diagnosticIndex, setDiagnosticIndex] = useState(() => {
    const saved = sessionStorage.getItem("diagnosticIndex");
    return saved ? JSON.parse(saved) : 0;
  });
  const [diagnosticAnswers, setDiagnosticAnswers] = useState(() => {
    const saved = sessionStorage.getItem("diagnosticAnswers");
    return saved ? JSON.parse(saved) : [];
  });

  // History State
  const [historyList, setHistoryList] = useState(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Save state whenever it changes
  useEffect(() => { localStorage.setItem("currentChatMessages", JSON.stringify(messages)); }, [messages]);
  useEffect(() => { sessionStorage.setItem("showDiagnostic", JSON.stringify(showDiagnostic)); }, [showDiagnostic]);
  useEffect(() => { sessionStorage.setItem("diagnosticIndex", JSON.stringify(diagnosticIndex)); }, [diagnosticIndex]);
  useEffect(() => { sessionStorage.setItem("diagnosticAnswers", JSON.stringify(diagnosticAnswers)); }, [diagnosticAnswers]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDiagnosticAnswer = (answer) => {
    const newAnswers = [...diagnosticAnswers, answer];
    setDiagnosticAnswers(newAnswers);

    if (diagnosticIndex < PHQ_QUESTIONS.length - 1) {
      setDiagnosticIndex(diagnosticIndex + 1);
    } else {
      // Diagnostic complete
      setShowDiagnostic(false);
      // Optional: Add a system message acknowledging the diagnostic
      setMessages([
        {
          role: "bot",
          text: "Thank you for sharing that. I'm Vita, your AI assistant. I'm here to listen and help. What is on your mind today?"
        }
      ]);
    }
  };

  const handleRetakeDiagnostic = () => {
    setDiagnosticAnswers([]);
    setDiagnosticIndex(0);
    setShowDiagnostic(true);
    setMessages([]);
  };

  const startNewChat = () => {
    if (messages.length > 0) {
      const newHistory = [{ date: new Date().toLocaleString(), messages }, ...historyList];
      setHistoryList(newHistory);
      localStorage.setItem("chatHistory", JSON.stringify(newHistory));
    }
    setMessages([]);
    localStorage.setItem("currentChatMessages", "[]");
    setShowDiagnostic(false);
  };

  const loadHistoryItem = (historyItem) => {
    // Optionally archive current if active?
    setMessages(historyItem.messages);
    setShowDiagnostic(false);
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to delete all chat history?")) {
      setHistoryList([]);
      localStorage.setItem("chatHistory", "[]");
      setMessages([]);
      localStorage.setItem("currentChatMessages", "[]");
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInputValue("");

    try {
      // Include diagnostic context if we want to, though the backend doesn't expect it directly yet
      // We will just send the chat message to the existing endpoint.
      const res = await axios.post("https://mindpulse-ai-a8s8.onrender.com/chat", {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev, 
        { role: "bot", text: res.data.reply, label: res.data.label }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "I'm sorry, I'm having trouble connecting right now." }
      ]);
    }
  };

  return (
    <div className="vk-container">
      {/* Sidebar: Quick Actions & History */}
      <div className="vk-sidebar">
        <button 
          className="vk-action-btn"
          style={{ background: 'var(--vk-primary)', color: 'white', justifyContent: 'center', fontWeight: 'bold', marginBottom: '16px', borderColor: 'transparent' }}
          onClick={startNewChat}
        >
          <i className="ti ti-plus"></i> New Chat
        </button>

        <button 
          className="vk-action-btn"
          onClick={handleRetakeDiagnostic}
        >
          <i className="ti ti-rotate"></i> Retake Diagnostic
        </button>

        <div style={{ flex: 1, overflowY: 'auto', marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--vk-text-light)', marginBottom: '8px', fontWeight: '800', letterSpacing: '1px' }}>
            Chat History
          </h3>
          {historyList.length === 0 && (
            <p style={{fontSize: '0.85rem', color: 'var(--vk-text-light)', fontStyle: 'italic'}}>No previous chats.</p>
          )}
          {historyList.map((chat, idx) => (
            <button 
              key={idx} 
              className="vk-action-btn" 
              style={{ fontSize: '0.9rem', padding: '10px 12px', border: '1px solid transparent', backgroundColor: 'rgba(0,0,0,0.03)' }} 
              onClick={() => loadHistoryItem(chat)}
            >
              <i className="ti ti-message"></i> {chat.date.split(',')[0]} Chat
            </button>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--vk-border)' }}>
          <button 
            className="vk-action-btn" 
            style={{ width: '100%', borderColor: 'rgba(239, 68, 68, 0.5)', color: '#ef4444' }} 
            onClick={clearHistory}
          >
            <i className="ti ti-trash"></i> Delete History
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="vk-main">
        {showDiagnostic ? (
          <div className="vk-diagnostic">
            <h2>Initial Diagnostic</h2>
            <p className="vk-question">{PHQ_QUESTIONS[diagnosticIndex]}</p>
            <div className="vk-options">
              {PHQ_OPTIONS.map((val, idx) => (
                <button 
                  key={idx} 
                  className="vk-option-btn" 
                  onClick={() => handleDiagnosticAnswer(val)}
                >
                  {val}
                </button>
              ))}
            </div>
            <p style={{marginTop: "24px", color: "var(--vk-text-light)", fontSize: "0.9rem"}}>
              Question {diagnosticIndex + 1} of {PHQ_QUESTIONS.length}
            </p>
          </div>
        ) : (
          <div className="vk-chat-wrapper">
            <div className="vk-disclaimer">
              ⚠️ <strong>Crisis Disclaimer:</strong> If you are in immediate danger, please contact emergency services. This is an AI assistant, not a human crisis counselor.
            </div>
            
            <div className="vk-chat-history">
              {messages.map((msg, idx) => (
                <div key={idx} className={`vk-msg-row ${msg.role === "user" ? "vk-msg-user" : "vk-msg-bot"}`}>
                  <div className="vk-msg-bubble">
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="vk-input-area">
              <input 
                type="text" 
                className="vk-input-field"
                placeholder="Type your message to Vita..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="vk-send-btn" onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}

        {/* Trust Signals Footer */}
        <div className="vk-trust-footer">
          🔒 Confidential & Secure. Your data is private.
        </div>
      </div>
    </div>
  );
}

export default Chat;