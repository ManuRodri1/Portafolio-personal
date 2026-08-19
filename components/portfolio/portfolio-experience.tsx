"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { BriefcaseBusiness, Building2, UsersRound } from "lucide-react"
import {
  buildAreas,
  portfolioCopy,
  professionalExperience,
  throughline,
  type PortfolioLanguage,
} from "@/lib/portfolio-content"
import { profile } from "@/lib/profile"
import type { LocalizedPortfolioData } from "@/lib/portfolio/types"
import { CapabilityRelatedWork } from "@/components/portfolio/capability-related-work"
import { ProjectMedia } from "@/components/portfolio/project-media"
import { TechnologyIndex } from "@/components/portfolio/technology-index"
import { getExternalProjectLabel } from "@/lib/portfolio/presentation"

export interface PortfolioBlogPreview {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  language: "EN" | "ES"
  publishedAt: string
}

interface PortfolioExperiencePageProps {
  posts: PortfolioBlogPreview[]
  data: LocalizedPortfolioData
}

const capabilitySlugs = [
  "analytics-decision-systems",
  "automation-software-systems",
  "applied-ai",
] as const

const navigation = [
  { key: "work", href: "#work" },
  { key: "experience", href: "#experience" },
  { key: "aiLab", href: "#applied-ai" },
  { key: "insights", href: "#insights" },
] as const

function projectTeaser(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim()
  const firstSentence = normalized.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim()
  if (firstSentence && firstSentence.length <= 240) return firstSentence
  if (normalized.length <= 220) return normalized

  const shortened = normalized.slice(0, 220)
  return `${shortened.slice(0, shortened.lastIndexOf(" "))}…`
}

function SectionHeading({
  label,
  title,
  align = "wide",
}: {
  label: string
  title: string
  align?: "wide" | "split" | "compact"
}) {
  return (
    <header className={`portfolio-section-heading portfolio-section-heading--${align}`}>
      <p className="portfolio-section-label">{label}</p>
      <h2>{title}</h2>
    </header>
  )
}

function LanguageControl({
  language,
  onChange,
  label,
}: {
  language: PortfolioLanguage
  onChange: (language: PortfolioLanguage) => void
  label: string
}) {
  return (
    <div className="portfolio-language" role="group" aria-label={label}>
      <button
        type="button"
        aria-pressed={language === "en"}
        onClick={() => onChange("en")}
      >
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        aria-pressed={language === "es"}
        onClick={() => onChange("es")}
      >
        ES
      </button>
    </div>
  )
}

