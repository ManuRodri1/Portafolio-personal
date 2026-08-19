"use server"

interface Client {
  id: string
  name: string
  company: string
  position: string
  testimonial: string
  order: number
  published: boolean
  clientPhoto: string
  companyLogo: string
}

export async function getClients(): Promise<{ clients: Client[]; error?: string }> {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID

    if (!airtableApiKey || !airtableBaseId) {
      return {
        clients: [],
        error: "Airtable configuration missing",
      }
    }

    const params = new URLSearchParams({
      filterByFormula: "{Published}=TRUE()",
      "sort[0][field]": "Order",
      "sort[0][direction]": "asc",
    })

    const url = `https://api.airtable.com/v0/${airtableBaseId}/Clients?${params.toString()}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch clients: ${response.status}`)
    }

    const data = await response.json()

    console.log("[v0] Airtable Clients Response - Total records:", data.records.length)

    const formattedClients: Client[] = data.records.map((record: any) => {
      const fields = record.fields

      let clientPhoto = ""
      if (fields["Client Photo"] && Array.isArray(fields["Client Photo"]) && fields["Client Photo"].length > 0) {
        clientPhoto = fields["Client Photo"][0].url
      }

      let companyLogo = ""
      console.log("[v0] Client:", fields.Name, "| Compani-logo field exists:", !!fields["Compani-logo"])
      if (fields["Compani-logo"]) {
        console.log("[v0] Compani-logo is array:", Array.isArray(fields["Compani-logo"]))
        console.log("[v0] Compani-logo length:", fields["Compani-logo"]?.length)
        console.log("[v0] Compani-logo first item:", fields["Compani-logo"]?.[0])
      }

      if (fields["Compani-logo"] && Array.isArray(fields["Compani-logo"]) && fields["Compani-logo"].length > 0) {
        companyLogo = fields["Compani-logo"][0].url
        console.log("[v0] Company logo URL extracted:", companyLogo)
      } else {
        console.log("[v0] No company logo found for:", fields.Name)
      }

      return {
        id: record.id,
        name: fields.Name || "",
        company: fields.Company || "",
        position: fields.Position || "",
        testimonial: fields.Testimonial || "",
        order: fields.Order || 0,
        published: fields.Published || false,
        clientPhoto,
        companyLogo,
      }
    })

    console.log("[v0] Total formatted clients:", formattedClients.length)
    console.log("[v0] Clients with company logos:", formattedClients.filter((c) => c.companyLogo).length)

    return { clients: formattedClients }
  } catch (err) {
    console.error("[v0] Error fetching clients:", err)
    return {
      clients: [],
      error: err instanceof Error ? err.message : "Failed to fetch clients",
    }
  }
}
