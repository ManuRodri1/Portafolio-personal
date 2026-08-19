"use client"

import { useId, useState } from "react"
import { ProjectMedia } from "@/components/portfolio/project-media"
import { getExternalProjectLabel } from "@/lib/portfolio/presentation"
import type { PortfolioProjectReference } from "@/lib/portfolio/types"

export function CapabilityRelatedWork({
  projects,
  language,
}: {
  projects: PortfolioProjectReference[]
  language: "en" | "es"
}) {
  const [expanded, setExpanded] = useState(false)
  const generatedId = useId()
  const panelId = `related-work-${generatedId.replace(/:/g, "")}`

  if (projects.length === 0) return null

  const label = language === "en" ? "View related work" : "Ver trabajo relacionado"

  return (
    <div className="portfolio-related-work">
      <button
        type="button"
        className="portfolio-text-link portfolio-related-work__toggle"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((current) => !current)}
      >
        <span>{label} · {projects.length}</span>
        <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
      </button>
      <div
        id={panelId}
        className="portfolio-related-work__panel"
        data-expanded={expanded}
        aria-hidden={!expanded}
        inert={!expanded}
      >
        <div className="portfolio-related-work__panel-inner">
          <div className="portfolio-related-work__intro">
            <p>Project Explorer</p>
            <span>{language === "en" ? "Published work connected to this practice." : "Trabajo publicado relacionado con esta práctica."}</span>
          </div>
          <ol>
            {projects.map((project) => {
            const primaryTechnologies = project.technologies.filter((item) => item.isPrimary)
            const visibleTechnologies = primaryTechnologies.length > 0
              ? primaryTechnologies
              : project.technologies.slice(0, 3)
            const externalDiffersFromGithub = project.externalUrl && project.externalUrl !== project.githubUrl

            return (
              <li key={project.id}>
                <article className="portfolio-explorer-card">
                  <ProjectMedia
                    media={project.media}
                    projectTitle={project.title}
                    projectType={project.projectType}
                    compact
                  />
                  <div className="portfolio-explorer-card__body">
                    <div className="portfolio-related-work__heading">
                      {project.projectType ? <p>{project.projectType}</p> : null}
                      <h4>{project.title}</h4>
                    </div>
                    {project.summary ? <p>{project.summary}</p> : null}
                    {visibleTechnologies.length > 0 ? (
                      <ul className="portfolio-inline-list" aria-label={language === "en" ? "Primary technologies" : "Tecnologías principales"}>
                        {visibleTechnologies.map((technology) => <li key={technology.id}>{technology.name}</li>)}
                      </ul>
                    ) : null}
                    {externalDiffersFromGithub || project.githubUrl ? (
                      <div className="portfolio-related-work__links">
                        {externalDiffersFromGithub ? (
                          <a href={project.externalUrl as string} target="_blank" rel="noopener noreferrer">
                            {getExternalProjectLabel(project.externalUrl as string, language)}<span aria-hidden="true"> ↗</span>
                          </a>
                        ) : null}
                        {project.githubUrl ? (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            GitHub<span aria-hidden="true"> ↗</span>
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </article>
              </li>
            )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}
