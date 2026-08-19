import Image from "next/image"
import type { PortfolioProjectMedia } from "@/lib/portfolio/types"

function isCloudinaryUrl(src: string) {
  try {
    return new URL(src).hostname === "res.cloudinary.com"
  } catch {
    return false
  }
}

function projectMark(title: string) {
  const words = title.split(/\s+/).filter(Boolean)
  return words.slice(0, 3).map((word) => word[0]).join("").toUpperCase()
}

export function ProjectMedia({
  media,
  projectTitle,
  projectType,
  compact = false,
}: {
  media: PortfolioProjectMedia[]
  projectTitle: string
  projectType?: string
  compact?: boolean
}) {
  const item = media.find((candidate) => candidate.featured) ?? media[0]

  if (!item && compact) return null

  if (!item) {
    return (
      <figure
        className="portfolio-project-media portfolio-project-media--fallback"
        data-compact={compact}
        aria-label={`${projectTitle} project record`}
      >
        <span aria-hidden="true">{projectMark(projectTitle)}</span>
        <figcaption>
          <small>{projectType || "Project record"}</small>
          <strong>{projectTitle}</strong>
        </figcaption>
      </figure>
    )
  }

  if (item.mediaType === "video") {
    return (
      <figure className="portfolio-project-media portfolio-project-media--images" data-compact={compact}>
        <video controls preload="metadata" playsInline aria-label={item.alt || projectTitle}>
          <source src={item.url} />
        </video>
        {item.caption ? <figcaption>{item.caption}</figcaption> : null}
      </figure>
    )
  }

  const width = item.width && item.width > 0 ? item.width : 1600
  const height = item.height && item.height > 0 ? item.height : 900

  return (
    <figure className="portfolio-project-media portfolio-project-media--images" data-compact={compact}>
      <div>
        {isCloudinaryUrl(item.url) ? (
          <Image
            src={item.url}
            alt={item.alt || projectTitle}
            width={width}
            height={height}
            sizes={compact ? "(min-width: 48rem) 24vw, 100vw" : "(min-width: 64rem) 42vw, 100vw"}
          />
        ) : (
          // Media normally comes from Cloudinary; this safe fallback keeps valid external URLs renderable.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.url} alt={item.alt || projectTitle} width={width} height={height} loading="lazy" />
        )}
      </div>
      {item.caption ? <figcaption>{item.caption}</figcaption> : null}
    </figure>
  )
}
