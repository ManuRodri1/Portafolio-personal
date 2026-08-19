import type { PortfolioLanguage } from "@/lib/portfolio-content"

export type { PortfolioLanguage }

export interface PortfolioTechnology {
  id: string
  slug: string
  name: string
  category: string
  logoUrl: string | null
  officialUrl: string | null
  sortOrder: number
  relatedProjects: PortfolioProjectReference[]
}

export interface PortfolioCapability {
  id: string
  slug: string
  name: string
  description: string
  sortOrder: number
  projects: PortfolioProjectReference[]
}

export interface PortfolioProjectMedia {
  id: string
  mediaType: string
  url: string
  cloudinaryPublicId: string | null
  alt: string
  caption: string
  width: number | null
  height: number | null
  featured: boolean
  sortOrder: number
}

export interface PortfolioProjectReference {
  id: string
  slug: string
  title: string
  summary: string
  projectType: string
  externalUrl: string | null
  githubUrl: string | null
  technologies: Array<Pick<PortfolioTechnology, "id" | "slug" | "name"> & { isPrimary: boolean }>
  media: PortfolioProjectMedia[]
}

export interface PortfolioProject extends PortfolioProjectReference {
  subtitle: string
  problem: string
  context: string
  role: string
  systemBuilt: string
  evidence: string
  privacy: string
  status: "published"
  featured: boolean
  sortOrder: number
  clientName: string | null
  platform: string | null
  startedAt: string | null
  completedAt: string | null
  capabilities: Array<Pick<PortfolioCapability, "id" | "slug" | "name">>
  media: PortfolioProjectMedia[]
}

export interface PortfolioSiteSettings {
  resumeUrl: string
  heroPhotoUrl: string
  aboutPhotoUrl: string
  careerPhotoUrl: string
  linkedInUrl: string
  githubUrl: string
  instagramUrl: string
  location: string
}

export interface PortfolioData {
  projects: PortfolioProject[]
  featuredProjects: PortfolioProject[]
  capabilities: PortfolioCapability[]
  technologies: PortfolioTechnology[]
  siteSettings: PortfolioSiteSettings
}

export type LocalizedPortfolioData = Record<PortfolioLanguage, PortfolioData>
