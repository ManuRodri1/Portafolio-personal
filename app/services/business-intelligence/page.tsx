import { CompanyLanguageProvider } from "@/contexts/company-language-context"
import CompanyHeader from "@/components/company/company-header"
import CompanyFooter from "@/components/company/company-footer"
import BIHero from "@/components/company/bi-hero"
import BIChallengeSection from "@/components/company/bi-challenge-section"
import BIApproachSection from "@/components/company/bi-approach-section"
import BISolutionsSection from "@/components/company/bi-solutions-section"
import BIRelatedProjects from "@/components/company/bi-related-projects"
import BIFinalCTA from "@/components/company/bi-final-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Business Intelligence Consulting & BI Dashboards | JMDR",
  description:
    "Advanced Business Intelligence solutions including dashboards, analytics, KPIs, and data modeling to improve visibility, performance, and decision-making.",
  keywords: [
    "Business Intelligence",
    "BI consulting",
    "BI dashboards",
    "data analytics for businesses",
    "data-driven decision making",
    "KPI dashboards",
    "business analytics",
    "data visualization",
    "data modeling",
  ],
  openGraph: {
    title: "Business Intelligence Consulting & BI Dashboards | JMDR",
    description:
      "Advanced Business Intelligence solutions including dashboards, analytics, KPIs, and data modeling to improve visibility, performance, and decision-making.",
    type: "website",
    url: "https://www.jmrodri.site/services/business-intelligence",
    siteName: "JMDR Digital Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Intelligence Consulting & BI Dashboards | JMDR",
    description:
      "Advanced Business Intelligence solutions including dashboards, analytics, KPIs, and data modeling to improve visibility, performance, and decision-making.",
  },
  alternates: {
    canonical: "https://www.jmrodri.site/services/business-intelligence",
  },
}

export default function BusinessIntelligencePage() {
  return (
    <CompanyLanguageProvider>
      <div className="min-h-screen">
        <CompanyHeader />
        <BIHero />
        <BIChallengeSection />
        <BIApproachSection />
        <BISolutionsSection />
        <BIRelatedProjects />
        <BIFinalCTA />
        <CompanyFooter />
      </div>
    </CompanyLanguageProvider>
  )
}
