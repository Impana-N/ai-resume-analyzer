import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Cpu, BarChart3, Brain, Sparkles, GitBranch, Database, Code, Cloud, Heart, Users, Target, Quote } from "lucide-react";

const TEAM_MEMBERS = [
  { name: "AI Engine", role: "ML Core", desc: "TF-IDF + Cosine Similarity + Skill Matching", icon: Brain, color: "from-indigo-500 to-purple-600" },
  { name: "PDF Processor", role: "Text Extraction", desc: "PyMuPDF-based resume text extraction", icon: Database, color: "from-emerald-500 to-teal-600" },
  { name: "Frontend UI", role: "React Dashboard", desc: "Interactive results with Framer Motion", icon: Code, color: "from-blue-500 to-cyan-600" },
  { name: "API Layer", role: "Flask Backend", desc: "RESTful API with CORS and auth", icon: Cloud, color: "from-amber-500 to-orange-600" },
];

const TECHNOLOGIES = [
  { name: "React 18", category: "Frontend", color: "from-blue-500 to-cyan-500" },
  { name: "Tailwind CSS", category: "Frontend", color: "from-teal-500 to-emerald-500" },
  { name: "Framer Motion", category: "Frontend", color: "from-pink-500 to-rose-500" },
  { name: "Flask 3.0", category: "Backend", color: "from-gray-600 to-gray-400" },
  { name: "Python 3", category: "Backend", color: "from-yellow-500 to-amber-500" },
  { name: "scikit-learn", category: "ML", color: "from-blue-600 to-indigo-600" },
  { name: "PyMuPDF", category: "ML", color: "from-red-500 to-orange-500" },
  { name: "NLTK", category: "ML", color: "from-green-500 to-lime-500" },
  { name: "SQLite", category: "Storage", color: "from-purple-500 to-violet-500" },
  { name: "NumPy", category: "ML", color: "from-cyan-500 to-blue-500" },
];

const TIMELINE = [
  { year: "Phase 1", title: "Core Analysis Engine", desc: "Basic TF-IDF + cosine similarity with skill extraction" },
  { year: "Phase 2", title: "Weighted Matching", desc: "Added skill weights and normalization for better accuracy" },
  { year: "Phase 3", title: "Interactive Dashboard", desc: "Beautiful React UI with animations and charts" },
  { year: "Phase 4", title: "Authentication & Storage", desc: "User accounts, saved analyses, profile management" },
];

const PIPELINE_STEPS = [
  { icon: Cpu, title: "PDF Extraction", desc: "Extract raw text from uploaded PDF resumes using PyMuPDF" },
  { icon: Brain, title: "Text Preprocessing", desc: "Lowercase, remove punctuation/stopwords, lemmatize with NLTK" },
  { icon: GitBranch, title: "TF-IDF Vectorization", desc: "Convert preprocessed text into numerical feature vectors" },
  { icon: BarChart3, title: "Cosine Similarity", desc: "Measure the angle between resume and JD vectors (0-100%)" },
  { icon: Database, title: "Skill Extraction", desc: "Regex-based technical + soft skill detection with normalization" },
  { icon: Target, title: "Weighted Scoring", desc: "Compute final score: 30% TF-IDF + 70% Weighted Skill Match" },
];

function TechBadge({ tech: { name, category, color } }) {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -4 }} className={`bg-gradient-to-br ${color} p-[1px] rounded-xl cursor-default`}>
      <div className="bg-gray-900 rounded-xl px-4 py-3 h-full">
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{category}</p>
      </div>
    </motion.div>
  );
}

function TimelineItem({ item: { year, title, desc }, index }) {
  return (
    <motion.div initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}
      className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
        {year}
      </div>
      <div className="flex-1 pt-2">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </motion.div>
  );
}

function PipelineStep({ step: { icon: Icon, title, desc }, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
      className="flex gap-4 items-start group p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="text-base font-semibold text-white">{title}</h4>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-gray-950 pointer-events-none" />

      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">AI Resume Analyzer</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              An intelligent full-stack web application that analyzes resumes against job descriptions using
              TF-IDF vectorization, cosine similarity, and weighted skill matching.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              To democratize resume optimization using AI, making it easy for every job seeker to understand
              their skill gaps and improve their chances of landing interviews.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Accuracy", desc: "Weighted matching with 95%+ skill detection accuracy" },
              { icon: Heart, title: "Free & Open", desc: "100% free to use with open-source codebase" },
              { icon: Users, title: "Accessible", desc: "Designed for all job seekers, from students to professionals" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all">
                <Icon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              The <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">AI Pipeline</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">How your resume gets analyzed, step by step</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {PIPELINE_STEPS.map((s, i) => <PipelineStep key={i} step={s} index={i} />)}
          </div>
        </div>
      </section>

      <section className="relative py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Technologies <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Used</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {TECHNOLOGIES.map((t, i) => <TechBadge key={i} tech={t} />)}
          </div>
        </div>
      </section>

      <section className="relative py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Development <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Timeline</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent hidden md:block" />
            <div className="space-y-8">
              {TIMELINE.map((t, i) => <TimelineItem key={i} item={t} index={i} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              The <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-gray-400">Built with passion by developers and ML engineers</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM_MEMBERS.map(({ name, role, desc, icon: Icon, color }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all text-center group cursor-default">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${color} p-[1px]`}>
                  <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white">{name}</h3>
                <p className="text-xs text-indigo-400 font-medium mb-2">{role}</p>
                <p className="text-sm text-gray-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 border border-white/10 backdrop-blur-xl text-center">
            <Quote className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
            <p className="text-lg text-gray-200 italic mb-4">
              "The best time to optimize your resume was yesterday. The second best time is now."
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
