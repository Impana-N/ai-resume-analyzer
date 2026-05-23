import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";

const FAQS = [
  { q: "How does the AI analysis work?", a: "Our ML pipeline uses TF-IDF vectorization to convert resume and job description text into numerical vectors, then computes cosine similarity between them. Simultaneously, we extract and normalize skills using a comprehensive dictionary and perform weighted skill matching. The final score is 30% TF-IDF similarity + 70% weighted skill match." },
  { q: "What file formats are supported?", a: "Currently, we support PDF files only. We use PyMuPDF (fitz) to extract text from the PDF. Make sure your PDF is text-based (not scanned images). We plan to add DOCX and TXT support in future updates." },
  { q: "Is my data secure?", a: "Yes! Your uploaded resume PDF is processed on the server and immediately deleted after analysis. We never store your full resume content. If you create an account, we only store anonymized analysis results (match score, skill lists) that you explicitly choose to save." },
  { q: "Is this service free?", a: "Absolutely! AI Resume Analyzer is 100% free to use with no limits on the number of analyses. We believe in democratizing career tools for everyone." },
  { q: "How accurate is the match score?", a: "The match score is based on a weighted algorithm combining TF-IDF semantic similarity (30%) and direct skill matching (70%). It's designed to give a realistic assessment of how well your resume aligns with a job description, but should be used as a guide rather than an absolute measure." },
  { q: "Do I need to create an account?", a: "No, you can analyze resumes without an account. However, creating a free account lets you save your analysis history, track your progress, and access your past results from any device." },
  { q: "What skills are detected?", a: "Our system detects 50+ technical skills (Python, React, SQL, ML, Docker, etc.) and 20+ soft skills (problem solving, communication, leadership, etc.) with smart synonym normalization (e.g., 'reactjs' → 'react', 'ml' → 'machine learning')." },
  { q: "How is the score calculated?", a: "Final Score = 30% × TF-IDF Cosine Similarity + 70% × Weighted Skill Match. Each skill has a weight (e.g., Python = 3.0, HTML = 1.0). Missing high-weight skills impact your score more than missing low-weight ones." },
  { q: "Can I save my analysis results?", a: "Yes! If you create an account, you can save your analysis results and revisit them later from your profile dashboard. This helps you track improvement over time." },
  { q: "How can I improve my match score?", a: "Focus on acquiring skills that appear in the 'Missing Skills' section, especially high-weight ones. Tailor your resume to include relevant keywords from the job description, and highlight projects that demonstrate the required skills." },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = FAQS.filter((f) =>
    f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 pt-16">
      <section className="relative py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <HelpCircle className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto mb-6">Everything you need to know about AI Resume Analyzer</p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="Search questions..." />
            </div>
          </motion.div>

          <div className="space-y-2">
            {filtered.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all">
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left">
                  <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div className="px-4 pb-4">
                        <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No matching questions found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
