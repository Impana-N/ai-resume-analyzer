import os
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.pdf_extractor import extract_text_from_pdf
from utils.similarity import analyze

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/analyze", methods=["POST"])
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


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
