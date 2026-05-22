import React from "react";

export default function SkillsSection({ title, skills, color }) {
  if (!skills || skills.length === 0) return null;
  const bg = color === "green" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-md font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium ${bg}`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
