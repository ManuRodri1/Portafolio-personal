"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Briefcase, BarChart, Code, Database, Building, Laptop } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { ExperienceRecord } from "@/app/actions/get-experience"

const iconMap: Record<string, React.ReactNode> = {
  briefcase: <Briefcase className="w-6 h-6 text-[#FF6052]" />,
  chart: <BarChart className="w-6 h-6 text-[#FF6052]" />,
  code: <Code className="w-6 h-6 text-[#FF6052]" />,
  database: <Database className="w-6 h-6 text-[#FF6052]" />,
  building: <Building className="w-6 h-6 text-[#FF6052]" />,
  laptop: <Laptop className="w-6 h-6 text-[#FF6052]" />,
}

interface ExperienceProps {
  experiences: ExperienceRecord[]
}

export default function Experience({ experiences }: ExperienceProps) {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy mb-4">{t("exp.title")}</h2>
          <div className="w-24 h-1 bg-[#FF6052] mx-auto" />
          <p className="mt-4 text-lg text-slate-gray">{t("exp.subtitle")}</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#FF6052]/30 hidden md:block" />

          <div className="space-y-8">
            {experiences.length === 0 ? (
              <p className="text-center text-slate-gray">No experience records found.</p>
            ) : (
              experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="relative animate-on-scroll opacity-0"
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-[#FF6052] border-4 border-white shadow-md hidden md:block" />

                  <Card className="ml-0 md:ml-20 p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-[#FF6052]">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#FF6052]/10 rounded-lg">
                        {iconMap[exp.icon] ?? iconMap["briefcase"]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-serif font-bold text-navy mb-1">{exp.title}</h3>
                        <p className="text-[#FF6052] font-semibold mb-2">{exp.company}</p>
                        <p className="text-sm text-slate-gray mb-4">{exp.dateLabel}</p>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-gray">
                              <span className="text-[#FF6052] mt-1.5">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
