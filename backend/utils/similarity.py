from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
from .skill_matcher import extract_skills, normalize_skill, get_skill_weight, word_boundary_pattern, SOFT_SKILLS, PROJECT_INDICATORS
from .preprocess import clean_text


def format_skill_name(name):
    acronyms = {"ai", "nlp", "sql", "api", "aws", "gcp", "ml", "oop", "html", "css"}
    words = name.split()
    formatted = []
    for w in words:
        if w.lower() in acronyms:
            formatted.append(w.upper())
        else:
            formatted.append(w.capitalize())
    return " ".join(formatted)


def compute_tfidf_similarity(resume_text, jd_text):
    cleaned_resume = clean_text(resume_text)
    cleaned_jd = clean_text(jd_text)
    documents = [cleaned_resume, cleaned_jd]
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(documents)
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    return float(similarity[0][0]) * 100


def weighted_skill_match(resume_text, jd_text):
    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    resume_normalized = set(normalize_skill(s) for s in resume_skills)
    jd_normalized = set(normalize_skill(s) for s in jd_skills)

    matching_skills = resume_normalized & jd_normalized
    missing_skills = jd_normalized - resume_normalized

    total_weight = sum(get_skill_weight(s) for s in jd_normalized) or 1
    match_weight = sum(get_skill_weight(s) for s in matching_skills)

    skill_score = (match_weight / total_weight) * 100
    return skill_score, list(matching_skills), list(missing_skills)


def compute_final_score(tfidf_score, skill_score):
    return round(0.3 * tfidf_score + 0.7 * skill_score, 2)


def find_matched_projects(resume_text, skills):
    projects = []
    lines = resume_text.split("\n")
    for line in lines:
        line_stripped = line.strip()
        if len(line_stripped) < 15:
            continue
        has_indicator = any(ind in line_stripped.lower() for ind in PROJECT_INDICATORS)
        if not has_indicator:
            continue
        line_lower = line_stripped.lower()
        for skill in skills:
            pattern = word_boundary_pattern(skill)
            if re.search(pattern, line_lower):
                projects.append(line_stripped)
                break
    return projects[:10]


def extract_soft_skills_from_text(resume_text):
    text_lower = resume_text.lower()
    found = []
    for skill in SOFT_SKILLS:
        pattern = word_boundary_pattern(skill)
        if re.search(pattern, text_lower):
            found.append(format_skill_name(skill))
    return found


def generate_suggestions(missing_skills):
    suggestions = []
    for skill in missing_skills:
        suggestions.append(f"Consider learning or highlighting experience in {format_skill_name(skill)}.")
    if not suggestions:
        suggestions.append("Your resume is well-aligned with the job description. Keep up the good work!")
    return suggestions


def analyze(resume_text, jd_text):
    tfidf_score = compute_tfidf_similarity(resume_text, jd_text)
    skill_score, matching_skills, missing_skills = weighted_skill_match(resume_text, jd_text)
    final_score = compute_final_score(tfidf_score, skill_score)
    final_score = min(max(final_score, 0), 100)

    matched_projects = find_matched_projects(resume_text, matching_skills)
    soft_skills_found = extract_soft_skills_from_text(resume_text)
    suggestions = generate_suggestions(missing_skills)

    return {
        "match_percentage": round(final_score),
        "matching_skills": [format_skill_name(s) for s in matching_skills],
        "missing_skills": [format_skill_name(s) for s in missing_skills],
        "matched_projects": matched_projects,
        "soft_skills": soft_skills_found,
        "suggestions": suggestions,
    }
