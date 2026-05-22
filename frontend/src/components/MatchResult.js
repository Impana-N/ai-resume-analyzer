import React from "react";
import SkillsSection from "./SkillsSection";
import SuggestionsSection from "./SuggestionsSection";

function CircularScore({ score }) {
  const r = 60;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#34d399" : score >= 60 ? "#fbbf24" : "#f87171";
  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={circumference}
          strokeDashoffset={circumference} strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ strokeDashoffset: offset }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold tracking-tight" style={{ color }}>
          {score}%
        </span>
        <span className="text-xs text-white/40 mt-0.5 font-medium">
          {score >= 80 ? "Strong Match" : score >= 60 ? "Moderate" : "Low Match"}
        </span>
      </div>
    </div>
  );
}

export default function MatchResult({ result }) {
  const { match_percentage, matching_skills, missing_skills, matched_projects, soft_skills, suggestions } = result;

  const badge = match_percentage >= 80
    ? { text: "Your resume is well-aligned with this role!", color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20" }
    : match_percentage >= 60
    ? { text: "Moderate match — consider filling the gaps below.", color: "text-amber-300 bg-amber-500/10 border-amber-500/20" }
    : { text: "Low match — review the suggestions below to improve.", color: "text-red-300 bg-red-500/10 border-red-500/20" };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 text-center animate-slide-up">
        <h2 className="text-lg font-semibold text-white/70 mb-6">Resume Match Score</h2>
        <CircularScore score={match_percentage} />
        <div className={`mt-5 inline-flex px-4 py-2 rounded-xl text-xs font-medium border ${badge.color}`}>
          {badge.text}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SkillsSection title="Matching Skills" skills={matching_skills} color="green" />
        <SkillsSection title="Missing Skills" skills={missing_skills} color="red" />
      </div>

      {matched_projects && matched_projects.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 animate-slide-up">
          <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Matched Projects & Experience
          </h3>
          <div className="space-y-2">
            {matched_projects.map((p, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-indigo-200/70 bg-white/[0.02] rounded-xl p-3 border border-white/5">
                <span className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-400 text-xs font-bold">
                  {i + 1}
                </span>
                {p}
              </div>
            ))}
          </div>
        </div>
      )}

      {soft_skills && soft_skills.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 animate-slide-up">
          <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Soft Skills Detected
          </h3>
          <div className="flex flex-wrap gap-2">
            {soft_skills.map((s, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <SuggestionsSection suggestions={suggestions} />
    </div>
  );
}
