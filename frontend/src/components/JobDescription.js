import React from "react";

export default function JobDescription({ value, onChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Job Description
      </h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        rows={8}
        className="w-full border border-gray-300 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
      />
    </div>
  );
}
