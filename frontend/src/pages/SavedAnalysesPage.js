import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getUserAnalyses } from "../services/api";
import { BarChart3, FileText, Calendar, Clock, ChevronDown, ChevronUp, Trash2, Loader } from "lucide-react";

export default function SavedAnalysesPage() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserAnalyses();
        setAnalyses(data.analyses || []);
      } catch {
        setAnalyses([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 pt-16 flex items-center justify-center">
        <Loader className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-gray-950 pointer-events-none" />

      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <BarChart3 className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Saved Analyses</h1>
            <p className="text-gray-400">Your resume analysis history</p>
          </motion.div>

          {analyses.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No saved analyses yet</h3>
              <p className="text-sm text-gray-400">Analyze a resume and save it to see it here.</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {analyses.map((a, i) => (
                <motion.div key={a.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
                  <button onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                        a.match_percentage >= 80 ? "bg-emerald-500/20 text-emerald-300" :
                        a.match_percentage >= 65 ? "bg-amber-500/20 text-amber-300" :
                        "bg-red-500/20 text-red-300"
                      }`}>
                        {a.match_percentage}%
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{a.filename || "Resume"}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          <span>{a.created_at || "Recently"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 hidden sm:inline">
                        {a.matching_skills?.length || 0} skills matched
                      </span>
                      {expanded === i ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  </button>

                  {expanded === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5 px-5 py-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Matching Skills</p>
                          <div className="flex flex-wrap gap-1.5">
                            {a.matching_skills?.map((s, j) => (
                              <span key={j} className="px-2 py-1 rounded-lg text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Missing Skills</p>
                          <div className="flex flex-wrap gap-1.5">
                            {a.missing_skills?.map((s, j) => (
                              <span key={j} className="px-2 py-1 rounded-lg text-xs bg-red-500/10 text-red-300 border border-red-500/20">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {a.job_description && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">Job Description</p>
                          <p className="text-xs text-gray-500 bg-white/[0.02] rounded-lg p-2">{a.job_description}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
