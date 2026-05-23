import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-slide-up px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-xl text-sm font-medium flex items-center gap-3 cursor-pointer ${
              t.type === "success" ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-200" :
              t.type === "error" ? "bg-red-500/20 border-red-500/30 text-red-200" :
              t.type === "warning" ? "bg-amber-500/20 border-amber-500/30 text-amber-200" :
              "bg-indigo-500/20 border-indigo-500/30 text-indigo-200"
            }`}
            onClick={() => removeToast(t.id)}
          >
            <span className="text-lg">
              {t.type === "success" ? "✓" : t.type === "error" ? "✕" : t.type === "warning" ? "⚠" : "ℹ"}
            </span>
            <span className="flex-1">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
