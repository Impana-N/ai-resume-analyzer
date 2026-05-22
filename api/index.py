import os
import re
import uuid
import json
import nltk
import fitz
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download("punkt", quiet=True)
nltk.download("punkt_tab", quiet=True)
nltk.download("stopwords", quiet=True)
nltk.download("wordnet", quiet=True)

app = Flask(__name__)
CORS(app)

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words("english"))

SKILL_NORMALIZATION = {
    "ml": "machine learning",
    "machine learning algorithms": "machine learning",
    "artificial intelligence": "ai",
    "problem solving abilities": "problem solving",
    "software engineering concepts": "software engineering",
    "telecom customer churn prediction": "customer churn prediction",
    "react.js": "react",
    "reactjs": "react",
    "python programming": "python",
    "sql databases": "sql",
    "html css": "html",
    "c programming": "c",
    "c++ programming": "c++",
    "cpp": "c++",
    "nlp": "natural language processing",
    "natural language processing": "nlp",
    "team collaboration": "teamwork",
    "time management skills": "time management",
    "leadership skills": "leadership",
    "project management skills": "project management",
    "communication skills": "communication",
}

TECHNICAL_SKILLS = [
    "python", "c", "c++", "java", "javascript", "typescript", "html", "css",
    "sql", "mysql", "postgresql",
    "react", "angular", "vue", "django", "flask", "nodejs", "express",
    "git", "docker", "kubernetes", "aws", "azure",
    "machine learning", "deep learning", "nlp", "natural language processing",
    "computer vision", "ai", "artificial intelligence", "data science",
    "data analysis", "data visualization", "pandas", "numpy", "scikit-learn",
    "tensorflow", "pytorch", "keras",
    "rest api", "api", "linux", "bash", "power bi", "tableau",
    "excel", "statistics", "probability",
    "oop", "data structures", "algorithms", "software engineering",
    "testing", "debugging", "agile", "scrum",
    "customer churn prediction", "predictive modeling", "regression",
    "classification", "clustering",
    "feature engineering", "model deployment",
    "streamlit", "gradio",
    "time series", "web scraping", "beautifulsoup", "selenium",
    "problem solving", "critical thinking", "communication", "teamwork",
    "leadership", "time management", "project management", "adaptability",
    "creativity", "collaboration", "analytical thinking", "attention to detail",
]

SOFT_SKILLS = [
    "problem solving", "critical thinking", "communication", "teamwork",
    "leadership", "time management", "project management", "adaptability",
    "creativity", "collaboration", "analytical thinking", "attention to detail",
    "presentation", "public speaking", "writing", "report writing",
    "decision making", "conflict resolution", "negotiation", "mentoring",
]

PROJECT_INDICATORS = [
    "project", "developed", "built", "created", "designed", "implemented",
    "engineered", "deployed", "launched", "delivered", "led", "managed",
    "system", "application", "platform", "tool", "pipeline", "framework",
    "model", "algorithm", "solution", "product", "feature", "module",
]

SKILL_WEIGHTS = {
    "python": 3.0, "machine learning": 3.0, "customer churn prediction": 3.0,
    "sql": 2.5, "artificial intelligence": 2.5, "ai": 2.5,
    "data science": 2.5, "deep learning": 2.5,
    "nlp": 2.0, "natural language processing": 2.0,
    "react": 2.0, "flask": 2.0, "django": 2.0,
    "scikit-learn": 2.0, "tensorflow": 2.0, "pytorch": 2.0,
    "git": 1.5, "docker": 1.5, "aws": 1.5,
    "pandas": 1.5, "numpy": 1.5,
    "statistics": 1.5, "problem solving": 1.5,
    "data analysis": 2.0, "data visualization": 1.5,
    "software engineering": 2.0,
    "c": 1.5, "c++": 1.5, "java": 1.5, "javascript": 1.5,
    "html": 1.0, "css": 1.0, "oop": 1.5, "data structures": 1.5, "algorithms": 1.5,
}

ACRONYMS = {"ai", "nlp", "sql", "api", "aws", "gcp", "ml", "oop", "html", "css"}


def format_skill(name):
    return " ".join(w.upper() if w.lower() in ACRONYMS else w.capitalize() for w in name.split())


def normalize_skill(skill):
    s = skill.lower().strip()
    return SKILL_NORMALIZATION.get(s, s)


def extract_skills(text):
    text_lower = text.lower()
    found = set()
    for skill in TECHNICAL_SKILLS:
        if skill in text_lower:
            found.add(skill)
    return list(found)


def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)
    tokens = word_tokenize(text)
    tokens = [t for t in tokens if t not in stop_words]
    tokens = [lemmatizer.lemmatize(t) for t in tokens]
    return " ".join(tokens)


def extract_text_from_pdf(pdf_path):
    text = ""
    doc = fitz.open(pdf_path)
    for page in doc:
        text += page.get_text()
    doc.close()
    return text.strip()


def get_skill_weight(skill):
    return SKILL_WEIGHTS.get(normalize_skill(skill), 1.0)


def analyze(resume_text, jd_text):
    cleaned_resume = clean_text(resume_text)
    cleaned_jd = clean_text(jd_text)

    documents = [cleaned_resume, cleaned_jd]
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(documents)
    tfidf_score = float(cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]) * 100

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    resume_normalized = set(normalize_skill(s) for s in resume_skills)
    jd_normalized = set(normalize_skill(s) for s in jd_skills)

    matching_skills = resume_normalized & jd_normalized
    missing_skills = jd_normalized - resume_normalized

    total_weight = sum(get_skill_weight(s) for s in jd_normalized) or 1
    match_weight = sum(get_skill_weight(s) for s in matching_skills)

    skill_score = (match_weight / total_weight) * 100
    final_score = round(0.3 * tfidf_score + 0.7 * skill_score, 2)
    final_score = min(max(final_score, 0), 100)

    projects = []
    lines = resume_text.split("\n")
    for line in lines:
        ls = line.strip()
        if len(ls) < 15:
            continue
        has_ind = any(ind in ls.lower() for ind in PROJECT_INDICATORS)
        if not has_ind:
            continue
        ll = ls.lower()
        for skill in matching_skills:
            if skill.lower() in ll:
                projects.append(ls)
                break

    soft = []
    text_lower = resume_text.lower()
    for skill in SOFT_SKILLS:
        if skill in text_lower:
            soft.append(format_skill(skill))

    suggestions = []
    for skill in missing_skills:
        suggestions.append(f"Consider learning or highlighting experience in {format_skill(skill)}.")
    if not suggestions:
        suggestions.append("Your resume is well-aligned with the job description. Keep up the good work!")

    return {
        "match_percentage": round(final_score),
        "matching_skills": [format_skill(s) for s in matching_skills],
        "missing_skills": [format_skill(s) for s in missing_skills],
        "matched_projects": projects[:10],
        "soft_skills": soft,
        "suggestions": suggestions,
    }


@app.route("/api/analyze", methods=["POST"])
def analyze_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No resume file uploaded"}), 400

    file = request.files["resume"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    job_description = request.form.get("job_description", "")
    if not job_description.strip():
        return jsonify({"error": "Job description is required"}), 400

    ext = file.filename.rsplit(".", 1)[-1].lower()
    if ext != "pdf":
        return jsonify({"error": "Only PDF files are supported"}), 400

    tmp_path = f"/tmp/{uuid.uuid4()}.pdf"
    file.save(tmp_path)

    try:
        resume_text = extract_text_from_pdf(tmp_path)
        if not resume_text:
            return jsonify({"error": "Could not extract text from PDF"}), 400
        result = analyze(resume_text, job_description)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})
