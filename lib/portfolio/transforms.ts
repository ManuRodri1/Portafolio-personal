import { fallbackSiteSettings, getFallbackCapabilities } from "@/lib/portfolio/fallback"
import type {
  LocalizedPortfolioData,
  PortfolioCapability,
  PortfolioData,
  PortfolioLanguage,
  PortfolioProject,
  PortfolioProjectMedia,
  PortfolioProjectReference,
  PortfolioSiteSettings,
  PortfolioTechnology,
} from "@/lib/portfolio/types"

export interface ProjectRow {
  id: string
  slug: string
  title_en: string | null
  title_es: string | null
  subtitle_en: string | null
  subtitle_es: string | null
  summary_en: string | null
  summary_es: string | null
  problem_en: string | null
  problem_es: string | null
  context_en: string | null
  context_es: string | null
  role_en: string | null
  role_es: string | null
  system_built_en: string | null
  system_built_es: string | null
  evidence_en: string | null
  evidence_es: string | null
  privacy_en: string | null
  privacy_es: string | null
  status: string
  project_type: string | null
  featured: boolean | null
  sort_order: number | null
  external_url: string | null
  github_url: string | null
  client_name: string | null
  platform: string | null
  started_at: string | null
  completed_at: string | null
}

export interface CapabilityRow {
  id: string
  slug: string
  name_en: string | null
  name_es: string | null
  description_en: string | null
  description_es: string | null
  sort_order: number | null
}

export interface TechnologyRow {
  id: string
  slug: string
  name: string
  category: string
  logo_url: string | null
  official_url: string | null
  sort_order: number | null
}

export interface ProjectCapabilityRow {
  project_id: string
  capability_id: string
  sort_order: number | null
}

export interface ProjectTechnologyRow {
  project_id: string
  technology_id: string
  is_primary: boolean | null
  sort_order: number | null
}

export interface ProjectMediaRow {
  id: string
  project_id: string
  media_type: string
  url: string
  cloudinary_public_id: string | null
  alt_en: string | null
  alt_es: string | null
  caption_en: string | null
  caption_es: string | null
  width: number | null
  height: number | null
  featured: boolean | null
  sort_order: number | null
}

export interface SiteSettingRow {
  key: string
  value: unknown
}

export interface PortfolioRows {
  projects: ProjectRow[]
  capabilities: CapabilityRow[]
  technologies: TechnologyRow[]
  projectCapabilities: ProjectCapabilityRow[]
  projectTechnologies: ProjectTechnologyRow[]
  media: ProjectMediaRow[]
  settings: SiteSettingRow[]
}

const clean = (value: string | null | undefined) => value?.trim() ?? ""

function localized(row: Record<string, unknown>, field: string, locale: PortfolioLanguage) {
  const preferred = clean(row[`${field}_${locale}`] as string | null)
  const english = clean(row[`${field}_en`] as string | null)
  return preferred || english
}

function sortOrder(value: number | null) {
  return Number.isFinite(value) ? (value as number) : 999
}

function safeUrl(value: string | null | undefined) {
  const candidate = clean(value)
  if (!candidate) return null
  try {
    const url = new URL(candidate)
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null
  } catch {
    return null
  }
}

function settingValue(rows: SiteSettingRow[], key: string) {
  const value = rows.find((row) => row.key === key)?.value
  return typeof value === "string" ? value.trim() : ""
}

function transformSettings(rows: SiteSettingRow[]): PortfolioSiteSettings {
  return {
    resumeUrl: safeUrl(settingValue(rows, "resume_url")) ?? fallbackSiteSettings.resumeUrl,
    heroPhotoUrl: safeUrl(settingValue(rows, "hero_photo_url")) ?? fallbackSiteSettings.heroPhotoUrl,
    aboutPhotoUrl: safeUrl(settingValue(rows, "about_photo_url")) ?? fallbackSiteSettings.aboutPhotoUrl,
    careerPhotoUrl: safeUrl(settingValue(rows, "career_photo_url")) ?? "",
    linkedInUrl: safeUrl(settingValue(rows, "linkedin_url")) ?? fallbackSiteSettings.linkedInUrl,
    githubUrl: safeUrl(settingValue(rows, "github_url")) ?? fallbackSiteSettings.githubUrl,
    instagramUrl: safeUrl(settingValue(rows, "instagram_url")) ?? "",
    location: settingValue(rows, "location") || fallbackSiteSettings.location,
  }
}

