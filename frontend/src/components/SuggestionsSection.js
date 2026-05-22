import React from "react";

export default function SuggestionsSection({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-md font-semibold text-gray-800 mb-3">
        Suggestions
      </h3>
      <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
        {suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
