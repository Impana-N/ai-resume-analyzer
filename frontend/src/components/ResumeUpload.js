import React, { useRef } from "react";

export default function ResumeUpload({ file, setFile }) {
  const inputRef = useRef();

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
    } else {
      setFile(null);
      alert("Please select a PDF file.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Upload Resume
      </h2>
      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:bg-indigo-50 transition"
      >
        {file ? (
          <div>
            <p className="text-indigo-700 font-medium text-sm">
              {file.name}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {(file.size / 1024).toFixed(1)} KB
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="mt-3 text-xs text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <svg
              className="w-10 h-10 mx-auto text-indigo-400 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v12m0 0l-3-3m3 3l3-3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              />
            </svg>
            <p className="text-sm text-gray-500">
              Click to upload a <strong>PDF</strong> resume
            </p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
