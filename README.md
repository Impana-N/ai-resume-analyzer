# AI Resume Analyzer 🚀

An intelligent full-stack web application that analyzes resumes against job descriptions using **TF-IDF vectorization**, **cosine similarity**, and **weighted skill matching**. Built with React 18 + Flask + scikit-learn.

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![Flask](https://img.shields.io/badge/Flask-3.0-green)
![React](https://img.shields.io/badge/React-18-61DAFB)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.6-orange)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF)

---

## ✨ Features

### Core Analysis
- Upload a resume in **PDF** format
- Paste any **job description**
- Extracts resume text automatically using **PyMuPDF**
- Cleans and preprocesses text (tokenization, stopword removal, lemmatization)
- Computes **TF-IDF + Cosine Similarity** between resume and JD
- Performs **weighted skill matching** with a smart normalization dictionary
- Detects:
  - Matching technical skills
  - Missing skills
  - Matched projects & experience
  - Soft skills
- Generates **improvement suggestions**

### New Features (v2.0)
- 🔐 **Authentication System** — Signup, Login, Logout with token-based auth
- 🏠 **Landing Page** — Hero section, animated features, how-it-works, CTA
- 📊 **Dashboard** — Interactive analysis with animated score reveal
- 👥 **About Page** — Project overview, AI pipeline, team cards, tech stack
- 📞 **Contact Page** — Functional contact form with social links
- ❓ **FAQ Page** — Searchable accordion with common questions
- 👤 **Profile Page** — Editable user profile
- 💾 **Saved Analyses** — Persisted analysis history (SQLite)
- 🌓 **Dark/Light Mode** — Theme toggle with system preference detection
- 🎯 **Toast Notifications** — Real-time success/error feedback
- 🎬 **Framer Motion Animations** — Page transitions, hover effects, typewriter
- 🧊 **Glassmorphism UI** — Modern frosted glass design system
- 📱 **Responsive Design** — Mobile-optimized with collapsible navbar
- 🎨 **Gradient Themes** — Futuristic AI color palette
- ✨ **Interactive Elements** — Floating particles, scan animations, confetti

---

## AI Pipeline

```
                         AI RESUME ANALYZER PIPELINE
                         ===========================

  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
  │   PDF Resume     │ ──► │  Text Extraction  │ ──► │   Text Cleaning  │
  │   Upload (.pdf)  │     │   (PyMuPDF)       │     │  Lowercase, No   │
  │                  │     │                   │     │  punctuation,    │
  │                  │     │                   │     │  stopword removal│
  └──────────────────┘     └──────────────────┘     └──────────────────┘
                                                           │
                                                           ▼
  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
  │  Skill Matching  │ ◄── │  Skill Normalization│◄──│  Skill Extraction│
  │  Weighted Score  │     │  Synonym Mapping  │     │  Technical + Soft│
  │  + Cosine Sim    │     │  (e.g. ml→ML)    │     │  Skills          │
  └──────────────────┘     └──────────────────┘     └──────────────────┘
         │
         ▼
  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
  │  Final Score     │ ──► │  JSON Response   │ ──► │  React Dashboard │
  │  (Weighted: 70%  │     │  Matching,       │     │  Score, Skills,  │
  │   skills + 30%   │     │  Missing,        │     │  Suggestions     │
  │   TF-IDF)        │     │  Suggestions     │     │                  │
  └──────────────────┘     └──────────────────┘     └──────────────────┘
```

### Stage-by-Stage Breakdown

| Stage | Component | Description |
|-------|-----------|-------------|
| 1 | Resume Upload | User uploads a PDF resume via the React frontend |
| 2 | PDF Extraction | PyMuPDF extracts raw text from the uploaded PDF |
| 3 | Text Preprocessing | Lowercasing, punctuation removal, stopword removal, lemmatization |
| 4 | Skill Extraction | Regex and dictionary-based extraction of technical + soft skills |
| 5 | Skill Normalization | Maps synonyms (e.g. "ml" → "machine learning", "reactjs" → "react") |
| 6 | TF-IDF Vectorization | Converts text into numerical vectors using scikit-learn |
| 7 | Cosine Similarity | Measures angle between resume and JD vectors (0-100%) |
| 8 | Weighted Matching | Each skill has a weight; Python/ML/SQL get higher weights |
| 9 | Result Generation | Computes final score (30% TF-IDF + 70% skill match), identifies gaps |
| 10 | JSON Response | Returns structured data to the frontend |
| 11 | Dashboard Display | React renders score card, skill tags, suggestions, progress bar |

---

## Tech Stack

### Frontend
| Library | Purpose |
|---------|---------|
| React 18 | UI framework |
| React Router 6 | Client-side routing |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion 11 | Animations & transitions |
| Lucide React | Icon library |
| Axios | HTTP client |

### Backend
| Library | Purpose |
|---------|---------|
| Flask 3.0 | Web framework |
| Flask-CORS | Cross-origin requests |
| PyMuPDF | PDF text extraction |
| scikit-learn | TF-IDF + Cosine Similarity |
| NLTK | Text preprocessing |
| SQLite | User & analysis storage |

---

## Folder Structure

```
ai-resume-analyzer/
│
├── backend/
│   ├── app.py                  # Flask server with API & auth routes
│   ├── database.py             # SQLite database layer
│   ├── requirements.txt        # Python dependencies
│   ├── data/                   # SQLite database file (auto-created)
│   ├── uploads/                # Temporary PDF storage (gitignored)
│   └── utils/
│       ├── __init__.py
│       ├── pdf_extractor.py    # PDF text extraction
│       ├── preprocess.py       # Text cleaning & tokenization
│       ├── skill_matcher.py    # Skill dictionary, normalization, extraction
│       └── similarity.py       # TF-IDF, cosine similarity, scoring
│
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js            # React entry point with Router
│       ├── index.css           # Tailwind imports + global styles
│       ├── App.js              # Routes & provider setup
│       ├── contexts/
│       │   ├── AuthContext.js   # Authentication state
│       │   ├── ThemeContext.js  # Dark/light mode
│       │   └── ToastContext.js  # Toast notifications
│       ├── services/
│       │   └── api.js          # Axios API client
│       ├── components/
│       │   ├── Navbar.js       # Animated responsive navbar
│       │   ├── Footer.js       # Site footer with links
│       │   ├── ProtectedRoute.js # Auth guard component
│       │   ├── ResumeUpload.js # Drag-and-drop PDF upload
│       │   ├── JobDescription.js # Job description textarea
│       │   ├── AnalyzeButton.js # Analyze trigger button
│       │   ├── LoadingSpinner.js # Loading animation
│       │   ├── MatchResult.js  # Score card + progress bar
│       │   ├── SkillsSection.js # Matching/missing skill badges
│       │   ├── SuggestionsSection.js # Improvement suggestions
│       │   ├── SkillBar.js     # Animated skill progress bars
│       │   ├── ScanAnimation.js # AI scanning overlay
│       │   ├── Particles.js    # Floating background particles
│       │   ├── Confetti.js     # Celebration confetti effect
│       │   ├── AnimatedCounter.js # Animated number counter
│       │   ├── AnalyzerMascot.js # Fun mascot component
│       │   └── ErrorBoundary.js # Error boundary handler
│       └── pages/
│           ├── LandingPage.js      # Home page with hero & features
│           ├── LoginPage.js        # Sign in form
│           ├── SignupPage.js       # Registration form
│           ├── Dashboard.js        # Resume analysis tool
│           ├── AboutPage.js        # About & pipeline info
│           ├── ContactPage.js      # Contact form
│           ├── FAQPage.js          # Searchable FAQ accordion
│           ├── ProfilePage.js      # User profile settings
│           └── SavedAnalysesPage.js # Analysis history
│
├── .gitignore
└── README.md
```

---

## Installation & Setup

### Prerequisites

- **Python 3.10+** installed
- **Node.js 18+** installed
- **npm** (comes with Node.js)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Impana-N/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### Step 2: Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
# source venv/bin/activate

pip install -r requirements.txt
```

### Step 3: Frontend Setup

```bash
cd frontend
npm install
```

---

## Running the Project

You need **two terminals** — one for backend, one for frontend.

### Terminal 1 — Start Backend (Flask)

```bash
cd backend
venv\Scripts\activate   # or source venv/bin/activate
python app.py
```

The Flask server starts at `http://localhost:5000`. Verify with:

```bash
curl http://localhost:5000/api/health
# → {"status": "ok"}
```

### Terminal 2 — Start Frontend (React)

```bash
cd frontend
npm start
```

The React app opens at `http://localhost:3000`.

---

## Usage

1. Open `http://localhost:3000` in your browser
2. Browse the **Landing Page** for an overview
3. **Sign up** for an account or **Log in**
4. Navigate to **Analyze** from the navbar
5. Click the upload area and select your **resume PDF**
6. Paste the **job description** in the textarea
7. Click **"Analyze Resume"**
8. View your match score, matching/missing skills, project matches, and suggestions
9. **Save** your analysis for later reference
10. View your **Saved Analyses** and **Profile** from the navbar

---

## API Reference

### `POST /api/signup`
**Request:**
```json
{ "username": "john", "email": "john@example.com", "password": "secret123" }
```
**Response:** `{ "token": "...", "user": { "id": 1, "username": "john", "email": "john@example.com" } }`

### `POST /api/login`
**Request:**
```json
{ "email": "john@example.com", "password": "secret123" }
```
**Response:** `{ "token": "...", "user": { "id": 1, "username": "john", "email": "john@example.com" } }`

### `POST /api/analyze`
**Request** (multipart/form-data):
| Field | Type | Description |
|-------|------|-------------|
| `resume` | File | PDF file |
| `job_description` | String | Job description text |

**Response:**
```json
{
  "match_percentage": 88,
  "matching_skills": ["Python", "Machine Learning", "SQL"],
  "missing_skills": ["Docker", "AWS"],
  "matched_projects": ["Customer Churn Prediction using ML"],
  "soft_skills": ["Problem Solving", "Teamwork"],
  "suggestions": ["Consider learning Docker."]
}
```

### `GET /api/health`
Returns `{"status": "ok"}`

### `GET /api/analyses` (requires auth)
Returns saved analyses for the authenticated user.

### `GET /api/profile` (requires auth)
Returns the authenticated user's profile.

### `PUT /api/profile` (requires auth)
Updates the authenticated user's profile.

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `No module named 'nltk'` | nltk not installed | `pip install nltk` |
| `Could not extract text from PDF` | Scanned/image-based PDF | Use a text-based PDF |
| `Port 5000 already in use` | Another process on port 5000 | Kill the process or change port in `app.py` |
| `CORS error` | Backend not running | Ensure Flask is running on port 5000 |

---

## Future Improvements

- Add support for `.docx` and `.txt` resume formats
- Add **LLM-based analysis** (GPT/Claude) for deeper semantic matching
- Support **multiple resume comparison**
- Add **keyword frequency analysis** and **skill gap heatmap**
- Deploy backend to **Render / Railway / PythonAnywhere**
- Write **unit tests** for the analysis pipeline

---

## License

MIT License — free to use, modify, and distribute.

---

## Links

| Resource | URL |
|----------|-----|
| GitHub Repository | [https://github.com/Impana-N/ai-resume-analyzer](https://github.com/Impana-N/ai-resume-analyzer) |
| Live Demo (Vercel) | [https://ai-resume-analyzer-6fh6m5sf7-impana-ns-projects.vercel.app](https://ai-resume-analyzer-6fh6m5sf7-impana-ns-projects.vercel.app) |

Built with ❤️ using React, Flask, and scikit-learn.
