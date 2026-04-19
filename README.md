# 🧠 MindPulse AI

**An intelligent, AI-powered mental wellness companion.** 
MindPulse bridges the gap between deep-learning sentiment analysis and premium web architectures to deliver a secure, anonymous, and reactive emotional support system.

---

## 🌟 Key Features

* **Advanced NLP Engines**: Powered by custom-trained PyTorch transformers (`YashKumar11/vitagita-model`) and LLaMa-3 8B strictly tuned for empathetic assistance via HuggingFace Inference.
* **Algorithmic Crisis Detection**: Real-time message scanning that automatically overrides LLM generation during severe emotional events, instantly surfacing emergency global helpline architectures.
* **Premium User Interface**: Built entirely from scratch using React, featuring industry-leading aesthetics like Glassmorphism, dynamic 3D WebGL background integrations, WebKit Autofill bypasses, and an extremely responsive Isometric layout mirroring top-tier SaaS platforms (like Framer/Vercel).
* **Secure Authentication**: End-to-end user session tracking mapped rigorously through Google Firebase.

## 🛠️ Technology Stack

* **Frontend**: React.js, React Router, CSS3, HTML5 Video Overlays
* **Backend**: Python 3.10+, FastAPI, Uvicorn, PyTorch, NumPy
* **Cloud/Auth**: Google Firebase, HuggingFace Inference APIs

---

## 🚀 Quick Start Guide

You will need to boot two separate local servers to run MindPulse.

### 1. Booting the AI Backend (Python)
Navigate into the `backend/` directory, install the neural engines, and trigger the FastAPI server:
```bash
cd backend

# Install all necessary Cloud and ML libraries
pip install -r requirements.txt

# Boot the API server locally
uvicorn main:app --reload
```
> **⚠️ Critical Configuration**: You MUST create a `.env` file inside the `backend` folder containing `HF_TOKEN="your_hugging_face_token_here"` otherwise the LLM will fail to boot!

### 2. Booting the React Frontend (Node.js)
Open a new, separate terminal. Navigate into the `frontend/` directory, install the dependencies, and launch the Webpack server:
```bash
cd frontend

# Install all React dependencies and Routers
npm install

# Boot the frontend UI
npm start
```

---

## 🔐 Security & Data
MindPulse intentionally enforces a strict memory-limited array within the Chat structure. Conversations are wiped iteratively (storing only the last 10 messages) to ensure anonymity and mitigate long-term data vulnerabilities while still allowing the AI to understand immediate contextual cues.
