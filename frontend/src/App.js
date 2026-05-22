import React, { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import JobDescription from "./components/JobDescription";
import AnalyzeButton from "./components/AnalyzeButton";
import LoadingSpinner from "./components/LoadingSpinner";
import MatchResult from "./components/MatchResult";
import { analyzeResume } from "./services/api";

export default function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!file) { setError("Please upload a resume PDF."); return; }
    if (!jobDescription.trim()) { setError("Please enter a job description."); return; }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeResume(file, jobDescription);
      setResult(data);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      <header className="relative border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📄</span>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                AI Resume Analyzer
              </h1>
              <p className="text-sm text-indigo-200/70">
                Upload your resume and paste a job description for an instant AI-powered match analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-6 py-10 space-y-8">
        {error && (
          <div className="animate-slide-up bg-red-500/10 border border-red-500/20 backdrop-blur-sm text-red-200 rounded-2xl px-6 py-4 text-sm flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
            <button onClick={() => setError("")} className="ml-auto text-red-300 hover:text-red-100 text-lg leading-none">&times;</button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <ResumeUpload file={file} setFile={setFile} />
          <JobDescription value={jobDescription} onChange={setJobDescription} />
        </div>

        <div className="flex justify-center">
          <AnalyzeButton onClick={handleAnalyze} disabled={loading} />
        </div>

        {loading && <LoadingSpinner />}

        {result && (
          <div className="animate-fade-in">
            <MatchResult result={result} />
          </div>
        )}
      </main>

      <footer className="relative border-t border-white/5 text-center text-indigo-300/40 text-xs py-6">
        AI Resume Analyzer &mdash; Built with React + Flask + scikit-learn
      </footer>
    </div>
  );
}
