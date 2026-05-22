import React, { useEffect, useState } from "react";

const COLORS = ["#34d399", "#60a5fa", "#f472b6", "#fbbf24", "#a78bfa", "#fb923c", "#38bdf8", "#4ade80"];
const SHAPES = ["■", "●", "▲", "★", "♦", "♥", "◆", "⬟"];

export default function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!active) { setPieces([]); return; }
    const items = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 3,
      size: 10 + Math.random() * 20,
      rotate: Math.random() * 1080,
    }));
    setPieces(items);
    const timer = setTimeout(() => setPieces([]), 5000);
    return () => clearTimeout(timer);
  }, [active]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg) scale(0.2); opacity: 0; }
        }
        @keyframes confettiSway {
          0%, 100% { margin-left: 0; }
          50% { margin-left: 30px; }
        }
      `}</style>
      {pieces.map((p) => (
        <div key={p.id} className="absolute" style={{
          left: `${p.x}%`,
          top: "-20px",
          color: p.color,
          fontSize: `${p.size}px`,
          animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
          transform: `rotate(${p.rotate}deg)`,
        }}>
          {p.shape}
        </div>
      ))}
    </div>
  );
}
