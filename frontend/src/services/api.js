import axios from "axios";

const isVercel = window.location.hostname !== "localhost";
const API_BASE = isVercel ? "/api" : "http://localhost:5000";

export async function analyzeResume(file, jobDescription) {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("job_description", jobDescription);
  const response = await axios.post(`${API_BASE}/analyze`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
