import React, { useRef, useState } from "react";

export default function ResumeUpload({ file, setFile }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
    } else {
      setFile(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  return (
    <div className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 hover:border-indigo-400/30 transition-all duration-300">
      <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5 5 5M12 3v12" />
        </svg>
        Upload Resume
      </h2>
      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative overflow-hidden rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
          dragging
            ? "border-indigo-400 bg-indigo-500/10 scale-[1.02]"
            : file
            ? "border-emerald-400/50 bg-emerald-500/5"
            : "border-white/20 bg-white/5 hover:border-indigo-400/50 hover:bg-indigo-500/5"
        }`}
      >
        {file ? (
          <div className="animate-slide-up">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-emerald-300 font-medium text-sm truncate max-w-[200px] mx-auto">{file.name}</p>
            <p className="text-indigo-300/60 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB</p>
            <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="mt-3 px-4 py-1.5 text-xs rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition">
              Remove
            </button>
          </div>
        ) : (
          <div>
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-all">
              <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-indigo-200/80 text-sm font-medium">Click or drag to upload</p>
            <p className="text-indigo-300/40 text-xs mt-1">PDF format only</p>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={handleChange} />
    </div>
  );
}
