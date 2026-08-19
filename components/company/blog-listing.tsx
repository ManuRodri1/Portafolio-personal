"use client"

import { useState, useMemo, useEffect } from "react"
import { useCompanyLanguage } from "@/contexts/company-language-context"
import type { BlogPost } from "@/app/actions/get-blog-posts"
import { getBlogPosts } from "@/app/actions/get-blog-posts"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Calendar, TagIcon } from "lucide-react"

interface BlogListingProps {
  // Initial posts passed from the server (EN by default)
  initialPosts: BlogPost[]
}

export default function BlogListing({ initialPosts }: BlogListingProps) {
  const { t, language } = useCompanyLanguage()
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Re-fetch posts from Airtable whenever the language changes
  useEffect(() => {
    const lang = language.toUpperCase() as "EN" | "ES"
    setLoading(true)
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedTags([])
    getBlogPosts(lang).then(({ posts: fetched }) => {
      setPosts(fetched ?? [])
      setLoading(false)
    })
  }, [language])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((post) => post.category)))
    return ["all", ...cats]
  }, [posts])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
    return Array.from(tags)
  }, [posts])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag))
      return matchesSearch && matchesCategory && matchesTags
    })
  }, [posts, searchQuery, selectedCategory, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="py-20 bg-gradient-to-b from-[#1E244B]/5 via-[#E94547]/5 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t("blog.search.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E94547] focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">{t("blog.filter.category")}:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[#1E244B] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-[#1E244B]"
                }`}
              >
                {category === "all" ? t("blog.filter.all") : category}
              </button>
            ))}
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">{t("blog.filter.tags")}:</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                    selectedTags.includes(tag)
                      ? "bg-[#E94547] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <TagIcon className="w-3 h-3" />
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#E94547]/30 border-t-[#E94547] rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-8">
              {t("blog.results.showing")} {filteredPosts.length} {t("blog.results.posts")}
            </p>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-gray-500">{t("blog.noPosts")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.altText}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <span className="px-3 py-1 bg-[#1E244B]/10 text-[#1E244B] rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-xl font-bold text-[#1E244B] group-hover:text-[#E94547] transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-block mt-4 text-[#E94547] font-semibold hover:underline"
                      >
                        {t("blog.readMore")} →
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
