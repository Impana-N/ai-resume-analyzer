import React from "react";
import SkillsSection from "./SkillsSection";
import SuggestionsSection from "./SuggestionsSection";

function getScoreColor(score) {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
}

function getBarColor(score) {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
}

export default function MatchResult({ result }) {
  const { match_percentage, matching_skills, missing_skills, matched_projects, soft_skills, suggestions } = result;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Resume Match Score
        </h2>
        <p className={`text-6xl font-extrabold ${getScoreColor(match_percentage)}`}>
          {match_percentage}%
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-4 max-w-sm mx-auto">
          <div
            className={`h-4 rounded-full transition-all duration-700 ${getBarColor(match_percentage)}`}
            style={{ width: `${match_percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {match_percentage >= 80
            ? "Strong match! Your resume aligns well with this role."
            : match_percentage >= 60
            ? "Moderate match. Consider filling the gaps below."
            : "Low match. Review suggestions below to improve."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SkillsSection title="Matching Skills" skills={matching_skills} color="green" />
        <SkillsSection title="Missing Skills" skills={missing_skills} color="red" />
      </div>

      {matched_projects && matched_projects.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-md font-semibold text-gray-800 mb-3">
            Matched Projects & Experience
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            {matched_projects.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {soft_skills && soft_skills.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-md font-semibold text-gray-800 mb-3">
            Soft Skills Detected
          </h3>
          <div className="flex flex-wrap gap-2">
            {soft_skills.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <SuggestionsSection suggestions={suggestions} />
    </div>
  );
}
