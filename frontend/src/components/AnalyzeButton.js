import React from "react";

export default function AnalyzeButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group relative px-10 py-4 rounded-2xl font-semibold text-base text-white transition-all duration-300 
        disabled:opacity-50 disabled:cursor-not-allowed
        bg-gradient-to-r from-indigo-600 to-purple-600 
        hover:from-indigo-500 hover:to-purple-500 
        hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]
        disabled:shadow-none
        active:scale-[0.98]"
    >
      <span className="relative z-10 flex items-center gap-2">
        {disabled ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Analyze Resume
          </>
        )}
      </span>
    </button>
  );
}
