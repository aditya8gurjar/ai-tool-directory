"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { Tool } from "@/lib/mockData";
import Link from "next/link";
import { fetchToolBySlug } from "@/lib/api";

export default function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    fetchToolBySlug(slug).then(data => {
      if (!data) {
        notFound();
      }
      setTool(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [slug]);

  if (loading || !tool) {
    return <div className="text-center text-gray-400 py-20">Loading tool...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-lg"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3">{tool.name}</h1>
            <span className="text-xs font-medium text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              {tool.category}
            </span>
          </div>
          <span className={`px-3 py-1 text-sm rounded-full ${
            tool.pricing === "Free" ? "bg-green-500/20 text-green-300" :
            tool.pricing === "Freemium" ? "bg-blue-500/20 text-blue-300" :
            "bg-purple-500/20 text-purple-300"
          }`}>
            {tool.pricing}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-gray-300 mb-2">Description</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">{tool.description}</p>

        <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-6">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium text-green-400">{tool.status}</p>
          </div>
          <a 
            href={tool.website_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30"
          >
            Visit Official Website
          </a>
        </div>
      </motion.div>
      
      <div className="mt-8 text-center">
        <Link href="/tools" className="text-indigo-400 hover:text-indigo-300 font-medium">
          ← Back to All Tools
        </Link>
      </div>
    </div>
  );
}