function transformForLocale(rows: PortfolioRows, locale: PortfolioLanguage): PortfolioData {
  const publishedIds = new Set(rows.projects.map((project) => project.id))
  const technologyById = new Map(rows.technologies.map((item) => [item.id, item]))
  const capabilityById = new Map(rows.capabilities.map((item) => [item.id, item]))

  const projectTechnologies = new Map<string, ProjectTechnologyRow[]>()
  for (const relation of rows.projectTechnologies) {
    if (!publishedIds.has(relation.project_id)) continue
    const current = projectTechnologies.get(relation.project_id) ?? []
    current.push(relation)
    projectTechnologies.set(relation.project_id, current)
  }

  const projectCapabilities = new Map<string, ProjectCapabilityRow[]>()
  for (const relation of rows.projectCapabilities) {
    if (!publishedIds.has(relation.project_id)) continue
    const current = projectCapabilities.get(relation.project_id) ?? []
    current.push(relation)
    projectCapabilities.set(relation.project_id, current)
  }

  const mediaByProject = new Map<string, ProjectMediaRow[]>()
  for (const item of rows.media) {
    if (!publishedIds.has(item.project_id) || !safeUrl(item.url)) continue
    const current = mediaByProject.get(item.project_id) ?? []
    current.push(item)
    mediaByProject.set(item.project_id, current)
  }

  const getProjectMedia = (projectId: string): PortfolioProjectMedia[] =>
    (mediaByProject.get(projectId) ?? [])
      .sort((a, b) => sortOrder(a.sort_order) - sortOrder(b.sort_order))
      .map((item) => ({
        id: item.id,
        mediaType: item.media_type,
        url: safeUrl(item.url) as string,
        cloudinaryPublicId: clean(item.cloudinary_public_id) || null,
        alt: localized(item as unknown as Record<string, unknown>, "alt", locale),
        caption: localized(item as unknown as Record<string, unknown>, "caption", locale),
        width: item.width,
        height: item.height,
        featured: Boolean(item.featured),
        sortOrder: sortOrder(item.sort_order),
      }))

  const projectReferences = new Map<string, PortfolioProjectReference>()
  for (const row of rows.projects) {
    const technologies = (projectTechnologies.get(row.id) ?? [])
      .sort((a, b) => sortOrder(a.sort_order) - sortOrder(b.sort_order))
      .flatMap((relation) => {
        const technology = technologyById.get(relation.technology_id)
        return technology
          ? [{ id: technology.id, slug: technology.slug, name: technology.name, isPrimary: Boolean(relation.is_primary) }]
          : []
      })

    projectReferences.set(row.id, {
      id: row.id,
      slug: row.slug,
      title: localized(row as unknown as Record<string, unknown>, "title", locale),
      summary: localized(row as unknown as Record<string, unknown>, "summary", locale),
      projectType: clean(row.project_type),
      externalUrl: safeUrl(row.external_url),
      githubUrl: safeUrl(row.github_url),
      technologies,
      media: getProjectMedia(row.id),
    })
  }

  const projects: PortfolioProject[] = rows.projects
    .map((row) => {
      const reference = projectReferences.get(row.id)
      if (!reference?.title) return null

      const capabilities = (projectCapabilities.get(row.id) ?? [])
        .sort((a, b) => sortOrder(a.sort_order) - sortOrder(b.sort_order))
        .flatMap((relation) => {
          const capability = capabilityById.get(relation.capability_id)
          return capability
            ? [{ id: capability.id, slug: capability.slug, name: localized(capability as unknown as Record<string, unknown>, "name", locale) }]
            : []
        })

      return {
        ...reference,
        subtitle: localized(row as unknown as Record<string, unknown>, "subtitle", locale),
        problem: localized(row as unknown as Record<string, unknown>, "problem", locale),
        context: localized(row as unknown as Record<string, unknown>, "context", locale),
        role: localized(row as unknown as Record<string, unknown>, "role", locale),
        systemBuilt: localized(row as unknown as Record<string, unknown>, "system_built", locale),
        evidence: localized(row as unknown as Record<string, unknown>, "evidence", locale),
        privacy: localized(row as unknown as Record<string, unknown>, "privacy", locale),
        status: "published" as const,
        featured: Boolean(row.featured),
        sortOrder: sortOrder(row.sort_order),
        clientName: clean(row.client_name) || null,
        platform: clean(row.platform) || null,
        startedAt: row.started_at,
        completedAt: row.completed_at,
        capabilities,
      }
    })
    .filter((project): project is PortfolioProject => project !== null)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  const projectById = new Map(projects.map((project) => [project.id, project]))

  const capabilities: PortfolioCapability[] = rows.capabilities
    .map((row) => ({
      id: row.id,
      slug: row.slug,
      name: localized(row as unknown as Record<string, unknown>, "name", locale),
      description: localized(row as unknown as Record<string, unknown>, "description", locale),
      sortOrder: sortOrder(row.sort_order),
      projects: rows.projectCapabilities
        .filter((relation) => relation.capability_id === row.id)
        .sort((a, b) => sortOrder(a.sort_order) - sortOrder(b.sort_order))
        .flatMap((relation) => {
          const project = projectById.get(relation.project_id)
          return project ? [projectReferences.get(project.id) as PortfolioProjectReference] : []
        }),
    }))
    .filter((capability) => capability.name)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  const fallbackCapabilities = getFallbackCapabilities(locale)
  for (const fallback of fallbackCapabilities) {
    if (!capabilities.some((capability) => capability.slug === fallback.slug)) capabilities.push(fallback)
  }
  capabilities.sort((a, b) => a.sortOrder - b.sortOrder)

  const technologies: PortfolioTechnology[] = rows.technologies
    .map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name.trim(),
      category: row.category,
      logoUrl: safeUrl(row.logo_url),
      officialUrl: safeUrl(row.official_url),
      sortOrder: sortOrder(row.sort_order),
      relatedProjects: rows.projectTechnologies
        .filter((relation) => relation.technology_id === row.id)
        .sort((a, b) => sortOrder(a.sort_order) - sortOrder(b.sort_order))
        .flatMap((relation) => {
          const project = projectById.get(relation.project_id)
          return project ? [projectReferences.get(project.id) as PortfolioProjectReference] : []
        }),
    }))
    .filter((technology) => technology.name)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return {
    projects,
    featuredProjects: projects.filter((project) => project.featured).slice(0, 4),
    capabilities,
    technologies,
    siteSettings: transformSettings(rows.settings),
  }
}

export function transformPortfolioRows(rows: PortfolioRows): LocalizedPortfolioData {
  return {
    en: transformForLocale(rows, "en"),
    es: transformForLocale(rows, "es"),
  }
}
