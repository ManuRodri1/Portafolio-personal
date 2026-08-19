"use server"

import type { BlogPost } from "./get-blog-posts"

export async function getFeaturedBlogPosts(language?: "EN" | "ES"): Promise<{ posts: BlogPost[]; error?: string }> {
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
      maxRecords: "4", // Only fetch 4 posts for homepage
    })

    const url = `https://api.airtable.com/v0/${airtableBaseId}/BlogPosts?${params.toString()}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
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
        slug: fields.Slug || "",
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
    console.error("[v0] Error fetching featured blog posts:", err)
    return {
      posts: [],
      error: err instanceof Error ? err.message : "Failed to fetch blog posts",
    }
  }
}
