import { CompanyLanguageProvider } from "@/contexts/company-language-context"
import CompanyHeader from "@/components/company/company-header"

export default function ContactPage() {
  return (
    <CompanyLanguageProvider>
      <div className="min-h-screen bg-[#0B0F17]">
        <CompanyHeader />
        <main className="pt-24">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Contact</h1>
            <p className="text-lg text-gray-400">Coming soon - Lead generation form and contact information.</p>
          </div>
        </main>
      </div>
    </CompanyLanguageProvider>
  )
}
