import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center py-12 animate-fade-in">
      <div className="relative">
        <div className="w-16 h-16 border-[3px] border-indigo-500/20 rounded-full" />
        <div className="absolute inset-0 w-16 h-16 border-[3px] border-transparent border-t-indigo-400 rounded-full animate-spin" />
        <div className="absolute inset-0 w-16 h-16 border-[3px] border-transparent border-b-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
      <div className="mt-6 space-y-1 text-center">
        <p className="text-indigo-200 font-medium">Analyzing your resume</p>
        <p className="text-indigo-300/50 text-xs">Extracting text, matching skills, computing similarity...</p>
      </div>
    </div>
  );
}
