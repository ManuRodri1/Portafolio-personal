"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { GraduationCap, Award } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Education() {
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

  const education = [
    {
      degree: "Software Engineering",
      institution: "Universidad del Caribe",
      year: language === "en" ? "2021 – Expected Dec 2025" : "2021 – Esperado Dic 2025",
      description:
        language === "en"
          ? "Focused on software development, databases, and applied analytics."
          : "Enfocado en desarrollo de software, bases de datos y analítica aplicada.",
    },
    {
      degree: language === "en" ? "Programming Technician (.NET)" : "Técnico en Programación (.NET)",
      institution: "Centro de Tecnología Universal (CENTU)",
      year: "2023",
      description:
        language === "en"
          ? "Trained in C#, SQL, and system development fundamentals."
          : "Capacitado en C#, SQL y fundamentos de desarrollo de sistemas.",
    },
  ]

  const certifications = [
    {
      name: language === "en" ? "Intermediate C# .NET" : "C# .NET Intermedio",
      institution: "Instituto Tecnológico de las Américas (ITLA)",
      year: "2024",
      description:
        language === "en"
          ? "Intermediate-level training in object-oriented programming with C#."
          : "Formación intermedia en programación orientada a objetos con C#.",
    },
    {
      name:
        language === "en"
          ? "Programming Logic with JavaScript, Git, HTML, and CSS"
          : "Lógica de Programación con JavaScript, Git, HTML y CSS",
      institution: "Oracle Next Education",
      year: "2024",
      description:
        language === "en"
          ? "Course in modern programming logic and version control."
          : "Curso en lógica de programación moderna y control de versiones.",
    },
  ]

  return (
    <section id="education" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy mb-4">{t("edu.title")}</h2>
          <div className="w-24 h-1 bg-[#FF6052] mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education Column */}
          <div className="animate-on-scroll opacity-0 [animation-delay:200ms]">
            <h3 className="text-2xl font-serif font-bold text-navy mb-6 flex items-center gap-2">
              <GraduationCap className="w-7 h-7 text-[#FF6052]" />
              {t("edu.educationTitle")}
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="p-6 border-l-4 border-l-[#FF6052] hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold text-navy mb-2">{edu.degree}</h4>
                  <p className="text-[#FF6052] font-semibold mb-1">{edu.institution}</p>
                  <p className="text-sm text-slate-gray mb-3">{edu.year}</p>
                  <p className="text-slate-gray">{edu.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="animate-on-scroll opacity-0 [animation-delay:400ms]">
            <h3 className="text-2xl font-serif font-bold text-navy mb-6 flex items-center gap-2">
              <Award className="w-7 h-7 text-[#FF6052]" />
              {t("edu.certificationsTitle")}
            </h3>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="p-6 border-l-4 border-l-[#FF6052] hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold text-navy mb-2">{cert.name}</h4>
                  <p className="text-[#FF6052] font-semibold mb-1">{cert.institution}</p>
                  <p className="text-sm text-slate-gray mb-3">{cert.year}</p>
                  <p className="text-slate-gray">{cert.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
