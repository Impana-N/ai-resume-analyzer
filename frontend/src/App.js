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
    if (!file) {
      setError("Please upload a resume PDF.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeResume(file, jobDescription);
      setResult(data);
    } catch (err) {
      const msg =
        err.response?.data?.error || err.message || "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
            AI Resume Analyzer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload your resume and paste a job description to get an instant AI-powered match analysis.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-3 text-sm">
            {error}
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

        {result && <MatchResult result={result} />}
      </main>

      <footer className="text-center text-gray-400 text-xs py-6 border-t border-gray-100">
        AI Resume Analyzer &mdash; Built with React + Flask + scikit-learn
      </footer>
    </div>
  );
}
