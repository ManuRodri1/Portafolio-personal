"use server"

export interface ExperienceRecord {
  id: string
  title: string
  company: string
  dateLabel: string
  responsibilities: string[]
  icon: string
  order: number
}

export async function getExperience(): Promise<{ experiences: ExperienceRecord[]; error?: string }> {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID

    if (!airtableApiKey || !airtableBaseId) {
      return { experiences: [], error: "Airtable configuration missing" }
    }

    const params = new URLSearchParams({
      filterByFormula: "{Visible}=TRUE()",
      "sort[0][field]": "Order",
      "sort[0][direction]": "asc",
    })

    const url = `https://api.airtable.com/v0/${airtableBaseId}/Professional%20Experience?${params.toString()}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch experience: ${response.status}`)
    }

    const data = await response.json()

    if (!data.records || data.records.length === 0) {
      return { experiences: [] }
    }

    const experiences: ExperienceRecord[] = data.records.map((record: any) => {
      const fields = record.fields
      const rawResponsibilities: string = fields["Responsibilities"] || ""

      return {
        id: record.id,
        title: fields["Title"] || "",
        company: fields["Company"] || "",
        dateLabel: fields["Date Label"] || "",
        responsibilities: rawResponsibilities.split("\n").filter(Boolean),
        icon: (fields["Icon"] || "briefcase").toLowerCase(),
        order: fields["Order"] || 0,
      }
    })

    return { experiences }
  } catch (err) {
    console.error("[v0] Error fetching experience:", err)
    return {
      experiences: [],
      error: err instanceof Error ? err.message : "Failed to fetch experience",
    }
  }
}
