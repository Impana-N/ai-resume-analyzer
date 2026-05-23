import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { getUserProfile, updateUserProfile } from "../services/api";
import { User, Mail, Calendar, Save, Loader } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [profile, setProfile] = useState({ username: "", email: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch {
        setProfile({ username: user?.username || "", email: user?.email || "", bio: "" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile(profile);
      addToast("Profile updated!", "success");
    } catch {
      addToast("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 pt-16 flex items-center justify-center">
        <Loader className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-gray-950 pointer-events-none" />

      <section className="relative py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">My Profile</h1>
              <p className="text-sm text-gray-400 mt-1">Manage your account settings</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="text" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Bio</label>
                <textarea rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-y"
                  placeholder="Tell us a bit about yourself..." />
              </div>

              <button onClick={handleSave} disabled={saving}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50">
                {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
