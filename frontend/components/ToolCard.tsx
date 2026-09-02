"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Tool } from "@/lib/mockData";

export default function ToolCard({ tool, index }: { tool: Tool, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white">{tool.name}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          tool.pricing === "Free" ? "bg-green-500/20 text-green-300" :
          tool.pricing === "Freemium" ? "bg-blue-500/20 text-blue-300" :
          "bg-purple-500/20 text-purple-300"
        }`}>
          {tool.pricing}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-6 line-clamp-3">{tool.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          {tool.category}
        </span>
        <Link href={`/tools/${tool.slug}`} className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
          View Details →
        </Link>
      </div>
    </motion.div>
  );
}