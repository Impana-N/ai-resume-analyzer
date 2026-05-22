import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-red-500/20 p-8 max-w-lg text-center">
            <span className="text-5xl">⚠️</span>
            <h2 className="text-xl font-bold text-white mt-4 mb-2">Something went wrong</h2>
            <p className="text-sm text-indigo-200/60 mb-4">
              An unexpected error occurred. Check the browser console (F12) for details.
            </p>
            <pre className="text-xs text-left bg-red-500/10 border border-red-500/20 p-3 rounded-xl overflow-auto max-h-32 text-red-300">
              {this.state.error?.message || "Unknown error"}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
