"use server"

interface Project {
  id: string
  name: string
  clientName: string
  category: string
  description: string
  image: string
  link: string
  platform: string
  date: string
  slug: string
  status: string
  serviceFocus: string
}

export async function getFilteredProjects(
  serviceFocus?: string,
  limit?: number,
): Promise<{ projects: Project[]; error?: string }> {
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

    let filterFormula = "{Status}='Published'"
    if (serviceFocus) {
      filterFormula = `AND({Status}='Published', {Service Focus}='${serviceFocus}')`
    }

    const params = new URLSearchParams({
      filterByFormula: filterFormula,
      "sort[0][field]": "Order",
      "sort[0][direction]": "asc",
    })

    if (limit) {
      params.append("maxRecords", limit.toString())
    }

    console.log("[v0] getFilteredProjects: serviceFocus filter:", serviceFocus)

    const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}?${params.toString()}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] getFilteredProjects: Records received:", data.records.length)

    const formattedProjects: Project[] = data.records.map((record: any) => {
      const fields = record.fields

      let category = ""
      if (Array.isArray(fields.Category)) {
        category = fields.Category.join(", ")
      } else if (fields.Category) {
        category = String(fields.Category)
      }

      let image = "/placeholder.svg?height=400&width=600"
      if (fields.Image && Array.isArray(fields.Image) && fields.Image.length > 0) {
        image = fields.Image[0].url
      }

      const project = {
        id: record.id,
        name: fields["Project Name"] || fields.Name || "Untitled Project",
        clientName: fields["Client Name"] || "",
        category: category || fields.Platform || "General",
        description: fields.Description || "",
        image: image,
        link: fields.Link || "#",
        platform: fields.Platform || "",
        date: fields.Date || "",
        slug: fields.Slug ? fields.Slug.trim() : "",
        status: fields.Status || "",
        serviceFocus: fields["Service Focus"] || "",
      }

      console.log(`[v0] getFilteredProjects: Project "${project.name}" - Service Focus: "${project.serviceFocus}"`)

      return project
    })

    console.log("[v0] getFilteredProjects: Formatted projects:", formattedProjects.length)
    return { projects: formattedProjects }
  } catch (err) {
    console.error("[v0] Error fetching filtered projects:", err)
    return {
      projects: [],
      error: err instanceof Error ? err.message : "Failed to fetch projects",
    }
  }
}
