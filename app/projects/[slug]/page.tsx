import { notFound } from "next/navigation"
import { getProjectBySlug, getAllProjects } from "@/app/actions/get-project-by-slug"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Calendar, Tag } from "lucide-react"
import CompanyFooter from "@/components/company/company-footer"
import { CompanyLanguageProvider } from "@/contexts/company-language-context"
import ProjectCloseButton from "@/components/project-close-button"

export async function generateStaticParams() {
  const { projects } = await getAllProjects()

  if (!projects) return []

  return projects
    .filter((project) => project.slug && project.slug.trim() !== "")
    .map((project) => ({
      slug: project.slug.trim(),
    }))
}

export const dynamicParams = true
export const revalidate = 3600

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { project, error } = await getProjectBySlug(slug)

  if (error || !project) {
    notFound()
  }

  const isGitHub = project.platform?.toLowerCase().includes("github") || project.link?.includes("github.com")

  return (
    <CompanyLanguageProvider>
      <main className="min-h-screen bg-white">
        {/* Hero Section with Full-Width Image */}
        <section className="relative h-[60vh] md:h-[70vh] w-full bg-gray-900">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.name}
            fill
            className="object-cover opacity-90"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <ProjectCloseButton />

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-16">
            <div className="max-w-7xl mx-auto">
              {project.clientName && (
                <p className="text-[#E94547] font-semibold text-lg md:text-xl mb-4">{project.clientName}</p>
              )}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project.name}</h1>
            </div>
          </div>
        </section>

        {/* Project Meta Section */}
        <section className="py-12 px-6 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-6">
              {project.category && (
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">{project.category}</span>
                </div>
              )}

              {project.platform && (
                <div className="px-4 py-2 bg-white border border-gray-200 rounded-full">
                  <span className="text-sm font-medium text-gray-700">{project.platform}</span>
                </div>
              )}

              {project.date && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{project.date}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E244B] mb-8">Project Overview</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.description}</p>
            </div>
          </div>
        </section>

        {/* Scope & Deliverables */}
        {project.serviceFocus && (
          <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E244B] mb-8">Scope & Deliverables</h2>
              <div className="flex flex-wrap gap-3">
                {project.serviceFocus.split(",").map((item, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium"
                  >
                    {item.trim()}
                  </span>
                ))}
                {project.category && (
                  <span className="px-4 py-2 bg-[#E94547] text-white rounded-lg font-medium">{project.category}</span>
                )}
              </div>
            </div>
          </section>
        )}

        {/* External Link Section */}
        {project.link && (
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block p-12 bg-gradient-to-br from-[#1E244B] to-[#E94547] rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Explore the Project</h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1E244B] font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {isGitHub ? (
                    <>
                      <Github className="w-5 h-5" />
                      View on GitHub
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-5 h-5" />
                      View Live Project
                    </>
                  )}
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-24 px-6 bg-[#1E244B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Have a project in mind?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Let's discuss how our Business Intelligence solutions can help your organization.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-[#E94547] text-white font-bold text-lg rounded-lg hover:bg-[#d63d3f] transition-colors"
            >
              Work With Us
            </Link>
          </div>
        </section>
      </main>
      <CompanyFooter />
    </CompanyLanguageProvider>
  )
}
