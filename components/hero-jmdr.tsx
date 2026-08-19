"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useCompanyLanguage } from "@/contexts/company-language-context"
import { cn } from "@/lib/utils"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-[#FF5757]/20",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -120, rotate: rotate - 10 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-md border border-white/10",
            "shadow-[0_8px_40px_rgba(0,0,0,0.35)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function HeroJMDR() {
  const { t } = useCompanyLanguage()

  const handleConsultationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F17]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A295F]/30 via-transparent to-[#FF5757]/20 blur-3xl" />

      <ElegantShape
        width={520}
        height={120}
        rotate={-8}
        delay={0.2}
        className="left-[-8%] top-[15%]"
        gradient="from-[#8B4C4C]/20"
      />
      <ElegantShape
        width={380}
        height={100}
        rotate={14}
        delay={0.4}
        className="right-[-3%] bottom-[20%]"
        gradient="from-[#6B3838]/15"
      />
      <ElegantShape
        width={220}
        height={70}
        rotate={-12}
        delay={0.3}
        className="left-[15%] bottom-[8%]"
        gradient="from-[#FF5757]/15"
      />
      <ElegantShape
        width={450}
        height={90}
        rotate={6}
        delay={0.5}
        className="right-[10%] top-[25%]"
        gradient="from-[#8B4C4C]/18"
      />

      <div className="relative z-10 text-center px-6 max-w-5xl pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gray-400 font-light">{t("hero.label")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-24 h-[1px] mx-auto mb-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ boxShadow: "0 0 8px rgba(255,255,255,0.15)" }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-2">
            {t("hero.title")}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <p
            className="text-3xl sm:text-4xl md:text-5xl font-['Pacifico'] italic"
            style={{
              background: "linear-gradient(135deg, #E57A6B 0%, #D6695A 50%, #E57A6B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(229, 122, 107, 0.4))",
            }}
          >
            {t("hero.accent")}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10"
        >
          {t("hero.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <a
            href="#contact"
            onClick={handleConsultationClick}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#E57A6B] rounded-lg transition-all duration-300 hover:bg-[#D6695A] hover:shadow-xl hover:shadow-[#E57A6B]/30 hover:scale-105"
          >
            {t("hero.cta.primary")}
          </a>

          <a
            href="#projects"
            onClick={handleExploreClick}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[#E57A6B] border-2 border-[#E57A6B] bg-transparent rounded-lg transition-all duration-300 hover:bg-[#E57A6B] hover:text-white hover:shadow-xl hover:shadow-[#E57A6B]/20 hover:scale-105"
          >
            {t("hero.cta.secondary")}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-sm text-gray-500"
        >
          {t("hero.trust")}
        </motion.p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent pointer-events-none" />
    </section>
  )
}
