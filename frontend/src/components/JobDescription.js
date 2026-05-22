import React from "react";

export default function JobDescription({ value, onChange }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 hover:border-indigo-400/30 transition-all duration-300">
      <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Job Description
      </h2>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the full job description here..."
          rows={8}
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 resize-y transition-all duration-300"
        />
        <div className="absolute bottom-3 right-3 text-xs text-indigo-300/30">
          {value.length} chars
        </div>
      </div>
    </div>
  );
}
