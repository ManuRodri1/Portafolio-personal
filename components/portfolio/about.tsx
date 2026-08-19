"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Database, Palette, Zap, ChevronDown } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { profile } from "@/lib/profile"

export default function About() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)

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

  const expertiseCards = [
    {
      icon: BarChart3,
      titleEn: "Business Intelligence",
      titleEs: "Inteligencia de Negocios",
      descriptionEn: "Power BI, Pentaho BI, SQL Server",
      descriptionEs: "Power BI, Pentaho BI, SQL Server",
    },
    {
      icon: Database,
      titleEn: "Data Modeling",
      titleEs: "Modelado de Datos",
      descriptionEn: "DAX, OLAP Cubes",
      descriptionEs: "DAX, Cubos OLAP",
    },
    {
      icon: Palette,
      titleEn: "Web Design",
      titleEs: "Diseño Web",
      descriptionEn: "HTML, CSS, UI/UX Responsive",
      descriptionEs: "HTML, CSS, UI/UX Responsivo",
    },
    {
      icon: Zap,
      titleEn: "Process Automation",
      titleEs: "Automatización de Procesos",
      descriptionEn: "Agile Management",
      descriptionEs: "Gestión Ágil",
    },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B]" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">{t("about.title")}</h2>
          <div className="w-24 h-1 bg-[#FF6052] mx-auto animate-expand-width shadow-[0_0_10px_rgba(255,96,82,0.8)]" />
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 mb-12">
          {/* Left Column: Image (45%) */}
          <div className="w-full lg:w-[45%] animate-on-scroll opacity-0">
            <Image
              src="/ABOUTME.jpeg"
              alt={`${profile.fullName} — BI Developer and data analytics specialist`}
              width={850}
              height={750}
              className="w-full h-full object-contain rounded-2xl shadow-[0_0_35px_rgba(255,96,82,0.5)] transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(255,96,82,0.7)] animate-fadeInUp"
              priority
            />
          </div>

          {/* Right Column: Text Content (55%) */}
          <div className="w-full lg:w-[55%] animate-on-scroll opacity-0 [animation-delay:200ms]">
            {/* Glass container with coral border */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-[#FF6052]/30 shadow-2xl">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 to-[#1C2541]/90 rounded-2xl -z-10" />

              {/* Subtitle */}
              <h3 className="text-xl sm:text-2xl font-sans font-semibold text-[#FF6052] mb-6">{t("about.subtitle")}</h3>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-[#C9D1D9] leading-relaxed">{t("about.p1")}</p>
                <p className="text-lg text-[#C9D1D9] leading-relaxed">{t("about.p2")}</p>

                {/* Expandable content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-lg text-[#C9D1D9] leading-relaxed mb-4">{t("about.p3")}</p>
                  <p className="text-lg text-[#C9D1D9] leading-relaxed mb-4">{t("about.p4")}</p>
                  <p className="text-lg text-[#C9D1D9] leading-relaxed">{t("about.p5")}</p>
                </div>

                {/* Read More Button */}
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  variant="ghost"
                  className="text-[#FF6052] hover:text-white hover:bg-[#FF6052]/20 transition-all duration-300 mt-4 group"
                >
                  {isExpanded ? t("about.readLess") : t("about.readMore")}
                  <ChevronDown
                    className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-on-scroll opacity-0 [animation-delay:400ms]">
          {/* Core Areas Title */}
          <h4 className="text-2xl font-sans font-semibold text-white mb-8 text-center">{t("about.expertiseTitle")}</h4>

          {/* Expertise Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {expertiseCards.map((card, index) => {
              const Icon = card.icon
              const title = language === "en" ? card.titleEn : card.titleEs
              const description = language === "en" ? card.descriptionEn : card.descriptionEs

              return (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border-[#FF6052]/30 p-5 hover:bg-white/10 hover:border-[#FF6052]/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,96,82,0.4)] group cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FF6052]/20 flex items-center justify-center group-hover:bg-[#FF6052]/40 transition-all">
                      <Icon className="w-6 h-6 text-[#FF6052] group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-base mb-2">{title}</h3>
                      <p className="text-white/70 text-sm leading-tight">{description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
