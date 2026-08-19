"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useCompanyLanguage } from "@/contexts/company-language-context"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/app/actions/get-blog-posts"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-[#FF5757]/20",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -120, rotate: rotate - 10 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-md border border-white/10",
            "shadow-[0_8px_40px_rgba(0,0,0,0.35)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const { t } = useCompanyLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const cardsPerPage = 4
  const totalPages = Math.ceil(posts.length / cardsPerPage)

  useEffect(() => {
    if (isPaused || posts.length <= cardsPerPage) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + cardsPerPage) % posts.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isPaused, posts.length, cardsPerPage])

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - cardsPerPage
      return newIndex < 0 ? Math.max(0, posts.length - cardsPerPage) : newIndex
    })
    setIsPaused(true)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + cardsPerPage
      return newIndex >= posts.length ? 0 : newIndex
    })
    setIsPaused(true)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  if (!posts || posts.length === 0) {
    return null
  }

  const visiblePosts = posts.slice(currentIndex, currentIndex + cardsPerPage)

  return (
    <section className="relative py-32 overflow-hidden bg-[#0B0F17]">
      {/* Background gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A295F]/30 via-transparent to-[#FF5757]/20 blur-3xl" />

      {/* Elegant floating shapes */}
      <ElegantShape width={450} height={105} rotate={-11} delay={0.2} className="left-[-6%] top-[10%]" />
      <ElegantShape width={340} height={88} rotate={15} delay={0.4} className="right-[-3%] bottom-[15%]" />
      <ElegantShape width={190} height={62} rotate={-15} delay={0.3} className="left-[16%] bottom-[8%]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t("blogPreview.title")}</h2>
          <p className="text-lg text-[#E6E9EF]/70 max-w-3xl mx-auto leading-relaxed">{t("blogPreview.subtitle")}</p>
        </motion.div>

        {/* Blog Carousel */}
        <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {visiblePosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-2xl h-full flex flex-col transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 cursor-pointer">
                      {/* Cover Image */}
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.altText}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Category badge */}
                        {post.category && (
                          <span className="inline-block text-[#FF6052] text-xs font-semibold mb-3 uppercase tracking-wider">
                            {post.category}
                          </span>
                        )}

                        {/* Title */}
                        <h3 className="text-white font-bold text-lg mb-3 line-clamp-2 leading-tight">{post.title}</h3>

                        {/* Excerpt */}
                        <p className="text-[#E6E9EF]/70 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Footer: Date + CTA */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                          <div className="flex items-center gap-2 text-[#E6E9EF]/50 text-xs">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>

                          <motion.span
                            whileHover={{ x: 2 }}
                            className="inline-flex items-center gap-1.5 text-[#FF6052] font-semibold text-sm group-hover:gap-2.5 transition-all duration-300"
                          >
                            {t("blogPreview.cta")}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {posts.length > cardsPerPage && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Previous posts"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              {/* Dots indicator */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageIndex = index * cardsPerPage
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(pageIndex)
                        setIsPaused(true)
                      }}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        currentIndex === pageIndex ? "bg-[#FF6052] w-8" : "bg-white/30 hover:bg-white/50",
                      )}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  )
                })}
              </div>

              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Next posts"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Section CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#E94547] text-white font-semibold rounded-lg shadow-lg hover:bg-[#d63e40] transition-all duration-300"
            >
              {t("blogPreview.visitBlog")}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent pointer-events-none" />
    </section>
  )
}
