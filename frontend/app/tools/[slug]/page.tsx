import { fetchToolBySlug } from "@/lib/api";
import ToolDetailView from "@/components/ToolDetailView";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ToolDetailPage({ params }: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const tool = await fetchToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <ToolDetailView tool={tool} />
      
      <div className="mt-8 text-center">
        <Link href="/tools" className="text-indigo-400 hover:text-indigo-300 font-medium">
          ← Back to All Tools
        </Link>
      </div>
    </div>
  );
}