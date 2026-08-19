import { CompanyLanguageProvider } from "@/contexts/company-language-context"
import CompanyHeader from "@/components/company/company-header"
import CompanyFooter from "@/components/company/company-footer"
import WebHero from "@/components/company/web-hero"
import WebChallengeSection from "@/components/company/web-challenge-section"
import WebApproachSection from "@/components/company/web-approach-section"
import WebSolutionsSection from "@/components/company/web-solutions-section"
import WebRelatedProjects from "@/components/company/web-related-projects"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Professional Web Design & SEO-Driven Websites | JMDR",
  description:
    "Modern, high-performance websites designed for branding, conversion, ecommerce, and SEO — built to scale with your business.",
  keywords: [
    "web design services",
    "website development",
    "business websites",
    "ecommerce websites",
    "SEO-driven websites",
    "website redesign",
    "web optimization",
    "responsive web design",
    "corporate websites",
  ],
  openGraph: {
    title: "Professional Web Design & SEO-Driven Websites | JMDR",
    description:
      "Modern, high-performance websites designed for branding, conversion, ecommerce, and SEO — built to scale with your business.",
    type: "website",
    url: "https://www.jmrodri.site/services/web-solutions",
    siteName: "JMDR Digital Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Web Design & SEO-Driven Websites | JMDR",
    description:
      "Modern, high-performance websites designed for branding, conversion, ecommerce, and SEO — built to scale with your business.",
  },
  alternates: {
    canonical: "https://www.jmrodri.site/services/web-solutions",
  },
}

export default function WebSolutionsPage() {
  return (
    <CompanyLanguageProvider>
      <div className="min-h-screen">
        <CompanyHeader />
        <WebHero />
        <WebChallengeSection />
        <WebApproachSection />
        <WebSolutionsSection />
        <WebRelatedProjects />
        <CompanyFooter />
      </div>
    </CompanyLanguageProvider>
  )
}
