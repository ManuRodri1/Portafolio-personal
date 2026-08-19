"use client"

import { useCompanyLanguage } from "@/contexts/company-language-context"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function BIHero() {
  const { t } = useCompanyLanguage()
  const router = useRouter()

  const handleConsultationClick = () => {
    router.push("/#contact")
  }

  return (
    <section className="relative min-h-screen bg-[#1E244B] overflow-hidden">
      {/* Background Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large diagonal red accent - top right */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E94547] transform rotate-45 translate-x-1/2 -translate-y-1/2"
        />

        {/* Medium diagonal accent - bottom right */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#E94547]/80 transform rotate-45 translate-x-1/3 translate-y-1/3"
        />

        {/* Small accent block - top left */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute top-40 left-20 w-32 h-32 bg-[#E94547]/60 transform rotate-12"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* LEFT COLUMN - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-sans tracking-tight leading-tight">
              {t("bi.hero.title")}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 font-sans leading-relaxed font-medium">
              {t("bi.hero.subtitle")}
            </p>

            {/* Supporting Description */}
            <p className="text-base md:text-lg text-white/70 font-sans leading-relaxed max-w-xl">
              {t("bi.hero.description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <button
                onClick={handleConsultationClick}
                className="px-8 py-4 bg-[#E94547] text-white font-sans font-semibold rounded-lg hover:bg-[#d63b3d] transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                {t("bi.hero.primaryCTA")}
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => {
                  const projectsSection = document.getElementById("bi-projects")
                  projectsSection?.scrollIntoView({ behavior: "smooth" })
                }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-sans font-semibold rounded-lg hover:bg-white hover:text-[#1E244B] transition-all duration-300"
              >
                {t("bi.hero.secondaryCTA")}
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Visual Geometric Shapes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex relative h-[500px] items-center justify-center"
          >
            {/* Layered geometric shapes */}
            <div className="relative w-full h-full">
              {/* Base square */}
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
              />

              {/* Diagonal red accent */}
              <motion.div
                animate={{ rotate: [45, 50, 45] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#E94547]/20 transform rotate-45"
              />

              {/* Small accent square */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-20 right-20 w-24 h-24 bg-[#E94547] transform rotate-12"
              />

              {/* Lines/bars */}
              <div className="absolute bottom-32 left-16 w-48 h-1 bg-white/20" />
              <div className="absolute top-32 right-16 w-32 h-1 bg-[#E94547]/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
