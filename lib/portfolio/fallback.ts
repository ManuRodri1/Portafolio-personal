import { buildAreas } from "@/lib/portfolio-content"
import { profile } from "@/lib/profile"
import type {
  PortfolioCapability,
  PortfolioData,
  PortfolioLanguage,
  PortfolioSiteSettings,
} from "@/lib/portfolio/types"

const capabilitySlugs = [
  "analytics-decision-systems",
  "automation-software-systems",
  "applied-ai",
] as const

export function getFallbackCapabilities(locale: PortfolioLanguage): PortfolioCapability[] {
  return buildAreas.map((area, index) => ({
    id: capabilitySlugs[index],
    slug: capabilitySlugs[index],
    name: area.title[locale],
    description: area.problems[locale],
    sortOrder: index + 1,
    projects: [],
  }))
}

export const fallbackSiteSettings: PortfolioSiteSettings = {
  resumeUrl: profile.resumeUrl,
  heroPhotoUrl: profile.photos.hero.src,
  aboutPhotoUrl: profile.photos.about.src,
  careerPhotoUrl: "",
  linkedInUrl: profile.urls.linkedIn,
  githubUrl: profile.urls.github,
  instagramUrl: "",
  location: profile.location,
}

export function getFallbackPortfolioData(locale: PortfolioLanguage): PortfolioData {
  return {
    projects: [],
    featuredProjects: [],
    capabilities: getFallbackCapabilities(locale),
    technologies: [],
    siteSettings: fallbackSiteSettings,
  }
}
