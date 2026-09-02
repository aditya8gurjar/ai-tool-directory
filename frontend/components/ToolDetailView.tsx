"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tool } from "@/lib/mockData";
import { fetchAlternatives } from "@/lib/api";
import Link from "next/link";

export default function ToolDetailView({ tool }: { tool: Tool }) {
  const [alts, setAlts] = useState<Tool[]>([]);
  const [loadingAlts, setLoadingAlts] = useState(false);

    const handleFindAlts = async () => {
    setLoadingAlts(true);
    try {
      const data = await fetchAlternatives(tool.slug);
      setAlts(data);
    } catch (error) {
      console.error("Failed to find alternatives:", error);
    } finally {
      setLoadingAlts(false);
    }
  };
  // Only show the button if the tool is not Free
  const showButton = tool.pricing === "Paid" || tool.pricing === "Freemium";

  return (
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

      {/* Find Cheaper Alternatives Button */}
      {showButton && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <button 
            onClick={handleFindAlts}
            disabled={loadingAlts}
            className="w-full bg-gray-800 text-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors border border-white/10 disabled:opacity-50"
          >
            {loadingAlts ? "Finding Alternatives..." : "💡 Find Cheaper Alternatives"}
          </button>
        </div>
      )}

      {/* Display Alternatives */}
      {alts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Cheaper Alternatives:</h3>
          <div className="space-y-4">
            {alts.map((alt, i) => (
              <motion.div
                key={alt.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between bg-gray-950/50 p-4 rounded-lg border border-white/5"
              >
                <div>
                  <Link href={`/tools/${alt.slug}`} className="text-indigo-400 hover:text-indigo-300 font-medium">
                    {alt.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">{alt.description}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                  alt.pricing === "Free" ? "bg-green-500/20 text-green-300" :
                  "bg-blue-500/20 text-blue-300"
                }`}>
                  {alt.pricing}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {alts.length === 0 && !loadingAlts && showButton && (
        <p className="text-gray-500 text-sm mt-4 text-center hidden"></p>
      )}
    </motion.div>
  );
}