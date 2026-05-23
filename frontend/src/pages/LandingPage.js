import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, BarChart3, Upload, Brain, Shield, Zap, Award, CheckCircle, ChevronDown, FileText, Cpu, TrendingUp } from "lucide-react";
import Particles from "../components/Particles";

const FEATURES = [
  { icon: Upload, title: "Upload Resume", desc: "Drag-and-drop PDF upload with instant parsing", color: "from-blue-500 to-cyan-500" },
  { icon: Brain, title: "AI Analysis", desc: "TF-IDF + Cosine Similarity + Skill Matching", color: "from-purple-500 to-pink-500" },
  { icon: BarChart3, title: "Match Score", desc: "Weighted scoring with detailed skill breakdown", color: "from-emerald-500 to-teal-500" },
  { icon: Zap, title: "Smart Suggestions", desc: "Actionable insights to improve your resume", color: "from-amber-500 to-orange-500" },
  { icon: Shield, title: "Secure & Private", desc: "Your data is processed securely and deleted", color: "from-indigo-500 to-violet-500" },
  { icon: Award, title: "Career Growth", desc: "Land more interviews with tailored resumes", color: "from-rose-500 to-pink-500" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Upload Resume", desc: "Drag & drop your PDF resume or click to browse", icon: Upload },
  { step: "02", title: "Paste Job Description", desc: "Copy-paste the job posting you're targeting", icon: FileText },
  { step: "03", title: "AI Analysis", desc: "Our ML engine extracts skills and computes match scores", icon: Cpu },
  { step: "04", title: "Get Results", desc: "View your match score, gaps, and improvement tips", icon: TrendingUp },
];

const STATS = [
  { value: "95%", label: "Accuracy Rate" },
  { value: "500+", label: "Skills Detected" },
  { value: "< 5s", label: "Analysis Time" },
  { value: "100%", label: "Free to Use" },
];

function FloatingElement({ children, className, delay = 0, duration = 6 }) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ y: [-20, 20, -20] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function TypewriterText({ texts }) {
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    if (char < texts[idx].length) {
      const t = setTimeout(() => setChar((c) => c + 1), 50);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setIdx((i) => (i + 1) % texts.length);
      setChar(0);
    }, 2000);
    return () => clearTimeout(t);
  }, [char, idx, texts]);

  return <span>{texts[idx].slice(0, char)}<span className="animate-pulse">|</span></span>;
}

function FeatureCard({ feature: { icon: Icon, title, desc, color }, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} p-[1px] mb-4`}>
        <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function StepsCard({ step: { step, title, desc, icon: Icon }, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="flex gap-4 items-start group"
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
        {step}
      </div>
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-3 mb-1">
          <Icon className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
      <Particles />

      <FloatingElement className="absolute top-20 left-10 w-20 h-20 rounded-full bg-indigo-500/10 blur-xl" delay={0} />
      <FloatingElement className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-xl" delay={2} />
      <FloatingElement className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-emerald-500/10 blur-xl" delay={1} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Powered by AI & Machine Learning</span>
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          Analyze Your Resume
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Against Any Job</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          <TypewriterText texts={["Upload your resume, paste a job description, and get instant AI-powered match analysis with skill gaps and improvement suggestions."]} />
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/analyze" className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.5)] transition-all duration-300 flex items-center gap-2">
            Start Analyzing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/about" className="px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all duration-300">
            Learn More
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white">{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-12">
          <ChevronDown className="w-6 h-6 text-gray-500 mx-auto animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Powerful <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Everything you need to optimize your resume and land more interviews</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => <FeatureCard key={i} feature={f} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            How It <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Four simple steps to get your resume analyzed</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent hidden md:block" />
          <div className="space-y-12">
            {HOW_IT_WORKS.map((s, i) => <StepsCard key={i} step={s} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPreviewSection() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Built with <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Precision</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Our AI pipeline uses state-of-the-art ML techniques</p>
        </motion.div>

        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">The AI Pipeline</h3>
              <div className="space-y-4">
                {[
                  "PDF Text Extraction via PyMuPDF",
                  "Text Cleaning & NLP Preprocessing",
                  "TF-IDF Vectorization with scikit-learn",
                  "Cosine Similarity Computation",
                  "Weighted Skill Matching (70% skills + 30% TF-IDF)",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium">
                Learn more about our technology <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center p-8">
                <div className="text-center">
                  <Cpu className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                  <div className="text-sm text-gray-400">ML Engine Active</div>
                  <div className="flex gap-1 justify-center mt-2">
                    {[0,1,2,3].map(i => (
                      <motion.div key={i} className="w-2 h-2 rounded-full bg-indigo-400" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 backdrop-blur-xl">
            <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Optimize Your Resume?</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">Get instant AI-powered analysis and improve your match rate for any job application.</p>
            <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.5)] transition-all duration-300 group">
              Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-xs text-gray-500 mt-4">No credit card required. Free forever.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Get In <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Have questions or feedback? We'd love to hear from you.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all duration-300">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AboutPreviewSection />
      <CTASection />
      <ContactSection />
    </div>
  );
}
