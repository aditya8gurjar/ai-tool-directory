"use client";

import { motion } from "framer-motion";
import ToolCard from "@/components/ToolCard";
import { Tool } from "@/lib/mockData";

export default function ToolsGrid({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tools.map((tool, i) => (
        <ToolCard key={tool.id} tool={tool} index={i} />
      ))}
    </div>
  );
}