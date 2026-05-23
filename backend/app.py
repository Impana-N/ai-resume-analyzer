import os
import uuid
import json
from functools import wraps
from flask import Flask, request, jsonify, g
from flask_cors import CORS
from utils.pdf_extractor import extract_text_from_pdf
from utils.similarity import analyze
from database import init_db, create_user, authenticate_user, get_user_by_id, update_user, save_analysis, get_analyses

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "/tmp" if os.environ.get("VERCEL") else "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key-change-in-production")

init_db()


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get("Authorization", "")
        token = auth.replace("Bearer ", "") if auth.startswith("Bearer ") else None
        if not token:
            return jsonify({"error": "Authentication required"}), 401
        try:
            payload = json.loads(token)
            user_id = payload.get("user_id")
            if not user_id:
                return jsonify({"error": "Invalid token"}), 401
            user = get_user_by_id(user_id)
            if not user:
                return jsonify({"error": "User not found"}), 401
            g.current_user = user
        except Exception:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    if not username or len(username) < 2:
        return jsonify({"error": "Username must be at least 2 characters"}), 400
    if not email or "@" not in email:
        return jsonify({"error": "Valid email is required"}), 400
    if not password or len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400
    try:
        user = create_user(username, email, password)
        token = json.dumps({"user_id": user["id"]})
        return jsonify({"token": token, "user": {"id": user["id"], "username": user["username"], "email": user["email"]}}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 409


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    user = authenticate_user(email, password)
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401
    token = json.dumps({"user_id": user["id"]})
    return jsonify({"token": token, "user": {"id": user["id"], "username": user["username"], "email": user["email"]}})


@app.route("/api/profile", methods=["GET"])
@token_required
def profile():
    user = g.current_user
    return jsonify({"username": user["username"], "email": user["email"], "bio": user.get("bio", "")})


@app.route("/api/profile", methods=["PUT"])
@token_required
def update_profile():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    update_user(g.current_user["id"], data)
    return jsonify({"success": True})


@app.route("/api/save-analysis", methods=["POST"])
@token_required
def save_analysis_route():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    analysis_id = save_analysis(g.current_user["id"], data)
    return jsonify({"id": analysis_id, "success": True}), 201


@app.route("/api/analyses", methods=["GET"])
@token_required
def get_user_analyses():
    analyses = get_analyses(g.current_user["id"])
    return jsonify({"analyses": analyses})


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

    filename = f"{uuid.uuid4()}.pdf"
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    try:
        resume_text = extract_text_from_pdf(filepath)
        if not resume_text:
            return jsonify({"error": "Could not extract text from PDF"}), 400
        result = analyze(resume_text, job_description)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(filepath):
            os.remove(filepath)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
