import { CompanyLanguageProvider } from "@/contexts/company-language-context"
import CompanyHeader from "@/components/company/company-header"
import CompanyFooter from "@/components/company/company-footer"
import BlogHero from "@/components/company/blog-hero"
import BlogListing from "@/components/company/blog-listing"
import { getBlogPosts } from "@/app/actions/get-blog-posts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Insights on Business Intelligence, Data & Web Systems | JMDR Blog",
  description:
    "Expert insights on Business Intelligence, data analytics, dashboards, automation, and modern web solutions for decision-makers and digital teams.",
  keywords: [
    "Business Intelligence blog",
    "BI insights",
    "data analytics articles",
    "dashboard design",
    "web development insights",
    "digital transformation",
    "data strategy",
  ],
  openGraph: {
    title: "Insights on Business Intelligence, Data & Web Systems | JMDR Blog",
    description:
      "Expert insights on Business Intelligence, data analytics, dashboards, automation, and modern web solutions for decision-makers and digital teams.",
    type: "website",
    url: "https://www.jmrodri.site/blog",
    siteName: "JMDR Digital Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights on Business Intelligence, Data & Web Systems | JMDR Blog",
    description:
      "Expert insights on Business Intelligence, data analytics, dashboards, automation, and modern web solutions for decision-makers and digital teams.",
  },
  alternates: {
    canonical: "https://www.jmrodri.site/blog",
  },
}

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  const { posts, error } = await getBlogPosts("EN") // Fetch EN posts as default for SSR

  return (
    <CompanyLanguageProvider>
      <div className="min-h-screen bg-white">
        <CompanyHeader />
        <BlogHero />
        {error ? (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <p className="text-red-500">Error loading blog posts: {error}</p>
          </div>
        ) : (
          <BlogListing initialPosts={posts} />
        )}
        <CompanyFooter />
      </div>
    </CompanyLanguageProvider>
  )
}
