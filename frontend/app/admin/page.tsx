"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchTools, triggerHealthCheck } from "@/lib/api";
import { Tool } from "@/lib/mockData";

export default function AdminPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    fetchTools().then(data => {
      setTools(data);
      setLoading(false);
    });
  }, []);

  const handleHealthCheck = async () => {
    setChecking(true);
    try {
      await triggerHealthCheck();
      // Refresh tools after health check
      const updatedTools = await fetchTools();
      setTools(updatedTools);
    } catch (err) {
      console.error(err);
    } finally {
      setChecking(false);
    }
  };

  if (loading) return <div className="text-center text-gray-400 py-20">Loading stats...</div>;

  const activeCount = tools.filter(t => t.status === "Active").length;
  const unavailableCount = tools.filter(t => t.status === "Unavailable").length;

  const stats = [
    { label: "Total Tools", value: tools.length, color: "text-white", bg: "bg-gray-900/50" },
    { label: "Active", value: activeCount, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "Unavailable", value: unavailableCount, color: "text-red-400", bg: "bg-red-500/10" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4"
      >
        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
        <button
          onClick={handleHealthCheck}
          disabled={checking}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30 disabled:opacity-50"
        >
          {checking ? "Checking Links..." : "Run Health Check"}
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${stat.bg} backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg`}
          >
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <p className={`text-5xl font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tools Table */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Tool Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tools.map((tool) => (
              <tr key={tool.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white">{tool.name}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{tool.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    tool.status === "Active" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                  }`}>
                    {tool.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}