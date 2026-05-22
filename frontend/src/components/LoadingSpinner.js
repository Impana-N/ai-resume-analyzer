import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      <p className="text-sm text-gray-500 mt-3">Analyzing your resume...</p>
    </div>
  );
}
