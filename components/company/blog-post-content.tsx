"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight } from "lucide-react"
import type { Components } from "react-markdown"
import type { BlogPost } from "@/app/actions/get-blog-posts"
import { useCompanyLanguage } from "@/contexts/company-language-context"

interface BlogPostContentProps {
  post: BlogPost
}

// Custom markdown components for premium dark editorial styling
const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold text-white mt-14 mb-6 leading-tight tracking-tight">{children}</h1>
  ),
  h2: ({ children }) => (
    <>
      <div className="w-16 h-px bg-[#E94547]/40 my-10" />
      <h2 className="text-3xl font-bold text-white mt-2 mb-5 leading-snug">{children}</h2>
    </>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold text-white/90 mt-10 mb-4 leading-snug">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold text-white/80 mt-8 mb-3">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-lg text-gray-300 leading-7 mb-6">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#E94547] underline underline-offset-4 decoration-[#E94547]/40 hover:decoration-[#E94547] transition-all duration-200"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-gray-200 italic">{children}</em>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 pl-6 border-l-4 border-[#E94547] bg-white/5 backdrop-blur-sm rounded-r-lg py-4 pr-6">
      <div className="text-lg text-gray-200 italic leading-relaxed">{children}</div>
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="my-6 space-y-3 pl-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 space-y-3 pl-5 list-decimal marker:text-[#E94547]">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-3 text-lg text-gray-300 leading-7">
      <span className="mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#E94547]" />
      <span>{children}</span>
    </li>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-")
    if (isBlock) {
      return (
        <code className="block bg-[#0B0F17] text-[#E94547] p-6 rounded-lg overflow-x-auto text-sm font-mono border border-white/10 my-6 leading-6">
          {children}
        </code>
      )
    }
    return (
      <code className="bg-white/10 text-[#E94547] px-2 py-0.5 rounded text-sm font-mono">{children}</code>
    )
  },
  pre: ({ children }) => (
    <pre className="my-6 rounded-xl overflow-hidden border border-white/10 bg-[#0B0F17]">{children}</pre>
  ),
  img: ({ src, alt }) => (
    <span className="block my-10">
      <Image
        src={typeof src === "string" ? src : "/placeholder.svg"}
        alt={alt || ""}
        width={800}
        height={450}
        className="w-full rounded-xl shadow-2xl border border-white/10 object-cover"
      />
      {alt && <span className="block text-center text-sm text-gray-500 mt-3 italic">{alt}</span>}
    </span>
  ),
  hr: () => (
    <div className="my-12 flex items-center gap-4">
      <div className="flex-1 h-px bg-white/10" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#E94547]/60" />
      <div className="flex-1 h-px bg-white/10" />
    </div>
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-white/5 text-white font-semibold">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-white/5">{children}</tbody>
  ),
  tr: ({ children }) => <tr className="hover:bg-white/3 transition-colors">{children}</tr>,
  th: ({ children }) => <th className="px-6 py-3 text-sm uppercase tracking-wider text-gray-400">{children}</th>,
  td: ({ children }) => <td className="px-6 py-4 text-gray-300 text-sm">{children}</td>,
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const { language } = useCompanyLanguage()

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const showUpdated = post.updatedAt && post.updatedAt !== post.publishedAt

  // Estimate reading time: ~200 words per minute
  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <article className="min-h-screen bg-[#0B0F17]">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[520px]">
        <div className="absolute inset-0">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.altText}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17]/60 via-[#0B0F17]/70 to-[#0B0F17]" />
        </div>

        <div className="relative h-full max-w-3xl mx-auto px-6 flex flex-col justify-end pb-16 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <span className="inline-block px-4 py-1.5 bg-[#E94547] text-white rounded-full text-xs font-semibold uppercase tracking-widest">
              {post.category}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-pretty">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-gray-300 leading-7 max-w-2xl text-pretty">{post.excerpt}</p>
            )}

            <div className="flex flex-wrap items-center gap-5 text-sm text-white/60 pt-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
              {showUpdated && (
                <div className="flex items-center gap-1.5">
                  <span className="text-white/40">Updated:</span>
                  <span>{formatDate(post.updatedAt)}</span>
                </div>
              )}
              <span className="font-semibold text-white/80">JMDR Digital Solutions</span>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Tag className="w-3.5 h-3.5 text-white/40" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/70 rounded-full text-xs border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Article Body ─────────────────────────────────────── */}
      <section className="bg-[#0B0F17] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {/* Override li renderer to avoid nested span issue */}
            <div className="[&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-lg [&_li]:text-gray-300 [&_li]:leading-7 [&_li]:my-2">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  ...markdownComponents,
                  // Override li to avoid the span-inside-p nesting warning
                  li: ({ children }) => (
                    <li className="text-lg text-gray-300 leading-7 my-2 pl-1">{children}</li>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* ── Divider ──────────────────────────────────────── */}
          <div className="my-16 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E94547]/60" />
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* ── Tags Footer ──────────────────────────────────── */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-16">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 rounded-full text-sm hover:border-[#E94547]/50 hover:text-white transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* ── CTA Card ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-[#E94547]/30 bg-white/5 backdrop-blur-sm p-8 md:p-10"
          >
            {/* Subtle gradient accent */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E94547]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E94547]">
                {language === "en" ? "Work with us" : "Trabaja con nosotros"}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                {language === "en"
                  ? "Ready to transform your data into decisions?"
                  : "¿Listo para transformar tus datos en decisiones?"}
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-lg">
                {language === "en"
                  ? "At JMDR Digital Solutions we design BI systems, dashboards, and digital processes that give your organization real visibility — and real results."
                  : "En JMDR Digital Solutions diseñamos sistemas BI, dashboards y procesos digitales que dan a tu organización visibilidad real — y resultados reales."}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#E94547] hover:bg-[#c93a3b] text-white font-semibold rounded-lg transition-all duration-300 shadow-[0_4px_15px_rgba(233,69,71,0.35)] hover:shadow-[0_6px_25px_rgba(233,69,71,0.5)] hover:gap-3"
                >
                  {language === "en" ? "Request a Consultation" : "Solicitar una Consulta"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-semibold rounded-lg transition-all duration-300 hover:gap-3"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {language === "en" ? "Back to Blog" : "Volver al Blog"}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  )
}
