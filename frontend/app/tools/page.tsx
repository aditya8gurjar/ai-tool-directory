"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { fetchTools } from "@/lib/api";
import ToolsGrid from "@/components/ToolsGrid";
import { Tool } from "@/lib/mockData";

function ToolsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools(100, category).then(data => {
      setTools(data);
      setLoading(false);
    });
  }, [category]);

  if (loading) return <div className="text-center text-gray-400 py-20">Loading tools...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white mb-2">
        {category ? `${category} Tools` : "All AI Tools"}
      </h1>
      <p className="text-gray-400 mb-10">Browse our complete directory of {tools.length} AI tools.</p>
      <ToolsGrid tools={tools} />
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400 py-20">Loading...</div>}>
      <ToolsContent />
    </Suspense>
  );
}