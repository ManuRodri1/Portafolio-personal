import type { PortfolioLanguage } from "@/lib/portfolio/types"

export function getExternalProjectLabel(url: string, language: PortfolioLanguage) {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.toLowerCase()
    const isPdf = parsed.pathname.toLowerCase().endsWith(".pdf")

    if (isPdf) return language === "en" ? "View case study PDF" : "Ver caso de estudio en PDF"
    if (host.includes("github.com")) return "GitHub"
    if (host.includes("linkedin.com")) {
      return language === "en" ? "View project post" : "Ver publicación del proyecto"
    }
  } catch {
    // URL validity is already handled in the data layer; retain a neutral label here.
  }

  return language === "en" ? "View project" : "Ver proyecto"
}
