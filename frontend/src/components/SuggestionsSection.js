import React from "react";

export default function SuggestionsSection({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Suggestions
      </h3>
      <ul className="space-y-2">
        {suggestions.map((s, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-indigo-200/70 animate-slide-up"
            style={{ animationDelay: `${i * 50}ms` }}>
            <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-amber-400 text-xs">{i + 1}</span>
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
