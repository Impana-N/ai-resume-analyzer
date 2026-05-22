import re

SKILL_NORMALIZATION = {
    "ml": "machine learning",
    "machine learning algorithms": "machine learning",
    "artificial intelligence": "ai",
    "problem solving abilities": "problem solving",
    "software engineering concepts": "software engineering",
    "telecom customer churn prediction": "customer churn prediction",
    "react.js": "react",
    "reactjs": "react",
    "node.js": "nodejs",
    "express.js": "express",
    "python programming": "python",
    "sql databases": "sql",
    "html css": "html",
    "c programming": "c",
    "c++ programming": "c++",
    "cpp": "c++",
    "data science": "data science",
    "deep learning": "deep learning",
    "natural language processing": "nlp",
    "nlp": "natural language processing",
    "team collaboration": "teamwork",
    "time management skills": "time management",
    "leadership skills": "leadership",
    "project management skills": "project management",
    "communication skills": "communication",
    "critical thinking": "critical thinking",
    "data analysis": "data analysis",
    "data visualization": "data visualization",
}

TECHNICAL_SKILLS = [
    "python", "c", "c++", "java", "javascript", "typescript", "html", "css",
    "sql", "mysql", "postgresql", "mongodb", "redis",
    "react", "angular", "vue", "django", "flask", "spring", "nodejs", "express",
    "git", "docker", "kubernetes", "aws", "azure", "gcp",
    "machine learning", "deep learning", "nlp", "natural language processing",
    "computer vision", "ai", "artificial intelligence", "data science",
    "data analysis", "data visualization", "pandas", "numpy", "scikit-learn",
    "tensorflow", "pytorch", "keras", "opencv",
    "rest api", "graphql", "api", "linux", "bash", "power bi", "tableau",
    "excel", "statistics", "probability", "linear algebra", "calculus",
    "oop", "data structures", "algorithms", "software engineering",
    "testing", "debugging", "agile", "scrum", "jira",
    "matplotlib", "seaborn", "plotly", "scipy",
    "customer churn prediction", "predictive modeling", "regression",
    "classification", "clustering", "dimensionality reduction",
    "feature engineering", "feature selection", "model deployment",
    "flask", "fastapi", "streamlit", "gradio",
    "hadoop", "spark", "airflow", "mlops",
    "genetic algorithms", "reinforcement learning", "time series",
    "web scraping", "beautifulsoup", "selenium",
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
    "python": 3.0,
    "machine learning": 3.0,
    "sql": 2.5,
    "artificial intelligence": 2.5,
    "ai": 2.5,
    "customer churn prediction": 3.0,
    "data science": 2.5,
    "deep learning": 2.5,
    "nlp": 2.0,
    "natural language processing": 2.0,
    "react": 2.0,
    "flask": 2.0,
    "django": 2.0,
    "git": 1.5,
    "docker": 1.5,
    "aws": 1.5,
    "pandas": 1.5,
    "numpy": 1.5,
    "scikit-learn": 2.0,
    "tensorflow": 2.0,
    "pytorch": 2.0,
    "statistics": 1.5,
    "problem solving": 1.5,
    "data analysis": 2.0,
    "data visualization": 1.5,
    "software engineering": 2.0,
    "c": 1.5,
    "c++": 1.5,
    "java": 1.5,
    "javascript": 1.5,
    "html": 1.0,
    "css": 1.0,
    "oop": 1.5,
    "data structures": 1.5,
    "algorithms": 1.5,
}


def normalize_skill(skill):
    skill_lower = skill.lower().strip()
    if skill_lower in SKILL_NORMALIZATION:
        return SKILL_NORMALIZATION[skill_lower]
    return skill_lower


def word_boundary_pattern(skill):
    escaped = re.escape(skill)
    parts = escaped.split(r"\ ")
    if len(parts) == 1:
        return r"\b" + parts[0] + r"\b"
    return r"\b" + r"\s+".join(parts) + r"\b"


def extract_skills(text):
    text_lower = text.lower()
    found_skills = set()

    for skill in TECHNICAL_SKILLS:
        pattern = word_boundary_pattern(skill)
        if re.search(pattern, text_lower):
            found_skills.add(skill)

    for skill in SOFT_SKILLS:
        pattern = word_boundary_pattern(skill)
        if re.search(pattern, text_lower):
            found_skills.add(skill)

    return list(found_skills)


def extract_projects(text):
    lines = text.split("\n")
    projects = []
    current = []
    for line in lines:
        line_stripped = line.strip()
        has_indicator = any(ind in line_stripped.lower() for ind in PROJECT_INDICATORS)
        if has_indicator and len(line_stripped) > 10:
            current.append(line_stripped)
        elif current and line_stripped == "":
            if current:
                projects.append(" ".join(current))
                current = []
        else:
            if current:
                current.append(line_stripped)
    if current:
        projects.append(" ".join(current))
    return projects[:10]


def get_normalized_skills(skills):
    normalized = set()
    for s in skills:
        normalized.add(normalize_skill(s))
    return list(normalized)


def get_skill_weight(skill):
    skill_norm = normalize_skill(skill)
    return SKILL_WEIGHTS.get(skill_norm, 1.0)
