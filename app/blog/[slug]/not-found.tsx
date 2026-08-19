import Link from "next/link"
import CompanyHeader from "@/components/company/company-header"
import { CompanyLanguageProvider } from "@/contexts/company-language-context"

export default function NotFound() {
  return (
    <CompanyLanguageProvider>
      <CompanyHeader />
      <div className="min-h-screen bg-gradient-to-b from-[#1E244B] via-[#E94547]/20 to-white flex items-center justify-center px-6">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-3xl font-bold text-white">Blog Post Not Found</h2>
          <p className="text-lg text-white/80">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/blog"
            className="inline-block px-8 py-4 bg-[#E94547] text-white font-semibold rounded-lg hover:bg-[#d93d3f] transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </CompanyLanguageProvider>
  )
}
