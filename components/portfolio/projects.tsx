"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { AlertCircle, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { getProjects } from "@/app/actions/get-projects"

interface Project {
  id: string
  name: string
  category: string
  description: string
  image: string
  link: string
  platform: string
  date: string
  slug: string
}

export default function Projects() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects()
        if (result.error) {
          setError(true)
          setErrorMessage(result.error)
        } else {
          setProjects(result.projects)
        }
        setLoading(false)
      } catch (err) {
        setError(true)
        setErrorMessage(err instanceof Error ? err.message : "Unknown error")
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const handleProjectClick = (slug: string) => {
    sessionStorage.setItem("projectReferrer", pathname)
    sessionStorage.setItem("projectScrollPosition", window.scrollY.toString())
  }

  return (
    <section
      id="projects"
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #0B132B 0%, #1C2541 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#FF6052] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF6052] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            {t("projects.title")}
          </h2>
          <div className="w-24 h-1 bg-[#FF6052] mx-auto mb-4" />
          <p className="text-lg text-white/80 max-w-2xl mx-auto">{t("projects.subtitle")}</p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6052]" />
            <p className="text-white/80 mt-4">Cargando proyectos...</p>
          </div>
        )}

        {error && (
          <div className="animate-fadeInUp [animation-delay:200ms]">
            <Card className="p-12 text-center bg-[#1C2541]/80 backdrop-blur-sm border-[#FF6052]/50">
              <AlertCircle className="w-12 h-12 text-[#FF6052] mx-auto mb-4" />
              <p className="text-lg text-white/90 mb-2">{t("projects.description")}</p>
              <p className="text-sm text-[#FF6052] font-medium">{t("projects.placeholder")}</p>
              {errorMessage && <p className="text-xs text-white/60 mt-4 font-mono">Debug: {errorMessage}</p>}
            </Card>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="group animate-fadeInUp bg-[#1C2541]/80 backdrop-blur-sm border border-[#FF6052]/50 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(255,96,82,0.3)] hover:shadow-[0_0_35px_rgba(255,96,82,0.5)] hover:scale-105 transition-all duration-300"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#FF6052] text-sm font-semibold uppercase tracking-wide">
                      {project.category || project.platform || "Project"}
                    </span>
                    {project.date && <span className="text-white/50 text-xs">{project.date}</span>}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-3 leading-tight">{project.name}</h3>

                  <p className="text-[#C9D1D9] text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>

                  {project.slug && (
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={() => handleProjectClick(project.slug)}
                      className="inline-flex items-center gap-2 w-full justify-center bg-[#FF6052] hover:bg-[#E54D3F] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-[0_4px_15px_rgba(255,96,82,0.3)] hover:shadow-[0_6px_20px_rgba(255,96,82,0.5)] hover:gap-3"
                    >
                      {t("projects.viewProject") || "Ver Proyecto"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/80 text-lg">
              No se encontraron proyectos. Por favor, agrega proyectos a tu base de Airtable.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
