import React, { useState, useEffect } from "react";

const PHRASES = [
  "Scanning resume...",
  "Extracting text from PDF...",
  "Analyzing skills...",
  "Computing similarity...",
  "Matching keywords...",
  "Calculating score...",
  "Almost there...",
];

export default function LoadingSpinner() {
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center py-16 animate-fade-in">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-[3px] animate-spin">
          <div className="w-full h-full rounded-full bg-slate-900" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🔍</span>
        </div>
      </div>

      <div className="h-8 flex items-center">
        <span className="text-indigo-200 font-medium text-sm animate-fade-in" key={phraseIdx}>
          {PHRASES[phraseIdx]}
        </span>
      </div>

      <div className="flex gap-1.5 mt-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-indigo-400"
            style={{ animation: `bounceGentle 1.4s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>

      <div className="mt-8 w-64 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400"
          style={{
            animation: "scanProgress 2.5s ease-in-out infinite",
            width: "40%",
          }}
        />
      </div>

      <style>{`
        @keyframes scanProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}
