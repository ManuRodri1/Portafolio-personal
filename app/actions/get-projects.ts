"use server"

interface Project {
  id: string
  name: string
  category: string
  description: string
  image: string
  link: string
  platform: string
  date: string
  slug: string
}

export async function getProjects(): Promise<{ projects: Project[]; error?: string }> {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "Projects"

    console.log("[v0] Airtable Configuration Check:")
    console.log("[v0] API Key exists:", !!airtableApiKey)
    console.log("[v0] Base ID exists:", !!airtableBaseId)
    console.log("[v0] Table Name:", airtableTableName)

    if (!airtableApiKey || !airtableBaseId) {
      console.log("[v0] Missing Airtable configuration")
      return {
        projects: [],
        error: "Airtable configuration missing",
      }
    }

    const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`
    console.log("[v0] Fetching from URL:", url)

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      next: { revalidate: 3600 },
    })

    console.log("[v0] Response status:", response.status)
    console.log("[v0] Response ok:", response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Error response:", errorText)
      throw new Error(`Failed to fetch projects: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Records found:", data.records?.length || 0)

    const formattedProjects: Project[] = data.records.map((record: any) => {
      const fields = record.fields
      console.log("[v0] Processing record:", record.id, "Fields:", Object.keys(fields))

      // Handle Category - it might be an array or string
      let category = ""
      if (Array.isArray(fields.Category)) {
        category = fields.Category.join(", ")
      } else if (fields.Category) {
        category = String(fields.Category)
      }

      // Handle Image - Airtable returns array of attachment objects
      let image = "/placeholder.svg?height=400&width=600"
      if (fields.Image && Array.isArray(fields.Image) && fields.Image.length > 0) {
        image = fields.Image[0].url
      }

      const slug = fields.Slug ? String(fields.Slug).trim() : ""

      return {
        id: record.id,
        name: fields["Project Name"] || fields.Name || "Untitled Project",
        category: category || fields.Platform || "General",
        description: fields.Description || "",
        image: image,
        link: fields.Link || "#",
        platform: fields.Platform || "",
        date: fields.Date || "",
        slug: slug,
      }
    })

    console.log("[v0] Formatted projects:", formattedProjects.length)
    console.log("[v0] First project data:", formattedProjects[0])

    return { projects: formattedProjects }
  } catch (err) {
    console.error("[v0] Error fetching projects:", err)
    return {
      projects: [],
      error: err instanceof Error ? err.message : "Failed to fetch projects",
    }
  }
}

export const getAllProjects = getProjects
