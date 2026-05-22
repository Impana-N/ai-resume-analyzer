import React from "react";

const styles = {
  green: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
  red: "bg-red-500/10 text-red-300 border border-red-500/20",
  blue: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
};

const icons = {
  green: "✓",
  red: "✗",
  blue: "◆",
};

export default function SkillsSection({ title, skills, color }) {
  if (!skills || skills.length === 0) return null;
  const style = styles[color] || styles.blue;
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
        {color === "green" ? (
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {title}
        <span className="ml-auto text-xs text-white/30 font-normal">({skills.length})</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <span key={i} className={`px-3 py-1.5 rounded-xl text-xs font-medium ${style} animate-fade-in`}
            style={{ animationDelay: `${i * 30}ms` }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
