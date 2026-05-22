# AI Resume Analyzer

An intelligent full-stack web application that analyzes resumes against job descriptions using **TF-IDF vectorization**, **cosine similarity**, and **weighted skill matching**. Built with React + Flask + scikit-learn.

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![Flask](https://img.shields.io/badge/Flask-3.0-green)
![React](https://img.shields.io/badge/React-18-61DAFB)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.6-orange)

---

## Features

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
- Displays results in a beautiful **React dashboard** with score, progress bar, and skill tags

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
| 3 | Text Preprocessing | Lowercasing, punctuation removal, stopword removal, tokenization, lemmatization |
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
| Tailwind CSS (CDN) | Utility-first styling |
| Axios | HTTP client for API calls |

### Backend
| Library | Purpose |
|---------|---------|
| Flask 3.0 | Web framework |
| Flask-CORS | Cross-origin requests |
| PyMuPDF | PDF text extraction |
| scikit-learn | TF-IDF + Cosine Similarity |
| nltk | Text preprocessing (tokenization, stopwords, lemmatization) |
| NumPy | Numerical operations |
| Pandas | Data handling |

---

## Folder Structure

```
resume-analyzer/
│
├── backend/
│   ├── app.py                  # Flask server & API endpoint
│   ├── requirements.txt        # Python dependencies
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
│   ├── public/
│   │   └── index.html          # HTML entry with Tailwind CDN
│   └── src/
│       ├── index.js            # React entry point
│       ├── App.js              # Main app component
│       ├── services/
│       │   └── api.js          # Axios API client
│       └── components/
│           ├── ResumeUpload.js       # Drag-and-drop PDF upload
│           ├── JobDescription.js     # Job description textarea
│           ├── AnalyzeButton.js      # Analyze trigger button
│           ├── LoadingSpinner.js     # Loading animation
│           ├── MatchResult.js        # Score card + progress bar
│           ├── SkillsSection.js      # Matching/missing skill badges
│           └── SuggestionsSection.js # Improvement suggestions
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
git clone https://github.com/yourusername/ai-resume-analyzer.git
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
curl http://localhost:5000/health
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
2. Click the upload area and select your **resume PDF**
3. Paste the **job description** in the textarea
4. Click **"Analyze Resume"**
5. View your match score, matching/missing skills, project matches, and suggestions

---

## API Reference

### `POST /analyze`

**Request** (multipart/form-data):
| Field | Type | Description |
|-------|------|-------------|
| `resume` | File | PDF file (max ~10MB) |
| `job_description` | String | Job description text |

**Response** (JSON):
```json
{
  "match_percentage": 88,
  "matching_skills": ["Python", "Machine Learning", "SQL", "C++", "Html"],
  "missing_skills": ["Docker", "AWS"],
  "matched_projects": [
    "Customer Churn Prediction using Machine Learning",
    "AI-based Resume Analyzer"
  ],
  "soft_skills": ["Problem Solving", "Teamwork", "Leadership"],
  "suggestions": [
    "Consider learning or highlighting experience in Docker.",
    "Consider learning or highlighting experience in AWS."
  ]
}
```

### `GET /health`

Returns `{"status": "ok"}` to verify the server is running.

---

## Skill Normalization Logic

The system uses a smart synonym dictionary so that semantically similar skills are treated as matches:

| Resume Text | Normalized To | Matches JD? |
|-------------|---------------|-------------|
| "Machine Learning Algorithms" | "machine learning" | Yes |
| "Artificial Intelligence" | "ai" | Yes |
| "Problem Solving Abilities" | "problem solving" | Yes |
| "Software Engineering Concepts" | "software engineering" | Yes |
| "Customer Churn Prediction" | "customer churn prediction" | Yes |
| "React.js" / "ReactJS" | "react" | Yes |

### Weighted Skills

Higher weights are assigned to high-demand skills, giving them more impact on the match score:

| Skill | Weight |
|-------|--------|
| Python | 3.0 |
| Machine Learning | 3.0 |
| Customer Churn Prediction | 3.0 |
| SQL | 2.5 |
| AI / Artificial Intelligence | 2.5 |
| Data Science | 2.5 |
| Deep Learning | 2.5 |
| React / Flask / Django / Scikit-learn | 2.0 |
| NLP | 2.0 |
| C / C++ / Java / JavaScript / Git | 1.5 |
| HTML / CSS | 1.0 |

> **Final Score = 30% × TF‑IDF Cosine Similarity + 70% × Weighted Skill Match**

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `No module named 'nltk'` | nltk not installed | `pip install nltk` |
| `ModuleNotFoundError: No module named 'fitzy'` | PyMuPDF not installed | `pip install PyMuPDF` |
| `Could not extract text from PDF` | Scanned/image-based PDF | Use a text-based PDF (not scanned) |
| `Port 5000 already in use` | Another process on port 5000 | Kill the process or change port in `app.py` |
| `react-scripts: command not found` | npm packages not installed | Run `npm install` in frontend/ |
| `CORS error` | Backend not running | Ensure Flask is running on port 5000 |

---

## Sample Output Screenshots

```
┌─────────────────────────────────────────────────────┐
│                AI Resume Analyzer                    │
│                                                     │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │  Upload Resume    │  │  Job Description         │ │
│  │  [resume.pdf]     │  │  ┌──────────────────┐   │ │
│  │  ┌──────────┐     │  │  │ We are looking   │   │ │
│  │  │ Click to │     │  │  │ for a skilled ML │   │ │
│  │  │ upload   │     │  │  │ engineer...      │   │ │
│  │  └──────────┘     │  │  └──────────────────┘   │ │
│  └──────────────────┘  └──────────────────────────┘ │
│                                                     │
│              [ Analyze Resume ]                      │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │         Resume Match Score                   │   │
│  │                 88%                          │   │
│  │  ████████████████████████████░░░░░░░░░░░░    │   │
│  │  Strong match!                               │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐                 │
│  │ Matching Skls│  │ Missing Skls │                 │
│  │ Python SQL   │  │ Docker AWS   │                 │
│  │ ML React     │  │              │                 │
│  └──────────────┘  └──────────────┘                 │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │ Matched Projects & Experience                │   │
│  │ • Customer Churn Prediction using ML         │   │
│  │ • AI-based Resume Analyzer project           │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │ Suggestions                                  │   │
│  │ • Consider learning Docker.                  │   │
│  │ • Consider learning AWS.                     │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## Future Improvements

- Add support for **`.docx` and `.txt`** resume formats
- Add **LLM-based analysis** (GPT/Claude) for deeper semantic matching
- Support **multiple resume comparison**
- Add **keyword frequency analysis** and **skill gap heatmap**
- Build a **resume score history** using local storage
- Deploy backend to **Render / Railway / PythonAnywhere**
- Deploy frontend to **Vercel / Netlify**
- Add **dark mode** toggle
- Write **unit tests** for the analysis pipeline

---

## License

MIT License — free to use, modify, and distribute.

---

## Links

| Resource | URL |
|----------|-----|
| GitHub Repository | [https://github.com/Impana-N/ai-resume-analyzer](https://github.com/Impana-N/ai-resume-analyzer) |
| Live Demo (Vercel) | [https://ai-resume-analyzer.vercel.app](https://ai-resume-analyzer.vercel.app) |

Built with ❤️ using React, Flask, and scikit-learn.
