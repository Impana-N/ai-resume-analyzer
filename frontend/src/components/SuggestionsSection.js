import React, { useState } from "react";

export default function SuggestionsSection({ suggestions }) {
  const [expanded, setExpanded] = useState({});

  if (!suggestions || suggestions.length === 0) return null;

  const toggle = (i) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 hover:border-amber-400/30 transition-all duration-300">
      <h3 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
        <span>💡</span>
        Suggestions
        <span className="ml-2 text-xs text-white/30 font-normal">({suggestions.length})</span>
      </h3>
      <div className="space-y-2">
        {suggestions.map((s, i) => (
          <div key={i}
            className="group rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-200
              hover:bg-white/[0.05] hover:border-amber-500/20 cursor-pointer"
            onClick={() => toggle(i)}
          >
            <div className="flex items-start gap-3 p-3.5">
              <span className="mt-0.5 w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0
                group-hover:bg-amber-500/30 transition-colors">
                <span className="text-amber-400 text-xs font-bold">{i + 1}</span>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-indigo-200/70 group-hover:text-indigo-200/90 transition-colors">
                  {s}
                </p>
                <div className={`overflow-hidden transition-all duration-300 ${expanded[i] ? "max-h-20 mt-2" : "max-h-0"}`}>
                  <p className="text-xs text-indigo-300/40 p-3 rounded-lg bg-white/5">
                    {suggestions.length > 1
                      ? "Tip: Focus on high-weight skills first — they impact your match score the most."
                      : "Great job! Your resume covers all the key skills requested."}
                  </p>
                </div>
              </div>
              <span className={`text-indigo-400/50 text-xs transition-transform duration-200 ${expanded[i] ? "rotate-180" : ""}`}>
                ▽
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
