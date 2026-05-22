import React, { useState } from "react";
import SkillsSection from "./SkillsSection";
import SuggestionsSection from "./SuggestionsSection";
import Confetti from "./Confetti";
import AnimatedCounter from "./AnimatedCounter";
import SkillBar from "./SkillBar";

const SCORE_META = [
  { min: 90, emoji: "🌟", label: "Outstanding Match!", msg: "Your resume is a perfect fit for this role!", color: "#34d399" },
  { min: 80, emoji: "🚀", label: "Strong Match!", msg: "Your resume aligns very well with this position.", color: "#34d399" },
  { min: 65, emoji: "📈", label: "Good Match", msg: "You have most of the required skills. Minor gaps to fill.", color: "#fbbf24" },
  { min: 50, emoji: "🔨", label: "Fair Match", msg: "Some key skills are missing. Review suggestions below.", color: "#fb923c" },
  { min: 0, emoji: "📚", label: "Needs Improvement", msg: "Consider building skills in the missing areas.", color: "#f87171" },
];

function CircularScore({ score }) {
  const r = 60;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const meta = SCORE_META.find((m) => score >= m.min) || SCORE_META[SCORE_META.length - 1];

  return (
    <div className="relative w-44 h-44 mx-auto group cursor-pointer">
      <svg className="w-full h-full -rotate-90 drop-shadow-lg" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={meta.color} strokeWidth="8"
          strokeDasharray={circumference} strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ strokeDashoffset: offset }}
        />
        <circle cx="70" cy="70" r={r} fill="none" stroke={meta.color} strokeWidth="8"
          strokeDasharray={circumference} strokeLinecap="round" opacity="0.2"
          className="transition-all duration-1000 ease-out"
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <span className="text-2xl mb-1">{meta.emoji}</span>
        <span className="text-4xl font-black tracking-tight" style={{ color: meta.color }}>
          <AnimatedCounter target={score} />
        </span>
        <span className="text-[10px] text-white/50 font-medium mt-0.5 uppercase tracking-wider">
          {meta.label}
        </span>
      </div>
      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-indigo-300 text-xs">ⓘ</span>
      </div>
    </div>
  );
}

function ScoreBadge({ score }) {
  const meta = SCORE_META.find((m) => score >= m.min) || SCORE_META[SCORE_META.length - 1];
  return (
    <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium border backdrop-blur-sm
      ${score >= 80 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" :
        score >= 65 ? "bg-amber-500/10 border-amber-500/20 text-amber-300" :
        "bg-red-500/10 border-red-500/20 text-red-300"}`}>
      <span className="text-lg">{meta.emoji}</span>
      <span>{meta.msg}</span>
    </div>
  );
}

export default function MatchResult({ result }) {
  const [showSkillBars, setShowSkillBars] = useState(false);
  const { match_percentage, matching_skills, missing_skills, matched_projects, soft_skills, suggestions } = result;
  const showConfetti = match_percentage >= 75;

  return (
    <>
      <Confetti active={showConfetti} />

      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 text-center animate-slide-up
          hover:border-emerald-400/30 hover:shadow-[0_0_40px_-10px_rgba(52,211,153,0.15)] transition-all duration-500">
          <h2 className="text-lg font-semibold text-white/70 mb-6 flex items-center justify-center gap-2">
            Resume Match Score
            {showConfetti && <span className="animate-bounce-gentle">🎉</span>}
          </h2>
          <CircularScore score={match_percentage} />
          <div className="mt-6 animate-fade-in">
            <ScoreBadge score={match_percentage} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6
            hover:border-emerald-400/30 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(52,211,153,0.1)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-semibold text-white flex items-center gap-2">
                <span>✅</span> Matching Skills
                <span className="ml-2 text-xs text-white/30 font-normal">({matching_skills?.length || 0})</span>
              </h3>
              <button onClick={() => setShowSkillBars(!showSkillBars)}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                {showSkillBars ? "Hide bars" : "Show bars"}
              </button>
            </div>
            {showSkillBars ? (
              <div className="space-y-3">
                {matching_skills?.map((s, i) => <SkillBar key={i} skill={s} matched={true} />)}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {matching_skills?.map((s, i) => (
                  <span key={i}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20
                      hover:bg-emerald-500/20 hover:scale-105 transition-all duration-200 cursor-default animate-fade-in"
                    style={{ animationDelay: `${i * 30}ms` }}>
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6
            hover:border-red-400/30 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(248,113,113,0.1)]">
            <h3 className="text-md font-semibold text-white flex items-center gap-2 mb-4">
              <span>❌</span> Missing Skills
              <span className="ml-2 text-xs text-white/30 font-normal">({missing_skills?.length || 0})</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {missing_skills?.map((s, i) => (
                <span key={i}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/20
                    hover:bg-red-500/20 hover:scale-105 transition-all duration-200 cursor-default animate-fade-in"
                  style={{ animationDelay: `${i * 30}ms` }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {matched_projects && matched_projects.length > 0 && (
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 animate-slide-up
            hover:border-purple-400/30 transition-all duration-300">
            <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
              <span>🏆</span> Matched Projects & Experience
            </h3>
            <div className="grid gap-2">
              {matched_projects.map((p, i) => (
                <div key={i}
                  className="flex items-start gap-3 text-sm text-indigo-200/70 bg-white/[0.02] rounded-xl p-3 border border-white/5
                    hover:bg-white/[0.05] hover:border-purple-500/20 transition-all duration-200">
                  <span className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-400 text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="pt-1">{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {soft_skills && soft_skills.length > 0 && (
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 animate-slide-up
            hover:border-blue-400/30 transition-all duration-300">
            <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
              <span>💪</span> Soft Skills Detected
            </h3>
            <div className="flex flex-wrap gap-2">
              {soft_skills.map((s, i) => (
                <span key={i}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20
                    hover:bg-blue-500/20 hover:scale-105 transition-all duration-200 cursor-default animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <SuggestionsSection suggestions={suggestions} />
      </div>
    </>
  );
}
