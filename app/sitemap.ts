import type { MetadataRoute } from "next"
import { getBlogPosts } from "@/app/actions/get-blog-posts"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.jmrodri.site"
  const currentDate = new Date()

  const { posts } = await getBlogPosts()
  const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    // Home page
    {
      url: base,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Language routes
    {
      url: `${base}/en`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/es`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Main sections
    {
      url: `${base}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/experience`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/projects`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/skills`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Service pages
    {
      url: `${base}/services/business-intelligence`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/services/web-solutions`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Blog
    {
      url: `${base}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPostEntries,
    // Portfolio
    {
      url: `${base}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]
}
