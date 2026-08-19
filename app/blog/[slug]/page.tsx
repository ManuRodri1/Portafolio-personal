import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getBlogPostBySlug, getBlogPosts } from "@/app/actions/get-blog-posts"
import CompanyHeader from "@/components/company/company-header"
import CompanyFooter from "@/components/company/company-footer"
import { CompanyLanguageProvider } from "@/contexts/company-language-context"
import BlogPostContent from "@/components/company/blog-post-content"
import RelatedPosts from "@/components/company/related-posts"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const { posts } = await getBlogPosts()

  return posts
    .filter((post) => post.slug && post.slug.trim() !== "")
    .map((post) => ({
      slug: post.slug.trim(),
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const { post } = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt
  const canonical = post.canonicalUrl || `https://www.jmrodri.site/blog/${post.slug}`
  const ogImage = post.coverImage

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.altText,
        },
      ],
      authors: ["JMDR Digital Solutions"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    keywords: post.tags,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const { post, error } = await getBlogPostBySlug(slug)

  if (error || !post) {
    notFound()
  }

  // JSON-LD Schema for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: "JMDR Digital Solutions",
      url: "https://www.jmrodri.site",
    },
    publisher: {
      "@type": "Organization",
      name: "JMDR Digital Solutions",
      url: "https://www.jmrodri.site",
      logo: {
        "@type": "ImageObject",
        url: "https://www.jmrodri.site/jmdr-logo.png",
      },
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  }

  return (
    <CompanyLanguageProvider>
      <CompanyHeader />
      <BlogPostContent post={post} />
      <RelatedPosts currentPost={post} />
      <CompanyFooter />
    </CompanyLanguageProvider>
  )
}

export const revalidate = 3600 // Revalidate every hour
