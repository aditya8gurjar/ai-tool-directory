"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Tool } from "@/lib/mockData";
import ToolCard from "@/components/ToolCard";
import { semanticSearch } from "@/lib/api";

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  
  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Auto-search when component mounts or query changes
  useEffect(() => {
    if (queryParam) {
      handleSearch(queryParam);
    }
  }, [queryParam]);

  const handleSearch = async (searchQuery: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setHasSearched(true);
    
    try {
      const data = await semanticSearch(q);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white mb-6">
        Semantic Search
      </motion.h1>
      
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }} className="flex flex-col sm:flex-row gap-3 mb-10 max-w-2xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe what you want to do..."
          className="flex-grow px-5 py-4 bg-gray-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white placeholder-gray-500"
        />
        <button type="submit" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-500 transition-colors whitespace-nowrap shadow-lg shadow-indigo-600/30 disabled:opacity-50" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {hasSearched && (
        <p className="text-gray-400 mb-4">
          {loading ? "Finding the best tools..." : `Found ${results.length} results`}
        </p>
      )}
      
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      )}

      {hasSearched && !loading && results.length === 0 && (
        <div className="text-center text-gray-500 py-16 border-2 border-dashed border-white/10 rounded-2xl">
          <p>No tools found for your query. Try a different description.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400 py-20">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}