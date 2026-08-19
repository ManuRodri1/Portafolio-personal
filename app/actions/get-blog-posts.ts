"use server"

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  altText: string
  seoTitle?: string
  seoDescription?: string
  canonicalUrl?: string
  tags: string[]
  category: string
  language: "EN" | "ES"
  published: boolean
  publishedAt: string
  updatedAt: string
}

export async function getBlogPosts(language?: "EN" | "ES"): Promise<{ posts: BlogPost[]; error?: string }> {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID

    if (!airtableApiKey || !airtableBaseId) {
      return {
        posts: [],
        error: "Airtable configuration missing",
      }
    }

    let filterFormula = "{Published}=TRUE()"
    if (language) {
      filterFormula = `AND({Published}=TRUE(), {Language}='${language}')`
    }

    const params = new URLSearchParams({
      filterByFormula: filterFormula,
      "sort[0][field]": "Published At",
      "sort[0][direction]": "desc",
    })

    const url = `https://api.airtable.com/v0/${airtableBaseId}/BlogPosts?${params.toString()}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      next: { revalidate: 3600 }, // Revalidate every hour for ISR
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status}`)
    }

    const data = await response.json()

    const formattedPosts: BlogPost[] = data.records.map((record: any) => {
      const fields = record.fields

      let coverImage = "/placeholder.svg?height=400&width=800"
      if (fields["Cover Image"] && Array.isArray(fields["Cover Image"]) && fields["Cover Image"].length > 0) {
        coverImage = fields["Cover Image"][0].url
      }

      let tags: string[] = []
      if (Array.isArray(fields.Tags)) {
        tags = fields.Tags
      }

      return {
        id: record.id,
        title: fields.Title || "Untitled",
        slug: (fields.Slug || "").trim(),
        excerpt: fields.Excerpt || "",
        content: fields["Content (Markdown)"] || "",
        coverImage,
        altText: fields["Alt Text"] || fields.Title || "",
        seoTitle: fields["SEO Title"],
        seoDescription: fields["SEO Description"],
        canonicalUrl: fields["Canonical URL"],
        tags,
        category: fields.Category || "General",
        language: fields.Language || "EN",
        published: fields.Published || false,
        publishedAt: fields["Published At"] || "",
        updatedAt: fields["Updated At"] || "",
      }
    })

    return { posts: formattedPosts }
  } catch (err) {
    console.error("[v0] Error fetching blog posts:", err)
    return {
      posts: [],
      error: err instanceof Error ? err.message : "Failed to fetch blog posts",
    }
  }
}

export async function getBlogPostBySlug(slug: string): Promise<{ post?: BlogPost; error?: string }> {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID

    if (!airtableApiKey || !airtableBaseId) {
      return { error: "Airtable configuration missing" }
    }

    const trimmedSlug = slug.trim()

    // Use TRIM() in formula to handle slugs with trailing/leading whitespace in Airtable
    const filterFormula = `AND(TRIM({Slug})='${trimmedSlug}', {Published}=TRUE())`

    const params = new URLSearchParams({
      filterByFormula: filterFormula,
      maxRecords: "1",
    })

    const url = `https://api.airtable.com/v0/${airtableBaseId}/BlogPosts?${params.toString()}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch blog post: ${response.status}`)
    }

    const data = await response.json()

    if (data.records.length === 0) {
      return { error: "Post not found" }
    }

    const record = data.records[0]
    const fields = record.fields

    let coverImage = "/placeholder.svg?height=400&width=800"
    if (fields["Cover Image"] && Array.isArray(fields["Cover Image"]) && fields["Cover Image"].length > 0) {
      coverImage = fields["Cover Image"][0].url
    }

    let tags: string[] = []
    if (Array.isArray(fields.Tags)) {
      tags = fields.Tags
    }

    const post: BlogPost = {
      id: record.id,
      title: fields.Title || "Untitled",
      slug: (fields.Slug || "").trim(),
      excerpt: fields.Excerpt || "",
      content: fields["Content (Markdown)"] || "",
      coverImage,
      altText: fields["Alt Text"] || fields.Title || "",
      seoTitle: fields["SEO Title"],
      seoDescription: fields["SEO Description"],
      canonicalUrl: fields["Canonical URL"],
      tags,
      category: fields.Category || "General",
      language: fields.Language || "EN",
      published: fields.Published || false,
      publishedAt: fields["Published At"] || "",
      updatedAt: fields["Updated At"] || "",
    }

    return { post }
  } catch (err) {
    console.error("[v0] Error fetching blog post:", err)
    return {
      error: err instanceof Error ? err.message : "Failed to fetch blog post",
    }
  }
}
