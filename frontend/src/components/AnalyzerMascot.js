import React from "react";

const FACES = {
  analyzing: ["◉_◉", "◉‿◉", "◉⌂◉", "◉△◉"],
  happy: ["✧_✧", "✧‿✧", "★▽★", "☆▽☆"],
  neutral: ["◡_◡", "◡‿◡", "◡△◡", "◡□◡"],
};

export default function AnalyzerMascot({ mood = "neutral", size = "md" }) {
  const faces = FACES[mood] || FACES.neutral;
  const face = faces[Math.floor(Math.random() * faces.length)];
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" };

  return (
    <div className={`${sizes[size]} select-none animate-bounce-gentle inline-block`}
      title={`Mood: ${mood}`}>
      [ {face} ]
    </div>
  );
}
