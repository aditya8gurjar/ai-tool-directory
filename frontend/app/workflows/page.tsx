"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { generateWorkflow } from "@/lib/api";
import Link from "next/link";

interface WorkflowStep {
  step: string;
  tool_name: string;
  tool_slug: string;
  website_url: string;
  category: string;
}

export default function WorkflowsPage() {
  const [goal, setGoal] = useState("");
  const [workflow, setWorkflow] = useState<WorkflowStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setLoading(true);
    setError("");
    setWorkflow([]);

    try {
      const data = await generateWorkflow(goal);
      setWorkflow(data.workflow);
    } catch (err) {
      setError("Failed to generate workflow. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-4xl font-bold text-white mb-2"
      >
        AI Workflow Generator
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }}
        className="text-gray-400 mb-8"
      >
        Enter a large goal, and our AI will break it down into steps and recommend tools for each step.
      </motion.p>
      
      <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-2">What is your goal?</label>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., Create a professional YouTube video about AI"
          className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white placeholder-gray-600 mb-4"
          rows={4}
        />
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating Workflow..." : "Generate Workflow"}
        </button>
      </div>

      {error && (
        <div className="text-red-400 text-center py-4 border border-red-500/20 bg-red-500/10 rounded-lg mb-8">
          {error}
        </div>
      )}

      {/* Display the Workflow Steps */}
      {workflow.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Your Workflow</h2>
          {workflow.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white">
                  {i + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-white mb-1">{step.step}</h3>
                  <p className="text-sm text-gray-400 mb-2">Recommended Tool:</p>
                  <div className="flex items-center gap-4">
                    <Link href={`/tools/${step.tool_slug}`} className="text-indigo-400 hover:text-indigo-300 font-medium">
                      {step.tool_name}
                    </Link>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                      {step.category}
                    </span>
                  </div>
                </div>
                <a 
                  href={step.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  Visit Site →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}