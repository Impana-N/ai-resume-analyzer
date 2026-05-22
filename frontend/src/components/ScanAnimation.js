import React from "react";

export default function ScanAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <style>{`
        @keyframes scan {
          0% { top: -5%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 105%; opacity: 0; }
        }
        @keyframes scanPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.3), 0 0 60px rgba(99,102,241,0.1); }
          50% { box-shadow: 0 0 40px rgba(99,102,241,0.6), 0 0 80px rgba(99,102,241,0.2); }
        }
      `}</style>
      <div className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
        style={{
          animation: `scan 2.5s ease-in-out infinite, scanPulse 1s ease-in-out infinite`,
        }}
      />
    </div>
  );
}
