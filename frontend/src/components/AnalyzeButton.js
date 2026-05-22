import React from "react";

export default function AnalyzeButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold px-10 py-3.5 rounded-xl shadow-md transition text-base"
    >
      {disabled ? "Analyzing..." : "Analyze Resume"}
    </button>
  );
}
