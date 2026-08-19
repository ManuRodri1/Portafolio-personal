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

export async function getProjectBySlug(slug: string): Promise<{ project: Project | null; error?: string }> {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "Projects"

    if (!airtableApiKey || !airtableBaseId) {
      return { project: null, error: "Airtable configuration missing" }
    }

    const trimmedSlug = slug.trim()

    // Fetch ALL records and match client-side to avoid Airtable formula
    // encoding issues with dashes, special characters, and whitespace.
    const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`

    console.log("[v0] getProjectBySlug: Looking for slug:", trimmedSlug)

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Airtable responded with status: ${response.status}`)
    }

    const data = await response.json()

    console.log("[v0] getProjectBySlug: Total records fetched:", data.records?.length || 0)

    // Log every slug to diagnose mismatches
    data.records?.forEach((r: any) => {
      console.log(
        `[v0] getProjectBySlug: "${r.fields["Project Name"]}" → raw slug: "${r.fields.Slug}" | trimmed: "${(r.fields.Slug || "").trim()}"`,
      )
    })

    // Case-insensitive, trimmed match
    const record = data.records?.find(
      (r: any) => (r.fields.Slug || "").trim().toLowerCase() === trimmedSlug.toLowerCase(),
    )

    console.log("[v0] getProjectBySlug: Match found:", !!record)

    if (!record) {
      return { project: null, error: "Project not found" }
    }

    const fields = record.fields

    let category = ""
    if (Array.isArray(fields.Category)) {
      category = fields.Category.join(", ")
    } else if (fields.Category) {
      category = String(fields.Category)
    }

    let image = "/placeholder.svg?height=600&width=1200"
    if (fields.Image && Array.isArray(fields.Image) && fields.Image.length > 0) {
      image = fields.Image[0].url
    }

    const project: Project = {
      id: record.id,
      name: fields["Project Name"] || fields.Name || "Untitled Project",
      clientName: fields["Client Name"] || "",
      category: category || fields.Platform || "General",
      description: fields.Description || "",
      image: image,
      link: fields.Link || "",
      platform: fields.Platform || "",
      date: fields.Date || "",
      slug: (fields.Slug || "").trim(),
      status: fields.Status || "",
      serviceFocus: fields["Service Focus"] || "",
    }

    console.log("[v0] getProjectBySlug: Returning project:", project.name)

    return { project }
  } catch (err) {
    console.error("[v0] getProjectBySlug: Error:", err)
    return { project: null, error: err instanceof Error ? err.message : "Failed to fetch project" }
  }
}

export async function getAllProjects(): Promise<{ projects: Project[]; error?: string }> {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "Projects"

    if (!airtableApiKey || !airtableBaseId) {
      return { projects: [], error: "Airtable configuration missing" }
    }

    const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Airtable responded with status: ${response.status}`)
    }

    const data = await response.json()

    const projects: Project[] = (data.records || []).map((record: any) => {
      const fields = record.fields

      let category = ""
      if (Array.isArray(fields.Category)) {
        category = fields.Category.join(", ")
      } else if (fields.Category) {
        category = String(fields.Category)
      }

      let image = "/placeholder.svg?height=600&width=1200"
      if (fields.Image && Array.isArray(fields.Image) && fields.Image.length > 0) {
        image = fields.Image[0].url
      }

      return {
        id: record.id,
        name: fields["Project Name"] || fields.Name || "Untitled Project",
        clientName: fields["Client Name"] || "",
        category: category || fields.Platform || "General",
        description: fields.Description || "",
        image: image,
        link: fields.Link || "",
        platform: fields.Platform || "",
        date: fields.Date || "",
        slug: (fields.Slug || "").trim(),
        status: fields.Status || "",
        serviceFocus: fields["Service Focus"] || "",
      }
    })

    return { projects }
  } catch (err) {
    console.error("[v0] getAllProjects: Error:", err)
    return { projects: [], error: err instanceof Error ? err.message : "Failed to fetch projects" }
  }
}
