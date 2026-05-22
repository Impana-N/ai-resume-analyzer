import React, { useState } from "react";

const EMOJIS = {
  python: "🐍", sql: "🗄️", react: "⚛️", javascript: "🟨", typescript: "🟦",
  html: "🌐", css: "🎨", docker: "🐳", git: "🔀", aws: "☁️",
  "machine learning": "🤖", "deep learning": "🧠", nlp: "💬", "data science": "📊",
  tensorflow: "🧩", pytorch: "🔥", flask: "🌶️", django: "🎸",
  "problem solving": "🧩", teamwork: "🤝", leadership: "👑",
  communication: "💬", creativity: "🎨", "time management": "⏰",
};

export default function SkillBar({ skill, matched = true }) {
  const [hovered, setHovered] = useState(false);
  const emoji = Object.entries(EMOJIS).find(([k]) => skill.toLowerCase().includes(k))?.[1] || "💡";
  const width = matched ? 85 + Math.random() * 15 : 20 + Math.random() * 30;

  return (
    <div className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-sm">{emoji}</span>
        <span className="text-xs text-indigo-200/80 font-medium flex-1 truncate">{skill}</span>
        <span className={`text-xs font-bold ${matched ? "text-emerald-400" : "text-red-400"}`}>
          {matched ? `${Math.round(width)}%` : "Missing"}
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${
          matched
            ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
            : "bg-gradient-to-r from-red-500/50 to-red-400/30"
        }`}
          style={{ width: hovered ? "100%" : `${matched ? width : 5}%` }}
        />
      </div>
    </div>
  );
}
