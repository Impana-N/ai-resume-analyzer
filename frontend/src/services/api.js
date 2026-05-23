import axios from "axios";

const isVercel = window.location.hostname !== "localhost";
const API_BASE = isVercel ? "/_/backend" : "http://localhost:5000";

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function analyzeResume(file, jobDescription) {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("job_description", jobDescription);
  const response = await api.post("/api/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function signupUser(username, email, password) {
  const response = await api.post("/api/signup", { username, email, password });
  return response.data;
}

export async function loginUser(email, password) {
  const response = await api.post("/api/login", { email, password });
  return response.data;
}

export async function saveAnalysis(data) {
  const response = await api.post("/api/save-analysis", data);
  return response.data;
}

export async function getUserAnalyses() {
  const response = await api.get("/api/analyses");
  return response.data;
}

export async function getUserProfile() {
  const response = await api.get("/api/profile");
  return response.data;
}

export async function updateUserProfile(data) {
  const response = await api.put("/api/profile", data);
  return response.data;
}

export default api;
