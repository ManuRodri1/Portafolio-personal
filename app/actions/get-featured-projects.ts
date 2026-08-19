"use server"

interface FeaturedProject {
  id: string
  name: string
  clientName: string
  description: string
  shortDescription: string
  image: string
  order: number
  featured: boolean
  published: boolean
  date: string
  slug: string
}

export async function getFeaturedProjects(): Promise<{
  projects: FeaturedProject[]
  error?: string
}> {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "Projects"

    if (!airtableApiKey || !airtableBaseId) {
      return {
        projects: [],
        error: "Airtable configuration missing",
      }
    }

    const filterFormula = "AND({Featured}=TRUE(), {Status}='Published')"

    const params = new URLSearchParams({
      filterByFormula: filterFormula,
      "sort[0][field]": "Order",
      "sort[0][direction]": "asc",
    })

    const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}?${params.toString()}`

    console.log("[v0] getFeaturedProjects: Fetching featured projects")

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch featured projects: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] getFeaturedProjects: Records received:", data.records.length)

    const formattedProjects: FeaturedProject[] = data.records.map((record: any) => {
      const fields = record.fields

      let image = "/placeholder.svg?height=400&width=600"
      if (fields.Image && Array.isArray(fields.Image) && fields.Image.length > 0) {
        image = fields.Image[0].url
      }

      let shortDescription = fields["Short Description"] || ""
      if (!shortDescription && fields.Description) {
        shortDescription =
          fields.Description.length > 120 ? fields.Description.substring(0, 120) + "..." : fields.Description
      }

      const project = {
        id: record.id,
        name: fields["Project Name"] || fields.Name || "Untitled Project",
        clientName: fields["Client Name"] || "",
        description: fields.Description || "",
        shortDescription,
        image,
        order: fields.Order || 0,
        featured: fields.Featured || false,
        published: fields.Status === "Published",
        date: fields.Date || "",
        slug: fields.Slug ? fields.Slug.trim() : "",
      }

      console.log(`[v0] getFeaturedProjects: Project "${project.name}" - Slug: "${project.slug}"`)

      return project
    })

    console.log("[v0] getFeaturedProjects: Projects with valid slugs:", formattedProjects.filter((p) => p.slug).length)

    return { projects: formattedProjects }
  } catch (err) {
    console.error("[v0] Error fetching featured projects:", err)
    return {
      projects: [],
      error: err instanceof Error ? err.message : "Failed to fetch featured projects",
    }
  }
}
