import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, LogOut, User, BarChart3, Home, Info, FileText } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: Info },
  { to: "/analyze", label: "Analyze", icon: BarChart3 },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-xl" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white tracking-tight">AI Resume Analyzer</h1>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive(to)
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <Link to="/saved-analyses" className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive("/saved-analyses") ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/20" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}>
                  <FileText className="w-4 h-4" />
                  Saved
                </Link>
                <Link to="/profile" className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive("/profile") ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/20" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}>
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all" title="Toggle theme">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-gray-400">
                  <span className="text-indigo-400">{user?.username}</span>
                </span>
                <button onClick={logout} className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
                  Sign Up
                </Link>
              </div>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-white/5 bg-gray-900/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(to) ? "bg-indigo-500/20 text-indigo-300" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}>
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link to="/saved-analyses" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                    <FileText className="w-4 h-4" /> Saved Analyses
                  </Link>
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all w-full">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                    Login
                  </Link>
                  <Link to="/signup" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-indigo-300 hover:bg-indigo-500/10 transition-all">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
