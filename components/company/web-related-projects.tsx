"use client"

import { useEffect, useState } from "react"
import { useCompanyLanguage } from "@/contexts/company-language-context"
import { getFilteredProjects } from "@/app/actions/get-filtered-projects"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  id: string
  name: string
  clientName: string
  description: string
  image: string
  platform: string
  slug: string
  date?: string
  serviceFocus?: string
}

export default function WebRelatedProjects() {
  const { t } = useCompanyLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const projectsPerPage = 4

  useEffect(() => {
    async function loadProjects() {
      setLoading(true)
      console.log("[v0] WebRelatedProjects: Fetching projects with Service Focus = 'Web Solutions'")
      const { projects, error } = await getFilteredProjects("Web Solutions")

      console.log("[v0] WebRelatedProjects: Response received")
      console.log("[v0] WebRelatedProjects: Projects count:", projects.length)
      console.log("[v0] WebRelatedProjects: Error:", error)

      if (projects.length > 0) {
        console.log("[v0] WebRelatedProjects: First project:", projects[0])
        console.log(
          "[v0] WebRelatedProjects: All service focuses:",
          projects.map((p) => p.serviceFocus || "EMPTY"),
        )
      }

      if (error) {
        setError(error)
      } else {
        const projectsWithSlugs = projects.filter((p) => p.slug && p.slug.trim() !== "")
        console.log("[v0] WebRelatedProjects: Projects with slugs:", projectsWithSlugs.length)
        setProjects(projectsWithSlugs)
      }
      setLoading(false)
    }

    loadProjects()
  }, [])

  const truncateDescription = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text
    const truncated = text.slice(0, maxLength)
    const lastSpace = truncated.lastIndexOf(" ")
    return truncated.slice(0, lastSpace) + "..."
  }

  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const startIndex = currentPage * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = projects.slice(startIndex, endIndex)

  useEffect(() => {
    if (!autoRotate || projects.length <= projectsPerPage) return

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 5000) // Rotate every 5 seconds

    return () => clearInterval(interval)
  }, [autoRotate, projects.length, totalPages, projectsPerPage])

  const handleNext = () => {
    setAutoRotate(false) // Pause auto-rotation on user interaction
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrev = () => {
    setAutoRotate(false) // Pause auto-rotation on user interaction
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleDotClick = (index: number) => {
    setAutoRotate(false) // Pause auto-rotation on user interaction
    setCurrentPage(index)
  }

  if (loading) {
    return (
      <section
        id="web-projects"
        className="py-20 px-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(30, 36, 75, 0.03) 0%, rgba(233, 69, 71, 0.05) 50%, rgba(255, 255, 255, 0.8) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#E94547] border-r-transparent"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error || projects.length === 0) {
    return (
      <section
        id="web-projects"
        className="py-20 px-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(30, 36, 75, 0.03) 0%, rgba(233, 69, 71, 0.05) 50%, rgba(255, 255, 255, 0.8) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E244B] mb-4">{t("web.relatedProjects.title")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("web.relatedProjects.description")}</p>
          </div>
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-2">No web projects found with Service Focus = "Web Solutions"</p>
            <p className="text-sm text-gray-400">
              Check Airtable to ensure projects have the correct Service Focus value
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="web-projects"
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(30, 36, 75, 0.03) 0%, rgba(233, 69, 71, 0.05) 50%, rgba(255, 255, 255, 0.8) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E244B] mb-4">{t("web.relatedProjects.title")}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("web.relatedProjects.description")}</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {currentProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                {project.clientName && <p className="text-sm font-medium text-[#E94547] mb-2">{project.clientName}</p>}

                <h3 className="text-xl font-bold text-[#1E244B] mb-3">{project.name}</h3>

                <p className="text-gray-600 mb-4 line-clamp-3">{truncateDescription(project.description)}</p>

                {project.platform && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                      {project.platform}
                    </span>
                  </div>
                )}

                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-[#E94547] font-medium hover:gap-3 transition-all group"
                >
                  {t("web.relatedProjects.cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white border border-gray-300 hover:border-[#E94547] hover:bg-[#E94547] hover:text-white transition-all duration-300"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPage ? "bg-[#E94547] w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white border border-gray-300 hover:border-[#E94547] hover:bg-[#E94547] hover:text-white transition-all duration-300"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
