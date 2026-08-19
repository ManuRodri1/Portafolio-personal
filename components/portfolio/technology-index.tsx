"use client"

import { useState } from "react"
import type { PortfolioLanguage, PortfolioTechnology } from "@/lib/portfolio/types"

const simpleIconSlugs: Record<string, string> = {
  python: "python",
  csharp: "sharp",
  "c-sharp": "sharp",
  dotnet: "dotnet",
  nextjs: "nextdotjs",
  "next-js": "nextdotjs",
  typescript: "typescript",
  react: "react",
  supabase: "supabase",
  airtable: "airtable",
  cloudinary: "cloudinary",
}

const technologyMarks: Record<string, string> = {
  "power-bi": "BI",
  dax: "DX",
  "sql-server": "SQL",
  "microsoft-fabric": "MF",
  "power-query": "PQ",
  "power-query-etl": "PQ",
  pentaho: "PN",
  "microsoft-excel": "XL",
  excel: "XL",
  "power-automate": "PA",
  "rest-apis": "API",
}

const categoryLabels: Record<string, Record<PortfolioLanguage, string>> = {
  data_bi: { en: "Data & BI", es: "Datos y BI" },
  data: { en: "Data & BI", es: "Datos y BI" },
  software: { en: "Software", es: "Software" },
  automation: { en: "Automation", es: "Automatización" },
  platform: { en: "Platforms", es: "Plataformas" },
  platforms: { en: "Platforms", es: "Plataformas" },
}

function TechnologyLogo({ technology }: { technology: PortfolioTechnology }) {
  const [failed, setFailed] = useState(false)
  const fallbackSimpleIcon = simpleIconSlugs[technology.slug]
  const src = technology.logoUrl || (fallbackSimpleIcon
    ? `https://cdn.simpleicons.org/${fallbackSimpleIcon}/152138`
    : "")

  if (src && !failed) {
    return (
      // Technology logos may come from multiple official hosts configured in Supabase.
      // The visible technology name is the accessible label.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width="28"
        height="28"
        loading="lazy"
        aria-hidden="true"
        onError={() => setFailed(true)}
      />
    )
  }

  const mark = technologyMarks[technology.slug]
  return mark ? <span className="portfolio-technology__mark" aria-hidden="true">{mark}</span> : null
}

export function TechnologyIndex({
  language,
  technologies,
}: {
  language: PortfolioLanguage
  technologies: PortfolioTechnology[]
}) {
  const grouped = new Map<string, PortfolioTechnology[]>()
  for (const technology of technologies) {
    const current = grouped.get(technology.category) ?? []
    current.push(technology)
    grouped.set(technology.category, current)
  }

  return (
    <div className="portfolio-technology__groups">
      {[...grouped.entries()].map(([category, items]) => (
        <section key={category} aria-labelledby={`technology-${category}`}>
          <h3 id={`technology-${category}`}>
            {categoryLabels[category]?.[language] ?? category.replaceAll("_", " ")}
          </h3>
          <ul>
            {items.map((item) => (
              <li key={item.id} data-technology={item.slug} tabIndex={0}>
                <TechnologyLogo technology={item} />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
