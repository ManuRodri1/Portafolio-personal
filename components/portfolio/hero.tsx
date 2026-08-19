"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { profile } from "@/lib/profile"

export default function Hero() {
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
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B132B] via-[#1C2541] to-[#FF6052]/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6052] rounded-full blur-[150px] opacity-20 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-on-scroll opacity-0">
            <div className="space-y-4">
              {/* H1 always contains full legal name for personal SEO */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                {profile.fullName}
              </h1>
              <p className="text-2xl sm:text-3xl font-semibold text-[#FF6052] drop-shadow-md">{t("hero.title")}</p>
            </div>

            <p className="text-lg text-white/90 leading-relaxed max-w-2xl text-pretty drop-shadow">
              {t("hero.description")}
            </p>

            {/* SEO reinforcement: hidden from visual layout but readable by crawlers */}
            <p className="sr-only">
              {profile.fullName} is a Business Intelligence Developer and web solutions specialist based in
              the Dominican Republic. Expert in Power BI, Pentaho BI, SQL Server, DAX, OLAP data modeling, and process
              automation. Founder of JMDR Digital Solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#FF6052] hover:bg-[#FF6052]/90 text-white font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(255,96,82,0.5)] transition-all hover:scale-105"
              >
                <a href="#contact">
                  <Mail className="w-5 h-5 mr-2" />
                  {t("hero.cta1")}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-[#FF6052] text-[#FF6052] hover:bg-[#FF6052] hover:text-white font-semibold bg-transparent backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg"
              >
                <a href="#projects">
                  {t("hero.cta2")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-on-scroll opacity-0 [animation-delay:200ms]">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-[#FF6052] rounded-full blur-3xl opacity-40 animate-glow-pulse" />
              <div className="absolute inset-0 bg-[#FF6052] rounded-full blur-2xl opacity-30 animate-glow" />
              <Image
                src="/jose-photo.jpg"
                alt={`${profile.fullName} — Business Intelligence Developer and founder of JMDR Digital Solutions`}
                width={450}
                height={450}
                className="relative rounded-full w-72 h-72 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] object-cover border-4 border-white/20 shadow-2xl animate-zoom-in"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
