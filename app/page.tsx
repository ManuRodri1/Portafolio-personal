import { CompanyLanguageProvider } from "@/contexts/company-language-context"
import CompanyHeader from "@/components/company/company-header"
import CompanyFooter from "@/components/company/company-footer"
import HeroJMDR from "@/components/hero-jmdr"
import TestimonialsSection from "@/components/company/testimonials-section"
import ServicesOverview from "@/components/company/services-overview"
import FeaturedProjects from "@/components/company/featured-projects"
import BlogPreview from "@/components/company/blog-preview"
import FinalCTA from "@/components/company/final-cta"
import { getClients } from "@/app/actions/get-clients"
import { getFeaturedProjects } from "@/app/actions/get-featured-projects"
import { getFeaturedBlogPosts } from "@/app/actions/get-featured-blog-posts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Business Intelligence & Web Solutions | JMDR Digital Solutions",
  description:
    "JMDR Digital Solutions helps businesses transform data into actionable insights through Business Intelligence, analytics, automation, and modern web solutions.",
  keywords: [
    "Business Intelligence",
    "BI consulting",
    "data analytics",
    "web solutions",
    "digital transformation",
    "BI dashboards",
    "business analytics",
  ],
  openGraph: {
    title: "Business Intelligence & Web Solutions | JMDR Digital Solutions",
    description:
      "JMDR Digital Solutions helps businesses transform data into actionable insights through Business Intelligence, analytics, automation, and modern web solutions.",
    type: "website",
    url: "https://www.jmrodri.site",
    siteName: "JMDR Digital Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Intelligence & Web Solutions | JMDR Digital Solutions",
    description:
      "JMDR Digital Solutions helps businesses transform data into actionable insights through Business Intelligence, analytics, automation, and modern web solutions.",
  },
  alternates: {
    canonical: "https://www.jmrodri.site",
  },
}

export default async function Home() {
  const { clients } = await getClients()
  const { projects } = await getFeaturedProjects()
  const { posts } = await getFeaturedBlogPosts()

  return (
    <CompanyLanguageProvider>
      <div className="min-h-screen">
        <CompanyHeader />
        <HeroJMDR />
        <TestimonialsSection clients={clients} />
        <ServicesOverview />
        <FeaturedProjects projects={projects} />
        <BlogPreview posts={posts} />
        <FinalCTA />
        <CompanyFooter />
      </div>
    </CompanyLanguageProvider>
  )
}
