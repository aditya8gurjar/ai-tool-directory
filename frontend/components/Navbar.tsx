import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-white">
            AI <span className="text-gradient">Directory</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/tools" className="text-gray-300 hover:text-white transition-colors font-medium">
              All Tools
            </Link>
            <Link href="/categories" className="text-gray-300 hover:text-white transition-colors font-medium">
              Categories
            </Link>
            <Link href="/workflows" className="text-gray-300 hover:text-white transition-colors font-medium">
              Workflows
            </Link>
            {/* Admin link removed for security */}
          </div>
        </div>
      </div>
    </nav>
  );
}