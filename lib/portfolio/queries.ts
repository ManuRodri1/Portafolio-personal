import { cache } from "react"
import { getFallbackPortfolioData } from "@/lib/portfolio/fallback"
import { hasPublicSupabaseConfig, selectPublicRows } from "@/lib/supabase/server"
import {
  transformPortfolioRows,
  type CapabilityRow,
  type PortfolioRows,
  type ProjectCapabilityRow,
  type ProjectMediaRow,
  type ProjectRow,
  type ProjectTechnologyRow,
  type SiteSettingRow,
  type TechnologyRow,
} from "@/lib/portfolio/transforms"
import type { LocalizedPortfolioData, PortfolioLanguage } from "@/lib/portfolio/types"

const query = (select: string, order?: string) => {
  const params = new URLSearchParams({ select })
  if (order) params.set("order", order)
  return params
}

async function fetchPortfolioRows(): Promise<PortfolioRows> {
  const projectQuery = query("id,slug,title_en,title_es,subtitle_en,subtitle_es,summary_en,summary_es,problem_en,problem_es,context_en,context_es,role_en,role_es,system_built_en,system_built_es,evidence_en,evidence_es,privacy_en,privacy_es,status,project_type,featured,sort_order,external_url,github_url,client_name,platform,started_at,completed_at", "sort_order.asc")
  projectQuery.set("status", "eq.published")

  const [projects, capabilities, technologies, projectCapabilities, projectTechnologies, media, settings] = await Promise.all([
    selectPublicRows<ProjectRow>("projects", projectQuery),
    selectPublicRows<CapabilityRow>("capabilities", query("id,slug,name_en,name_es,description_en,description_es,sort_order", "sort_order.asc")),
    selectPublicRows<TechnologyRow>("technologies", query("id,slug,name,category,logo_url,official_url,sort_order", "sort_order.asc")),
    selectPublicRows<ProjectCapabilityRow>("project_capabilities", query("project_id,capability_id,sort_order", "sort_order.asc")),
    selectPublicRows<ProjectTechnologyRow>("project_technologies", query("project_id,technology_id,is_primary,sort_order", "sort_order.asc")),
    selectPublicRows<ProjectMediaRow>("project_media", query("id,project_id,media_type,url,cloudinary_public_id,alt_en,alt_es,caption_en,caption_es,width,height,featured,sort_order", "sort_order.asc")),
    selectPublicRows<SiteSettingRow>("site_settings", query("key,value")),
  ])

  return { projects, capabilities, technologies, projectCapabilities, projectTechnologies, media, settings }
}

export const getPortfolioData = cache(async (): Promise<LocalizedPortfolioData> => {
  const fallback = {
    en: getFallbackPortfolioData("en"),
    es: getFallbackPortfolioData("es"),
  }

  if (!hasPublicSupabaseConfig()) return fallback

  try {
    return transformPortfolioRows(await fetchPortfolioRows())
  } catch (error) {
    console.error(
      "[portfolio] Supabase data could not be loaded; serving the local fallback.",
      error instanceof Error ? error.message : "Unknown error",
    )
    return fallback
  }
})

export async function getPublishedProjects(locale: PortfolioLanguage) {
  return (await getPortfolioData())[locale].projects
}

export async function getFeaturedProjects(locale: PortfolioLanguage) {
  return (await getPortfolioData())[locale].featuredProjects
}

export async function getCapabilitiesWithProjects(locale: PortfolioLanguage) {
  return (await getPortfolioData())[locale].capabilities
}

export async function getTechnologies(locale: PortfolioLanguage = "en") {
  return (await getPortfolioData())[locale].technologies
}

export async function getSiteSettings() {
  return (await getPortfolioData()).en.siteSettings
}

export async function getProjectBySlug(slug: string, locale: PortfolioLanguage) {
  return (await getPublishedProjects(locale)).find(
    (project) => project.slug.trim().toLowerCase() === slug.trim().toLowerCase(),
  ) ?? null
}
