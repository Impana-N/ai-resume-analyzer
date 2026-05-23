import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "../contexts/ToastContext";
import { Send, Mail, MapPin, Github, Linkedin, MessageSquare, Heart, FileText } from "lucide-react";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "contact@resumeanalyzer.ai", href: "mailto:contact@resumeanalyzer.ai" },
  { icon: Github, label: "GitHub", value: "Impana-N/ai-resume-analyzer", href: "https://github.com/Impana-N/ai-resume-analyzer" },
  { icon: MapPin, label: "Location", value: "Remote / Global", href: null },
  { icon: MessageSquare, label: "Response Time", value: "Within 24 hours", href: null },
];

export default function ContactPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      addToast("Message sent! We'll get back to you soon.", "success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-16">
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <MessageSquare className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Get In <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto">Have questions, feedback, or want to contribute? We'd love to hear from you.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{label}</p>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:text-indigo-400 transition-colors">{value}</a>
                      ) : (
                        <p className="text-sm text-white">{value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 border border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                  We reply to every message within 24 hours
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Subject</label>
                  <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-y"
                    placeholder="Tell us more about your inquiry..." />
                </div>
                <button type="submit" disabled={sending}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50">
                  {sending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
