"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { BarChart3, Code2, Users, Palette } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Skills() {
  const { language, t } = useLanguage()
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

  const skills = [
    {
      icon: BarChart3,
      title: t("skills.bi"),
      items: ["Power BI", "Pentaho BI", "SQL Server", "DAX", "OLAP Cubes", "Data Modeling"],
    },
    {
      icon: Code2,
      title: t("skills.programming"),
      items: ["C#", ".NET", "JavaScript", "TypeScript", "Next.js", "React"],
    },
    {
      icon: Users,
      title: t("skills.project"),
      items: ["Agile Methodology", "Scrum", "Process Automation", "Team Leadership", "Git", "Version Control"],
    },
    {
      icon: Palette,
      title: t("skills.web"),
      items: ["HTML5", "CSS3", "Responsive Design", "UI/UX", "Tailwind CSS", "Figma"],
    },
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(135deg, #0B132B 0%, #1C2541 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">{t("skills.title")}</h2>
          <div className="w-24 h-1 bg-[#FF6052] mx-auto" />
          <p className="mt-4 text-lg text-white/80">{t("skills.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <Card
                key={index}
                className="p-6 bg-white/95 hover:bg-white transition-all hover:scale-105 hover:shadow-xl animate-on-scroll opacity-0"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-[#FF6052]/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-[#FF6052]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-navy mb-4">{skill.title}</h3>
                  <ul className="space-y-2 text-sm text-slate-gray">
                    {skill.items.map((item, i) => (
                      <li key={i} className="flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#FF6052] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
