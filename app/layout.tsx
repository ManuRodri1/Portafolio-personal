import type React from "react"
import type { Metadata } from "next"
import { Inter, League_Spartan, Pacifico } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { OFFICIAL_NAME, profile } from "@/lib/profile"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-serif",
})

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jmrodri.site"),
  title: {
    default: "JMDR Digital Solutions | Business Intelligence & Web Development",
    template: "%s | JMDR Digital Solutions",
  },
  description:
    "JMDR Digital Solutions - Professional consulting services in Business Intelligence, Web Development, and Process Automation. Data-driven solutions for modern businesses.",
  keywords: [
    "JMDR",
    OFFICIAL_NAME,
    "Jose Rodriguez BI Developer",
    "Business Intelligence Developer Portfolio",
    "Power BI Developer Portfolio",
    "Data Analyst Portfolio",
    "JMDR Digital Solutions",
    "Software Engineer",
    "Business Intelligence",
    "Data Analytics",
    "Power BI",
    "Pentaho BI",
    "SQL Server",
    "Web Design",
    "Process Automation",
    "BI Consultant",
    "Data Modeling",
    "DAX",
    "OLAP Cubes",
    "Dominican Republic Developer",
  ],
  authors: [{ name: OFFICIAL_NAME, url: "https://www.jmrodri.site" }],
  creator: OFFICIAL_NAME,
  publisher: OFFICIAL_NAME,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_DO",
    alternateLocale: ["en_US"],
    url: "https://www.jmrodri.site",
    title: "JMDR Digital Solutions | Business Intelligence & Web Development",
    description:
      "JMDR Digital Solutions - Professional consulting services in Business Intelligence, Web Development, and Process Automation.",
    siteName: "JMDR Digital Solutions",
    images: [
      {
        url: "/jmdr-logo.png",
        width: 1200,
        height: 630,
        alt: `JMDR Digital Solutions — founded by ${OFFICIAL_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JMDR Digital Solutions | Business Intelligence & Web Development",
    description:
      "JMDR Digital Solutions - Professional consulting services in Business Intelligence, Web Development, and Process Automation.",
    images: ["/jmdr-logo.png"],
    creator: "@JMDR",
  },
  alternates: {
    canonical: "https://www.jmrodri.site",
    languages: {
      "es-DO": "https://www.jmrodri.site/es",
      "en-US": "https://www.jmrodri.site/en",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: OFFICIAL_NAME,
    alternateName: "JMDR",
    url: "https://www.jmrodri.site",
    image: profile.photos.hero.src,
    jobTitle:
      "Business Intelligence Developer · Software Engineer · Applied AI Builder",
    description:
      "Business Intelligence developer and software engineer building data, software, and applied AI systems that turn operational complexity into measurable decisions.",
    email: profile.email,
    sameAs: [profile.urls.linkedIn, profile.urls.github],
    knowsAbout: [
      "Business Intelligence",
      "Power BI",
      "Pentaho BI",
      "SQL Server",
      "Data Analytics",
      "Web Development",
      "Process Automation",
      "DAX",
      "Data Modeling",
      "OLAP Cubes",
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Universidad del Caribe",
      },
      {
        "@type": "EducationalOrganization",
        name: "Centro de Tecnología Universal (CENTU)",
      },
      {
        "@type": "EducationalOrganization",
        name: "Instituto Tecnológico de las Américas (ITLA)",
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "SPN Software",
    },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JMDR",
    url: "https://www.jmrodri.site",
    logo: "https://www.jmrodri.site/jmdr-logo.png",
    founder: OFFICIAL_NAME,
    sameAs: [profile.urls.linkedIn, profile.urls.github],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JMDR Digital Solutions",
    url: "https://www.jmrodri.site",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.jmrodri.site/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang="es-DO" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="es" href="https://www.jmrodri.site/es" />
        <link rel="alternate" hrefLang="en" href="https://www.jmrodri.site/en" />
        <link rel="alternate" hrefLang="x-default" href="https://www.jmrodri.site" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className={`${inter.variable} ${leagueSpartan.variable} ${pacifico.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
