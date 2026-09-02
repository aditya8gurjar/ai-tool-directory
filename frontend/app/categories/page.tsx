"use client";

import { motion } from "framer-motion";
import { categories, mockTools } from "@/lib/mockData";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white mb-10">
        Browse by Category
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, i) => {
          const count = mockTools.filter(t => t.category === category).length;
          return (
            <motion.div key={category} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ scale: 1.03 }}>
              <Link href={`/tools?category=${encodeURIComponent(category)}`} className="block bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-indigo-500/50 hover:shadow-indigo-500/20 hover:shadow-lg transition-all duration-300 h-full">
                <h2 className="text-xl font-semibold text-white mb-2">{category}</h2>
                <p className="text-gray-400 text-sm">Explore {category} tools</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}