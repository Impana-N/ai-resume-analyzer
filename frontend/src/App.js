import React, { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import JobDescription from "./components/JobDescription";
import AnalyzeButton from "./components/AnalyzeButton";
import LoadingSpinner from "./components/LoadingSpinner";
import MatchResult from "./components/MatchResult";
import Particles from "./components/Particles";
import ScanAnimation from "./components/ScanAnimation";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative">
      <Particles />

      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg shadow-lg animate-bounce-gentle">
              📄
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
                AI Resume Analyzer
              </h1>
              <p className="text-xs text-indigo-300/50">
                Upload &rarr; Analyze &rarr; Match &rarr; Improve
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10 space-y-8">
        {error && (
          <div className="animate-slide-up bg-red-500/10 border border-red-500/20 backdrop-blur-sm text-red-200 rounded-2xl px-6 py-4 text-sm flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            <span className="flex-1">{error}</span>
            <button onClick={() => setError("")} className="text-red-300 hover:text-red-100 text-lg leading-none hover:scale-110 transition-transform">&times;</button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <ResumeUpload file={file} setFile={setFile} />
          <JobDescription value={jobDescription} onChange={setJobDescription} />
        </div>

        <div className="flex justify-center">
          <AnalyzeButton onClick={handleAnalyze} disabled={loading} />
        </div>

        {loading && <><ScanAnimation /><LoadingSpinner /></>}

        {result && (
          <div className="animate-fade-in">
            <MatchResult result={result} />
          </div>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/5 text-center text-indigo-300/30 text-xs py-6">
        <span className="hover:text-indigo-300/50 transition-colors">
          Made with <span className="text-red-400 animate-pulse">♥</span> using React + Flask + scikit-learn
        </span>
      </footer>
    </div>
  );
}
