import { getBlogPosts, type BlogPost } from "@/app/actions/get-blog-posts"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"

interface RelatedPostsProps {
  currentPost: BlogPost
}

export default async function RelatedPosts({ currentPost }: RelatedPostsProps) {
  const { posts } = await getBlogPosts(currentPost.language)

  const relatedPosts = posts
    .filter((post) => {
      if (post.id === currentPost.id) return false
      if (!post.published) return false
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag))
      return sharedTags.length > 0
    })
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString(currentPost.language === "EN" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="bg-[#0B0F17] border-t border-white/10 py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
          {currentPost.language === "EN" ? "Related Articles" : "Artículos Relacionados"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#E94547]/40 transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="block relative h-40 overflow-hidden">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.altText}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/80 to-transparent" />
              </Link>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#E94547]/15 text-[#E94547] rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-base font-bold text-white group-hover:text-[#E94547] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-[#E94547] font-semibold hover:gap-2.5 transition-all"
                >
                  {currentPost.language === "EN" ? "Read More" : "Leer Más"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