export default function PortfolioExperiencePage({
  posts,
  data,
}: PortfolioExperiencePageProps) {
  const [language, setLanguage] = useState<PortfolioLanguage>("en")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const shellRef = useRef<HTMLDivElement>(null)
  const copy = portfolioCopy[language]
  const portfolioData = data[language]
  const settings = portfolioData.siteSettings
  const capabilityBySlug = new Map(
    portfolioData.capabilities.map((capability) => [capability.slug, capability]),
  )
  const visiblePosts = posts.filter(
    (post) => post.language === language.toUpperCase(),
  )

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const revealTargets = [...shell.querySelectorAll<HTMLElement>("[data-reveal]")]
    shell.dataset.motionReady = "true"

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.visible = "true"
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    )

    revealTargets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 16)
    updateHeader()
    window.addEventListener("scroll", updateHeader, { passive: true })
    return () => window.removeEventListener("scroll", updateHeader)
  }, [])

  const formatDate = (date: string) => {
    if (!date) return ""

    const parsedDate = new Date(date)
    if (Number.isNaN(parsedDate.getTime())) return ""

    return new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-DO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(parsedDate)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="portfolio-shell" lang={language} ref={shellRef}>
      <a className="portfolio-skip-link" href="#portfolio-main">
        {copy.skip}
      </a>

      <header className="portfolio-header" data-scrolled={scrolled}>
        <div className="portfolio-header__inner">
          <Link href="/portfolio" className="portfolio-wordmark" aria-label={profile.fullName}>
            <span className="portfolio-wordmark__mark" aria-hidden="true">
              <Image
                src={profile.logo.src}
                alt=""
                width={profile.logo.width}
                height={profile.logo.height}
                sizes="48px"
              />
            </span>
            <span className="portfolio-wordmark__name">{profile.fullName}</span>
          </Link>
          <div className="portfolio-header__navigation" id="portfolio-navigation" data-open={menuOpen}>
            <nav aria-label="Portfolio">
              <ul>
                {navigation.map((item) => (
                  <li key={item.key}>
                    <a href={item.href} onClick={closeMenu}>{copy.nav[item.key]}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <Link href="/" className="portfolio-commercial-link" onClick={closeMenu}>
              {copy.nav.commercial}<span aria-hidden="true"> ↗</span>
            </Link>
            <div className="portfolio-header__mobile-controls">
              <LanguageControl
                language={language}
                onChange={(nextLanguage) => {
                  setLanguage(nextLanguage)
                  closeMenu()
                }}
                label={copy.footer.language}
              />
              <a className="portfolio-header__connect" href="#connect" onClick={closeMenu}>
                {copy.nav.connect}
              </a>
            </div>
          </div>
          <div className="portfolio-header__actions">
            <LanguageControl language={language} onChange={setLanguage} label={copy.footer.language} />
            <a
              className="portfolio-header__cv"
              href={settings.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              {copy.nav.cv}
            </a>
            <a className="portfolio-header__connect" href="#connect">{copy.nav.connect}</a>
            <button
              type="button"
              className="portfolio-menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="portfolio-navigation"
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? copy.nav.close : copy.nav.menu}
            </button>
          </div>
        </div>
      </header>

      <main id="portfolio-main">
        <section className="portfolio-hero" aria-labelledby="portfolio-title">
          <div className="portfolio-hero__copy" data-hero-sequence>
            <p className="portfolio-kicker">{copy.hero.eyebrow}</p>
            <h1 id="portfolio-title">{copy.hero.title}</h1>
            <p className="portfolio-hero__identity">{copy.hero.supportingTitle}</p>
            <p className="portfolio-hero__value">{copy.hero.value}</p>
            <div className="portfolio-hero__actions">
              <a
                className="portfolio-button portfolio-button--primary"
                href={portfolioData.featuredProjects.length > 0 ? "#work" : "#capabilities"}
              >
                {copy.hero.primary}
              </a>
              <a className="portfolio-button portfolio-button--secondary" href="#connect">
                {copy.hero.secondary}
              </a>
            </div>
          </div>

          <figure className="portfolio-hero__portrait" data-hero-photo>
            <div className="portfolio-hero__portrait-frame">
              <Image
                src={settings.heroPhotoUrl}
                alt={profile.photos.hero.alt}
                width={profile.photos.hero.width}
                height={profile.photos.hero.height}
                sizes="(min-width: 75rem) 40vw, (min-width: 60rem) 44vw, 100vw"
                priority
              />
            </div>
            <figcaption>
              <span>{profile.fullName}</span>
              <span>{copy.footer.discipline}</span>
            </figcaption>
          </figure>
        </section>

        <section className="portfolio-evidence" aria-label="Verified professional evidence">
          <ol>
            {copy.evidence.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </section>

        {portfolioData.featuredProjects.length > 0 ? (
        <section className="portfolio-section portfolio-work" id="work">
          <SectionHeading
            label={copy.sections.work[0]}
            title={copy.sections.work[1]}
            align="wide"
          />

          <div className="portfolio-systems">
            {portfolioData.featuredProjects.map((project, index) => (
              <article
                className="portfolio-system"
                data-direction={index % 2 === 0 ? "forward" : "reverse"}
                data-reveal="project"
                key={project.id}
              >
                <div className="portfolio-system__narrative">
                  <p className="portfolio-kicker">
                    {project.projectType || (language === "en" ? "Featured system" : "Sistema destacado")}
                  </p>
                  <h3>{project.title}</h3>
                  {project.subtitle || project.summary ? (
                    <p className="portfolio-system__subtitle">
                      {projectTeaser(project.subtitle || project.summary)}
                    </p>
                  ) : null}
                  {project.externalUrl || project.githubUrl ? (
                    <div className="portfolio-system__links">
                      {project.externalUrl ? (
                        <a className="portfolio-text-link" href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                          {getExternalProjectLabel(project.externalUrl, language)} <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                      {project.githubUrl ? (
                        <a className="portfolio-text-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          GitHub <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="portfolio-system__proof">
                  <ProjectMedia
                    media={project.media}
                    projectTitle={project.title}
                    projectType={project.projectType}
                  />
                  {project.systemBuilt ? <><p className="portfolio-system__proof-label">
                    {copy.projectLabels.system}
                  </p>
                  <p className="portfolio-system__built">{project.systemBuilt}</p></> : null}
                  {project.technologies.length > 0 ? <div>
                    <p className="portfolio-system__proof-label">
                      {copy.projectLabels.technologies}
                    </p>
                    <ul className="portfolio-tags" aria-label={copy.projectLabels.technologies}>
                      {project.technologies.map((technology) => (
                        <li key={technology.id}>{technology.name}</li>
                      ))}
                    </ul>
                  </div> : null}
                  {project.capabilities.length > 0 ? <div>
                    <p className="portfolio-system__proof-label">{copy.projectLabels.capabilities}</p>
                    <ul className="portfolio-inline-list portfolio-inline-list--dark">
                      {project.capabilities.map((capability) => <li key={capability.id}>{capability.name}</li>)}
                    </ul>
                  </div> : null}
                  {project.evidence || project.privacy ? <div className="portfolio-system__proof-note">
                    {project.evidence ? <p>
                      <strong>{copy.projectLabels.evidence}</strong>
                      {project.evidence}
                    </p> : null}
                    {project.privacy ? <p>
                      <strong>{copy.projectLabels.privacy}</strong>
                      {project.privacy}
                    </p> : null}
                  </div> : null}
                </div>
              </article>
            ))}
          </div>
        </section>
        ) : null}

        {portfolioData.technologies.length > 0 ? (
          <section className="portfolio-section portfolio-technology" aria-label={copy.sections.technology[0]}>
            <SectionHeading label={copy.sections.technology[0]} title={copy.sections.technology[1]} align="split" />
            <TechnologyIndex language={language} technologies={portfolioData.technologies} />
          </section>
        ) : null}

        <section className="portfolio-section portfolio-throughline">
          <SectionHeading
            label={copy.sections.throughline[0]}
            title={copy.sections.throughline[1]}
            align="split"
          />
          <ol className="portfolio-throughline__flow" data-reveal="throughline">
            {throughline.map((stage, index) => (
              <li key={stage.number} data-current={index === throughline.length - 1}>
                <span>{stage.number}</span>
                <p className="portfolio-throughline__status">{stage.status[language]}</p>
                <h3>{stage.title[language]}</h3>
                <p>{stage.body[language]}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="portfolio-section portfolio-build" id="capabilities">
          <SectionHeading
            label={copy.sections.build[0]}
            title={copy.sections.build[1]}
            align="compact"
          />
          <div className="portfolio-build__areas">
            {buildAreas.map((area, index) => {
              const capability = capabilityBySlug.get(capabilitySlugs[index])
              return (
              <article key={area.number} className="portfolio-build__area">
                <div className="portfolio-build__title">
                  <span>{area.number}</span>
                  <h3>{capability?.name || area.title[language]}</h3>
                </div>
                <dl>
                  <div>
                    <dt>{copy.buildLabels.problems}</dt>
                    <dd>{capability?.description || area.problems[language]}</dd>
                  </div>
                  <div>
                    <dt>{copy.buildLabels.capabilities}</dt>
                    <dd>
                      <ul className="portfolio-inline-list">
                        {area.capabilities.map((capability) => (
                          <li key={capability}>{capability}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt>{copy.buildLabels.evidence}</dt>
                    <dd>{area.evidence[language]}</dd>
                  </div>
                </dl>
                <p className="portfolio-status">
                  <span>{copy.buildLabels.status}</span>
                  {area.status[language]}
                </p>
                <CapabilityRelatedWork projects={capability?.projects ?? []} language={language} />
              </article>
              )
            })}
          </div>
        </section>

        <section className="portfolio-section portfolio-experience" id="experience">
          <SectionHeading
            label={copy.sections.experience[0]}
            title={copy.sections.experience[1]}
            align="wide"
          />
          <p className="portfolio-experience__intro">{copy.experienceIntro}</p>
          <ol className="portfolio-experience__list">
            {professionalExperience.map((experience, index) => (
              <li key={`${experience.organization}-${experience.period.en}`}>
                <p className="portfolio-experience__index">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="portfolio-experience__role">
                  <h3>{experience.position[language]}</h3>
                  <p>{experience.organization}</p>
                </div>
                <p className="portfolio-experience__period">
                  {experience.period[language]}
                </p>
                <dl>
                  <div>
                    <dt>{copy.experienceLabels.domain}</dt>
                    <dd>{experience.domain[language]}</dd>
                  </div>
                  <div>
                    <dt>{copy.experienceLabels.contribution}</dt>
                    <dd>{experience.contribution[language]}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="portfolio-section portfolio-ai"
          id="applied-ai"
          aria-labelledby="applied-ai-title"
        >
          <div className="portfolio-ai__intro">
            <p className="portfolio-section-label">{copy.sections.ai[0]}</p>
            <h2 id="applied-ai-title">{copy.ai.name}</h2>
            <p>{copy.ai.body}</p>
          </div>
          <div className="portfolio-ai__board">
            <div className="portfolio-ai__status">
              <span>{language === "en" ? "Status" : "Estado"}</span>
              <strong>{copy.ai.status}</strong>
            </div>
            <p className="portfolio-ai__focus">{copy.ai.focus}</p>
            <ol>
              {copy.ai.items.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
            <div className="portfolio-ai__stage">
              <span>{copy.ai.stageLabel}</span>
              <strong>{copy.ai.stage}</strong>
            </div>
            <p className="portfolio-ai__boundary">{copy.ai.note}</p>
          </div>
        </section>

        <section className="portfolio-section portfolio-insights" id="insights">
          <SectionHeading
            label={copy.sections.insights[0]}
            title={copy.sections.insights[1]}
            align="split"
          />
          <div className="portfolio-insights__layout">
            {visiblePosts.length > 0 ? (
              <div className="portfolio-insights__published">
                <h3>{copy.insights.published}</h3>
                <ol>
                  {visiblePosts.slice(0, 3).map((post) => (
                    <li key={post.id}>
                      <div>
                        <p>
                          {post.category}
                          {formatDate(post.publishedAt) ? (
                            <>
                              <span aria-hidden="true"> · </span>
                              <time dateTime={post.publishedAt}>
                                {formatDate(post.publishedAt)}
                              </time>
                            </>
                          ) : null}
                        </p>
                        <h4>{post.title}</h4>
                        {post.excerpt ? <p>{post.excerpt}</p> : null}
                      </div>
                      <Link className="portfolio-text-link" href={`/blog/${post.slug}`}>
                        {copy.insights.read} <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <Link className="portfolio-text-link" href="/blog">
                  {copy.insights.visit} <span aria-hidden="true">→</span>
                </Link>
              </div>
            ) : null}

            <aside className="portfolio-insights__exploring">
              <h3>{copy.insights.exploring}</h3>
              <ul>
                {copy.insights.topics.map((topic, index) => (
                  <li key={topic}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="portfolio-section portfolio-about" id="about">
          <SectionHeading
            label={copy.sections.about[0]}
            title={copy.sections.about[1]}
            align="compact"
          />
          <div className="portfolio-about__body">
            <div className="portfolio-about__copy">
              <p>{copy.about}</p>
            </div>
            <figure className="portfolio-about__portrait">
              <Image
                src={settings.aboutPhotoUrl}
                alt={profile.photos.about.alt}
                width={profile.photos.about.width}
                height={profile.photos.about.height}
                sizes="(min-width: 64rem) 36vw, 100vw"
              />
              <figcaption>{profile.name} · {settings.location}</figcaption>
            </figure>
            <div className="portfolio-about__facts">
              <p>
                <span>{language === "en" ? "Based in" : "Ubicación"}</span>
                {language === "en" ? "Santo Domingo, Dominican Republic" : "Santo Domingo, República Dominicana"}
              </p>
              <p>
                <span>{language === "en" ? "Current work" : "Trabajo actual"}</span>
                {language === "en" ? "BI · Data · Software · Applied AI" : "BI · Datos · Software · IA aplicada"}
              </p>
              <p>
                <span>{language === "en" ? "Current focus" : "Enfoque actual"}</span>
                {language === "en" ? "Private AI · RAG · Data-connected systems" : "IA privada · RAG · Sistemas conectados a datos"}
              </p>
            </div>
          </div>
        </section>

        <section className="portfolio-section portfolio-connect" id="connect">
          <SectionHeading
            label={copy.sections.connect[0]}
            title={copy.sections.connect[1]}
            align="wide"
          />
          <div className="portfolio-connect__options">
            {copy.cta.map((option, index) => {
              const href =
                index === 0
                  ? `mailto:${profile.email}?subject=Hiring%20or%20technical%20opportunity`
                  : index === 1
                    ? settings.linkedInUrl
                    : "/"

              const external = index === 1

              return (
                <article key={option.label}>
                  <span className="portfolio-connect__icon" aria-hidden="true">
                    {index === 0 ? <BriefcaseBusiness /> : index === 1 ? <UsersRound /> : <Building2 />}
                  </span>
                  <h3>{option.label}</h3>
                  <p>{option.body}</p>
                  {href.startsWith("/") ? (
                    <Link className="portfolio-text-link" href={href}>
                      {option.action} <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <a
                      className="portfolio-text-link"
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                    >
                      {option.action} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="portfolio-footer" data-reveal="footer">
        <div className="portfolio-footer__inner">
          <div className="portfolio-footer__mast">
            <div className="portfolio-footer__brand">
              <span className="portfolio-footer__logo" aria-hidden="true">
                <Image
                  src={profile.logo.src}
                  alt=""
                  width={profile.logo.width}
                  height={profile.logo.height}
                  sizes="72px"
                />
              </span>
              <p className="portfolio-footer__wordmark">{profile.fullName}</p>
            </div>
            <p>{copy.footer.discipline}</p>
            <p>
              {language === "en"
                ? "Santo Domingo, Dominican Republic"
                : "Santo Domingo, República Dominicana"}
            </p>
          </div>
          <div className="portfolio-footer__columns">
            <nav aria-label={copy.footer.explore}>
              <h2>{copy.footer.explore}</h2>
              <a href="#work">{copy.nav.work}</a>
              <a href="#experience">{copy.nav.experience}</a>
              <a href="#applied-ai">{copy.nav.aiLab}</a>
              <a href="#insights">{copy.nav.insights}</a>
            </nav>
            <nav aria-label={copy.footer.connect}>
              <h2>{copy.footer.connect}</h2>
              {settings.linkedInUrl ? <a href={settings.linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a> : null}
              {settings.githubUrl ? <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a> : null}
              {settings.instagramUrl ? <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a> : null}
              <a href={`mailto:${profile.email}`}>Email <span aria-hidden="true">↗</span></a>
            </nav>
            <nav aria-label={copy.footer.commercial}>
              <h2>{copy.footer.commercial}</h2>
              <Link href="/">JMDR Digital Solutions <span aria-hidden="true">↗</span></Link>
            </nav>
          </div>
          <div className="portfolio-footer__meta">
            <p>{copy.footer.copyright}</p>
            <LanguageControl language={language} onChange={setLanguage} label={copy.footer.language} />
          </div>
        </div>
      </footer>
    </div>
  )
}
