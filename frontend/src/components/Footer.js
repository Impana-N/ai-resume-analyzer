import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Heart, FileText } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t dark:border-white/10 border-gray-200 dark:bg-gray-900/50 bg-white/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold dark:text-white text-gray-900">AI Resume Analyzer</span>
            </Link>
            <p className="text-sm dark:text-gray-400 text-gray-500 leading-relaxed">
              Intelligent resume analysis powered by AI and machine learning.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Analyze Resume", to: "/analyze" },
                { label: "About Us", to: "/about" },
                { label: "FAQ", to: "/faq" },
                { label: "Contact", to: "/contact" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-sm dark:text-gray-400 text-gray-500 hover:text-indigo-500 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-4">Account</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-sm dark:text-gray-400 text-gray-500 hover:text-indigo-500 transition-colors">Login</Link></li>
              <li><Link to="/signup" className="text-sm dark:text-gray-400 text-gray-500 hover:text-indigo-500 transition-colors">Sign Up</Link></li>
              <li><Link to="/profile" className="text-sm dark:text-gray-400 text-gray-500 hover:text-indigo-500 transition-colors">Profile</Link></li>
              <li><Link to="/saved-analyses" className="text-sm dark:text-gray-400 text-gray-500 hover:text-indigo-500 transition-colors">Saved Analyses</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-4">Tech Stack</h3>
            <ul className="space-y-2">
              <li className="text-sm dark:text-gray-400 text-gray-500">React 18 + Tailwind CSS</li>
              <li className="text-sm dark:text-gray-400 text-gray-500">Flask 3.0 + Python</li>
              <li className="text-sm dark:text-gray-400 text-gray-500">scikit-learn (TF-IDF)</li>
              <li className="text-sm dark:text-gray-400 text-gray-500">Framer Motion</li>
              <li className="text-sm dark:text-gray-400 text-gray-500">SQLite Storage</li>
            </ul>
          </div>
        </div>

        <div className="border-t dark:border-white/5 border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs dark:text-gray-500 text-gray-400 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> using React + Flask + scikit-learn &copy; {year}
          </p>
          <div className="flex items-center gap-3">
            <a href="https://github.com/Impana-N/ai-resume-analyzer" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 dark:hover:bg-white/5 hover:bg-gray-100 transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 dark:hover:bg-white/5 hover:bg-gray-100 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:contact@resumeanalyzer.ai" className="p-2 rounded-lg dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 dark:hover:bg-white/5 hover:bg-gray-100 transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
