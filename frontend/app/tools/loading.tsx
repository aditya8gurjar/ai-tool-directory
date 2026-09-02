// frontend/app/tools/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="h-10 w-64 bg-gray-800 rounded-lg animate-pulse mb-2"></div>
      <div className="h-4 w-80 bg-gray-800 rounded-lg animate-pulse mb-10"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-900/50 p-6 rounded-xl border border-white/10 animate-pulse h-48">
            <div className="h-6 w-32 bg-gray-800 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-800 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-800 rounded mb-6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}