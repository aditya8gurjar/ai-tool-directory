"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { mockTools, categories } from "@/lib/mockData";
import ToolCard from "@/components/ToolCard";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <section className="relative max-w-4xl mx-auto px-4 py-32 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Discover AI tools for <br /> <span className="text-gradient">any task</span>
          </h1>
        </motion.div>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          Stop scrolling through endless lists. Describe what you want to accomplish and let our AI-powered semantic search find the perfect tools for you.
        </motion.p>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., I need to turn a script into a video..."
            className="flex-grow px-5 py-4 bg-gray-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white placeholder-gray-500"
          />
          <button type="submit" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-500 transition-colors whitespace-nowrap shadow-lg shadow-indigo-600/30 hover:scale-105 transition-transform text-center">
            Search with AI
          </button>
        </form>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} whileHover={{ scale: 1.03 }}>
            <Link href="/tools" className="block bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/50 hover:shadow-indigo-500/20 hover:shadow-lg transition-all duration-300 h-full">
              <h3 className="text-2xl font-bold text-white mb-2">All Tools</h3>
              <p className="text-gray-400">Browse our entire directory of AI applications.</p>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.03 }}>
            <Link href="/categories" className="block bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:shadow-purple-500/20 hover:shadow-lg transition-all duration-300 h-full">
              <h3 className="text-2xl font-bold text-white mb-2">Categories</h3>
              <p className="text-gray-400">Find tools grouped by specific tasks like video or coding.</p>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} whileHover={{ scale: 1.03 }}>
            <Link href="/workflows" className="block bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-pink-500/50 hover:shadow-pink-500/20 hover:shadow-lg transition-all duration-300 h-full">
              <h3 className="text-2xl font-bold text-white mb-2">Workflows</h3>
              <p className="text-gray-400">Generate step-by-step AI workflows for large projects.</p>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-6">Popular Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat, i) => (
            <Link key={cat} href={`/tools?category=${encodeURIComponent(cat)}`}>
              <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-gray-900/50 border border-white/10 px-5 py-2 rounded-full text-sm text-gray-300 hover:bg-indigo-600/20 hover:text-white cursor-pointer transition-colors block">
                {cat}
              </motion.span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}