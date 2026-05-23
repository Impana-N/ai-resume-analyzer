import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeResume, saveAnalysis } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import ResumeUpload from "../components/ResumeUpload";
import JobDescription from "../components/JobDescription";
import AnalyzeButton from "../components/AnalyzeButton";
import LoadingSpinner from "../components/LoadingSpinner";
import MatchResult from "../components/MatchResult";
import ScanAnimation from "../components/ScanAnimation";
import Particles from "../components/Particles";
import { BarChart3, History, BookmarkPlus } from "lucide-react";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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

  const handleSave = async () => {
    if (!isAuthenticated) {
      addToast("Please login to save analyses", "warning");
      return;
    }
    setSaving(true);
    try {
      await saveAnalysis({
        match_percentage: result.match_percentage,
        matching_skills: result.matching_skills,
        missing_skills: result.missing_skills,
        job_description: jobDescription.substring(0, 200),
        filename: file?.name || "resume.pdf",
      });
      addToast("Analysis saved successfully!", "success");
    } catch {
      addToast("Failed to save analysis", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 relative pt-16">
      <Particles />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-gray-950" />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-black text-white flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-indigo-400" />
                Resume Analyzer
              </h1>
              <p className="text-sm text-gray-400 mt-1">Upload, analyze, and optimize your resume against any job description</p>
            </div>
            {result && (
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium hover:bg-indigo-500/30 transition-all disabled:opacity-50">
                {saving ? <div className="w-4 h-4 border-2 border-indigo-300/30 border-t-indigo-300 rounded-full animate-spin" /> : <BookmarkPlus className="w-4 h-4" />}
                {saving ? "Saving..." : "Save Analysis"}
              </button>
            )}
          </div>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 backdrop-blur-sm text-red-200 rounded-2xl px-6 py-4 text-sm flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            <span className="flex-1">{error}</span>
            <button onClick={() => setError("")} className="text-red-300 hover:text-red-100 text-lg leading-none hover:scale-110 transition-transform">&times;</button>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="grid md:grid-cols-2 gap-6">
            <ResumeUpload file={file} setFile={setFile} />
            <JobDescription value={jobDescription} onChange={setJobDescription} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-center">
          <AnalyzeButton onClick={handleAnalyze} disabled={loading} />
        </motion.div>

        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ScanAnimation />
              <LoadingSpinner />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <MatchResult result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
