
# SpeakEasyAI 🎙️🧠

**SpeakEasyAI** is an AI-powered emotional intelligence dashboard that transcribes spoken conversations and analyzes their sentiment. Built during a hackathon, the tool is designed to help teams, managers, and HR departments gain valuable post-meeting insights into communication tone, emotional dynamics, and speaker feedback.

> 🔗 [Live Demo]  
> 📁 [YouTube Video](https://www.youtube.com/watch?v=ubC6ekYCSFE)

---

## 🧩 Problem Statement

In fast-paced team environments, crucial emotional cues are often missed during meetings — leading to misunderstandings, unaddressed tensions, or overlooked appreciation. SpeakEasyAI bridges this gap by transcribing conversations and generating an intuitive emotional sentiment report per speaker.

---

## 🏗️ System Architecture

```
[User Mic Input] --> [Next.js Frontend]
                         ↓
        Audio (Blob) sent via FormData → [Django Backend API]
                         ↓
         [Whisper AI Transcription Service]
                         ↓
     [OpenAI Sentiment Analysis via GPT-4o]
                         ↓
    → Transcription & Sentiment JSON Response → [Frontend Dashboard]
```

<img src="https://github.com/user-attachments/assets/1904bb54-3c50-48d2-b831-afb5df1fcbb8" width="400"/>


---

## 🚀 Instructions to Run the App Locally

### 🌐 Frontend (Next.js)

```bash
# Clone the repository
git clone https://github.com/maniishbhusal/SpeakEasyAI_hackathon
cd SpeakEasyAI_hackathon/frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Open your browser and go to
http://localhost:3000
```

### ⚙️ Backend (Django)

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install required packages
pip install -r requirements.txt

# Set your environment variables
touch .env
# Add the following line:
OPENAI_API_KEY=your_openai_api_key_here

# Run the server
python manage.py runserver

# Backend will be available at
http://127.0.0.1:8000
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js**
- **Tailwind CSS**
- **Shadcn UI Library**
- **Lucide Icons**

### Backend
- **Django (Python)**
- **OpenAI Whisper API** – for transcription
- **GPT-4 Turbo** – for sentiment analysis
- **FFmpeg** – for handling audio input

---

## ✨ Features

- 🎤 **Voice Recording Interface**
- 📄 **Transcription** with Whisper
- 😊 **Sentiment Analysis**
- 🔐 **Authentication System**
- 📊 **Emotional Insights Dashboard**
- 📔 **History Dashboard**
- 🚀 **Hackathon-ready MVP Architecture**

---

## 👥 Team: Team Innovision

| Name               | Role                      |
|--------------------|---------------------------|
| **Manish Bhusal**   | Backend Developer (Django, OpenAI API Integration) |
| **Nirjala Shrestha**| Frontend Developer (Next.js, UI/UX) |
| **Aakanksha Pathak**| Research & Presentation Lead |

---

## 📎 .env Sample (Backend)

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ Keep your API key secure. Do not commit it publicly.

---

## 📌 Note

This project was built as part of a hackathon and is under active development. Contributions, feedback, and forks are welcome!

---

### Made with ❤️ by Team Galaxen
