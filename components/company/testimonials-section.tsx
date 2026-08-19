"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useCompanyLanguage } from "@/contexts/company-language-context"
import { cn } from "@/lib/utils"

interface Client {
  id: string
  name: string
  company: string
  position: string
  testimonial: string
  order: number
  published: boolean
  clientPhoto: string
  companyLogo: string
}

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

function TestimonialCard({ client }: { client: Client }) {
  console.log("[v0] Rendering card for:", client.name, "| Logo URL:", client.companyLogo)

  return (
    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl h-full flex flex-col">
      <div className="flex justify-between items-start mb-8">
        {/* Left: Client Photo + Info */}
        <div className="flex items-center gap-4">
          {client.clientPhoto && (
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#FF6052]/50 flex-shrink-0">
              <Image src={client.clientPhoto || "/placeholder.svg"} alt={client.name} fill className="object-cover" />
            </div>
          )}
          <div className="text-left">
            <p className="text-white font-semibold text-lg">{client.name}</p>
            <p className="text-[#E6E9EF]/60 text-sm">{client.position}</p>
          </div>
        </div>

        {/* Right: Company Logo + Name */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          {client.companyLogo ? (
            <div className="relative w-24 h-10">
              <Image
                src={client.companyLogo || "/placeholder.svg"}
                alt={client.company}
                fill
                className="object-contain opacity-80"
                onError={(e) => {
                  console.log("[v0] Image load error for:", client.company, "| URL:", client.companyLogo)
                }}
                onLoad={() => {
                  console.log("[v0] Image loaded successfully for:", client.company)
                }}
              />
            </div>
          ) : (
            <div className="relative w-24 h-10 flex items-center justify-center border border-dashed border-white/20 rounded text-xs text-white/40">
              No logo
            </div>
          )}
          <p className="text-[#E6E9EF]/60 text-xs">{client.company}</p>
        </div>
      </div>

      <blockquote className="text-center flex-grow flex items-center justify-center">
        <p className="text-base md:text-lg text-[#E6E9EF] leading-relaxed max-w-lg mx-auto font-light">
          "{client.testimonial}"
        </p>
      </blockquote>
    </div>
  )
}

export default function TestimonialsSection({ clients }: { clients: Client[] }) {
  const { t } = useCompanyLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || clients.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % clients.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused, clients.length])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 2 + clients.length) % clients.length)
    setIsPaused(true)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 2) % clients.length)
    setIsPaused(true)
  }

  if (!clients || clients.length === 0) {
    return null
  }

  const currentClient = clients[currentIndex]
  const nextClient = clients[(currentIndex + 1) % clients.length]

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0B0F17] py-24">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A295F]/30 via-transparent to-[#FF5757]/20 blur-3xl" />

      {/* Floating shapes */}
      <ElegantShape width={520} height={120} rotate={-8} delay={0.2} className="left-[-8%] top-[15%]" />
      <ElegantShape width={380} height={100} rotate={14} delay={0.4} className="right-[-3%] bottom-[20%]" />
      <ElegantShape width={220} height={70} rotate={-12} delay={0.3} className="left-[15%] bottom-[8%]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("testimonials.title")}</h2>
          <p className="text-[#E6E9EF]/60 text-sm md:text-base max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
        </motion.div>

        <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* First Card */}
              <TestimonialCard client={currentClient} />

              {/* Second Card (only on desktop) */}
              {clients.length > 1 && (
                <div className="hidden lg:block">
                  <TestimonialCard client={nextClient} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {clients.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              {/* Dots indicator */}
              <div className="flex gap-2">
                {clients.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsPaused(true)
                    }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentIndex ? "bg-[#FF6052] w-8" : "bg-white/30 hover:bg-white/50",
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent pointer-events-none" />
    </section>
  )
}
