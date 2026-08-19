import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E244B] to-[#E94547] flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Project Not Found</h2>
        <p className="text-xl text-gray-200 mb-10">The project you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/services/business-intelligence"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E244B] font-bold rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to BI Solutions
        </Link>
      </div>
    </div>
  )
}
