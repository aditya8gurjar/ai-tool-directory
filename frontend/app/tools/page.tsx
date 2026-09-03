import { fetchTools } from "@/lib/api";
import ToolsGrid from "@/components/ToolsGrid";

export const dynamic = 'force-dynamic';

export default async function ToolsPage({ searchParams }: {
  searchParams: Promise<{ category?: string }>
}) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category || "";
  const tools = await fetchTools(100, category);

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