import type { Metadata } from "next"
import { Archivo, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google"
import { getBlogPosts } from "@/app/actions/get-blog-posts"
import PortfolioExperiencePage, {
  type PortfolioBlogPreview,
} from "@/components/portfolio/portfolio-experience"
import { getPortfolioData } from "@/lib/portfolio/queries"
import { profile } from "@/lib/profile"
import "./portfolio.css"

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-portfolio-archivo",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-portfolio-source",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-portfolio-mono",
  display: "swap",
})

const title =
  `${profile.fullName} | Business Intelligence, Software & Applied AI`
const description =
  "Business Intelligence Developer, Software Engineer, and Applied AI Builder in the Dominican Republic. Explore verified experience, data systems, software work, and responsible AI experiments."
const canonical = "https://www.jmrodri.site/portfolio"

export const revalidate = 600

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "profile",
    siteName: profile.fullName,
    locale: "en_US",
    alternateLocale: ["es_DO"],
    images: [
      {
        url: "/portfolio/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.fullName} — Business Intelligence, software, and applied AI systems`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portfolio/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

async function getPublishedPortfolioPosts(): Promise<PortfolioBlogPreview[]> {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    return []
  }

  const [english, spanish] = await Promise.all([
    getBlogPosts("EN"),
    getBlogPosts("ES"),
  ])

  return [...english.posts, ...spanish.posts]
    .filter((post) => post.published && post.slug)
    .map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      language: post.language,
      publishedAt: post.publishedAt,
    }))
}

export default async function PortfolioPage() {
  const [posts, portfolioData] = await Promise.all([
    getPublishedPortfolioPosts(),
    getPortfolioData(),
  ])
  const publicSettings = portfolioData.en.siteSettings

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: "JMDR",
    url: canonical,
    image: publicSettings.heroPhotoUrl,
    homeLocation: {
      "@type": "Country",
      name: "Dominican Republic",
    },
    jobTitle:
      "Business Intelligence Developer · Software Engineer · Applied AI Builder",
    description:
      "Business Intelligence developer and software engineer building data systems and responsible applied AI experiments.",
    knowsAbout: [
      "Business Intelligence",
      "Power BI",
      "DAX",
      "SQL Server",
      "Microsoft Fabric",
      "Python",
      "ETL",
      "Software Engineering",
      "Next.js",
      "Applied artificial intelligence",
      "Retrieval-augmented generation",
    ],
    sameAs: [publicSettings.linkedInUrl, publicSettings.githubUrl].filter(Boolean),
    affiliation: {
      "@type": "Organization",
      name: "JMDR Digital Solutions",
      url: "https://www.jmrodri.site",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div
        className={`${archivo.variable} ${sourceSans.variable} ${ibmPlexMono.variable}`}
      >
        <PortfolioExperiencePage posts={posts} data={portfolioData} />
      </div>
    </>
  )
}
